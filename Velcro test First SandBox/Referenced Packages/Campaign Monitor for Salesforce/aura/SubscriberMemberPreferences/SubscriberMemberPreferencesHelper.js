({
    doGetMemberDetail: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberMemberDetail");
        action.setParams({
            "memberId" : cmp.get('v.memberId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
            	var memberdetail = actionResult.getReturnValue();

                memberdetail.activeObject = 'Linked Salesforce Record';
                memberdetail.sfOptInOut = '';
                if(memberdetail.contactId) {
                    memberdetail.sfRecordId = memberdetail.contactId;
                    memberdetail.activeObject = 'Linked Salesforce Contact';
                    memberdetail.sfOptInOut = memberdetail.contactHasOptedOutOfEmail ? '(opted out)' : '(opted in)';
                }
                if(!memberdetail.contactId && memberdetail.leadId) {
                    memberdetail.sfRecordId = memberdetail.leadId;
                    memberdetail.activeObject = 'Linked Salesforce Lead';
                    memberdetail.sfOptInOut = memberdetail.leadHasOptedOutOfEmail ? '(opted out)' : '(opted in)';
                }
                if(memberdetail.contactId && memberdetail.leadId) {
                    memberdetail.activeObject = 'Linked Salesforce Records';
                }

            	cmp.set('v.memberdetail', memberdetail);

            	helper.doGetCMMemberDetail(cmp, event, helper);

            }
            else if (state === "ERROR") {

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
            "listId" : cmp.get('v.memberdetail.listId'),
            "email" : cmp.get('v.memberdetail.email'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
            	var cmDetail = actionResult.getReturnValue();

            	cmp.set('v.cmDetail', cmDetail);

                var resultsMessage = '';
                if(cmDetail.customFields.length > 0) {
                    resultsMessage = cmDetail.customFields.length +  (cmDetail.customFields.length === 1 ? ' field' : ' fields');
                }
                cmp.set('v.resultsMessage', resultsMessage);

                helper.turnOffSpinner(cmp);

            }
            else if (state === "ERROR") {

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
    doNavigateBack: function(cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if(!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }
        if(backLocation === 'SUBSCRIBER_LIST_DETAIL') {

            // Send event to subscriber home to setup Member page
            var compEvent = cmp.getEvent("subscriberListHomeEvent");
            compEvent.setParams({
                "action": 'SUBSCRIBER_LIST_DETAIL',
                "id" : cmp.get('v.memberdetail.subscriberList')
            });
            compEvent.fire();

        }
    },
    turnOffSpinner : function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
})