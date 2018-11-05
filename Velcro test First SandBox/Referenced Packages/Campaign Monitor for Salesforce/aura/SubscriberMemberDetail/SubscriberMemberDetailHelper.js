({
    doGetMemberDetail: function(cmp, event, helper) {
        var action = cmp.get("c.getSubscriberMemberDetail");
        action.setParams({
            "memberId": cmp.get('v.memberId'),
        });
        action.setCallback(this, function(actionResult) {

            debugger

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var memberdetail = actionResult.getReturnValue();
                memberdetail.activeObject = 'Linked Salesforce Record';
                if (memberdetail.contactId) {
                    memberdetail.sfRecordId = memberdetail.contactId;
                    memberdetail.activeObject = 'Linked Salesforce Contact';
                }
                if (!memberdetail.contactId && memberdetail.leadId) {
                    memberdetail.sfRecordId = memberdetail.leadId;
                    memberdetail.activeObject = 'Linked Salesforce Lead';
                }
                if (memberdetail.contactId && memberdetail.leadId) {
                    memberdetail.activeObject = 'Linked Salesforce Records';
                }
                memberdetail.optInOutClass = memberdetail.isOptIn ? 'status-optin' : 'status-optout';
                cmp.set('v.memberdetail', memberdetail);

                if (cmp.get('v.action') !== 'DELETE_MEMBER') {
                    helper.doGetCMMemberDetail(cmp, event, helper);
                } else {
                    helper.showNotification(cmp, event, helper, 'Subscriber was successfully deleted from "' + memberdetail.listName + '"', 'success');
                }
                helper.turnOffSpinner(cmp);

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doDeleteSubscriber: function(cmp, event, helper) {
        debugger
        var action = cmp.get("c.deleteSubscriber");
        action.setParams({
            "memberId": cmp.get('v.memberId')

        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                helper.doGetMemberDetail(cmp, event, helper);
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doGetCMMemberDetail: function(cmp, event, helper) {

        var action = cmp.get("c.getCMSubscriberDetail");
        action.setParams({
            "listId": cmp.get('v.memberdetail.listId'),
            "email": cmp.get('v.memberdetail.email'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var cmDetail = actionResult.getReturnValue();
                cmp.set('v.cmDetail', cmDetail);

                // Check if the state is the same, could be it's out of sync (but only check a minute after the last modified date, allow CM to catchup)
                if (cmp.get('v.memberdetail.state') !== cmDetail.state && cmDetail.state &&
                    new Date(new Date(cmp.get('v.memberdetail.lastModifiedDate')).getTime() + 1 * 60000) < new Date()) {
                    helper.doUpdateSubscriberState(cmp, event, helper, cmDetail.state);
                }
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doUpdateSubscriberState: function(cmp, event, helper, subscriberState) {

        var memberId = cmp.get('v.memberdetail.id') ? cmp.get('v.memberdetail.id') : cmp.get('v.memberId');

        var action = cmp.get("c.updateSubscriberState");
        action.setParams({
            "memberId": memberId,
            "state": subscriberState
        });
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var response = actionResult.getReturnValue();

                if (cmp.get('v.action') === 'DELETE_MEMBER') {
                    helper.doGetMemberDetail(cmp, event, helper);
                    return;
                }

                if (response.code === '200') {
                    cmp.set('v.memberdetail.state', subscriberState);
                    cmp.set('v.memberdetail.optInOutClass', 'status-optin');
                    cmp.set('v.memberdetail.isOptIn', true);
                } else if (response.code === '201' || response.code === '203') {
                    cmp.set('v.memberdetail.state', subscriberState);
                    cmp.set('v.memberdetail.optInOutClass', 'status-optout');
                    cmp.set('v.memberdetail.isOptIn', false);
                } else {
                    // Show error message
                    helper.showNotification(cmp, event, helper, response.message, 'warning');
                    return;
                }
                helper.showNotification(cmp, event, helper, 'Record was out sync with Campaign Monitor. It has been updated to <strong>' + subscriberState + '</strong>.', 'warning');
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                        helper.showNotification(cmp, event, helper, errors[0].message, 'warning');
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doToggleEmailOptOut: function(cmp, event, helper) {
        var action = cmp.get("c.saveEmailOptInOut");
        action.setParams({
            "listId": cmp.get('v.memberdetail.listId'),
            "memberId": cmp.get('v.memberdetail.id'),
            "sfRecordId": cmp.get('v.memberdetail.sfRecordId'),
            "isOptIn": cmp.get('v.memberdetail.isOptIn'),
            "email": cmp.get('v.memberdetail.email'),
        });
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var response = actionResult.getReturnValue();
                if (response.code === '200') {
                    cmp.set('v.memberdetail.state', 'Active');
                    cmp.set('v.memberdetail.optInOutClass', 'status-optin');
                    helper.showNotification(cmp, event, helper, cmp.get('v.memberdetail.email') + ' is now ' + cmp.get('v.memberdetail.state'), 'success');
                } else if (response.code === '201') {
                    cmp.set('v.memberdetail.state', 'Unsubscribed');
                    cmp.set('v.memberdetail.optInOutClass', 'status-optout');
                    helper.showNotification(cmp, event, helper, cmp.get('v.memberdetail.email') + ' is now ' + cmp.get('v.memberdetail.state'), 'success');
                } else if (response.code === '402' || response.code === '203') {
                    cmp.set('v.memberdetail.state', 'Unsubscribed');
                    cmp.set('v.memberdetail.optInOutClass', 'status-optout');
                    cmp.set('v.memberdetail.isOptIn', false);
                    helper.showNotification(cmp, event, helper, response.message, 'warning');
                } else {
                    // Show error message
                    helper.showNotification(cmp, event, helper, response.message, 'warning');
                }
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                        helper.showNotification(cmp, event, helper, errors[0].message, 'warning');
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doChangeOwner: function(cmp, event, helper) {
        var action = cmp.get("c.changeListOwner");
        action.setParams({
            "memberId": cmp.get('v.memberId'),
            "newOwnerId": cmp.get('v.selItem.val')
        });
        //Set up the callback
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var result = actionResult.getReturnValue();
                if (result.code !== "200") {
                    helper.showNotification(cmp, event, helper, result.message, 'warning');
                } else {
                    // navigate
                    cmp.set('v.memberdetail.ownerId', cmp.get('v.selItem.val'));
                    cmp.set('v.memberdetail.ownerName', cmp.get('v.selItem.text'));
                }
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            cmp.find('b12-change-owner-modal').close();
        });
        $A.enqueueAction(action);
    },
    turnOffSpinner: function(cmp) {
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    showNotification: function(cmp, event, helper, msg, msgSeverity) {
        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg,
            msgSeverity: msgSeverity
        }).fire();
    },
    doNavigateBack: function(cmp, event, helper) {
        var backLocation = cmp.get('v.backLocation');
        if (!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }
        if (backLocation === 'SUBSCRIBER_LIST_DETAIL') {
            // Send event to subscriber home to setup Member page
            var compEvent = cmp.getEvent("subscriberListHomeEvent");
            compEvent.setParams({
                "action": 'SUBSCRIBER_LIST_DETAIL',
                "id": cmp.get('v.memberdetail.subscriberList')
            });
            compEvent.fire();
        }
    },
})