({
    doGetListDetail: function(cmp, event, helper) {

        var clientPickList = [];

        var action = cmp.get("c.getSubscriberListDetail");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var listdetail = actionResult.getReturnValue();
                cmp.set('v.listdetail', listdetail);

                if (cmp.get('v.listdetail.listName')) {
                    cmp.set('v.listTypeConfirmed', cmp.get('v.listdetail.listType') === 'LIST_TYPE_CONFIRMED');
                    cmp.set('v.listTypeSingle', cmp.get('v.listdetail.listType') !== 'LIST_TYPE_CONFIRMED');

                    cmp.set('v.unsubscribeAllLists', cmp.get('v.listdetail.unsubscribeSetting') !== 'UNSUBSCRIBE_ONLY_THIS_LIST');
                    cmp.set('v.unsubscribeThisLists', cmp.get('v.listdetail.unsubscribeSetting') === 'UNSUBSCRIBE_ONLY_THIS_LIST');
                } else if (cmp.get('v.action') !== 'NEW') {
                    helper.turnOffSpinner(cmp);
                    cmp.find('b12-prompt-no-list').open();
                    return;
                }

                // Check if the user is creating a new list
                if (cmp.get('v.action') === 'NEW') {

                    // Default new values
                    cmp.set('v.listdetail.listName', '');
                    cmp.set('v.listdetail.preventMemberSync', false);

                    cmp.set('v.disabled', false);
                    cmp.set('v.showCreate', true);
                }
                if (cmp.get('v.action') === 'DELETE_LIST') {
                    cmp.set('v.showDelete', true);
                }

                if (cmp.get('v.action') === 'EDIT_LIST_DETAIL') {
                    cmp.set('v.disabled', false);
                    cmp.set('v.showEdit', true);
                }
                if (cmp.get('v.action') === 'VIEW_DETAIL') {
                    cmp.set('v.disabled', true);
                }

                for (var i = 0; i < listdetail.clientList.length; i += 1) {
                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = listdetail.clientList[i].clientName;
                    optionTemplate.value = listdetail.clientList[i].clientId;

                    // If this is a new list, set the client to the first on in the list
                    optionTemplate.selected = false;
                    if (cmp.get('v.action') === 'NEW' && i === 0) {
                        cmp.set('v.defaultClient', listdetail.clientList[i].clientId);
                    }

                    // Set the client selected picklist value
                    if (listdetail.clientList[i].clientId === listdetail.selectedClientId) {
                        optionTemplate.selected = true;
                    }
                    clientPickList.push(optionTemplate);
                }

                // Show client list box
                cmp.set('v.showClientList', listdetail.clientList.length > 1);
                cmp.set('v.clientList', clientPickList);

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
    doCreateList: function(cmp, event, helper) {

        var listdetail = cmp.get('v.listdetail');

        // Get the client Id
        listdetail.clientId = !cmp.get('v.selectedClientId') ? cmp.get('v.defaultClient') : cmp.get('v.selectedClientId');
        listdetail.listType = cmp.get('v.selectedListType');
        listdetail.unsubscribeSetting = cmp.get('v.selectedUnsubscribeType');


        var action = cmp.get("c.createSubscriberList");
        action.setParams({
            "listDetailJson": JSON.stringify(cmp.get('v.listdetail'))
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
                    helper.navigateToListHome(cmp, event, helper, result.message);
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
    doUpdateList: function(cmp, event, helper) {

        var action = cmp.get("c.updateSubscriberList");
        action.setParams({
            "listDetailJson": JSON.stringify(cmp.get('v.listdetail'))
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
                    helper.showNotification(cmp, event, helper, 'Updated ' + cmp.get('v.listdetail.listName'), 'success');
                }

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.showNotification(cmp, event, helper, errors[0].message, 'warning');
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
    doDeleteList: function(cmp, event, helper) {


        var action = cmp.get("c.deleteSubscriberList");
        action.setParams({
            "sfListId": cmp.get('v.listdetail.listId'),
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
                    cmp.set('v.backLocation', 'SUBSCRIBER_LIST');
                    helper.doNavigateBack(cmp, event, helper);
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
            cmp.find('b12-delete-list-modal').close();
        });
        $A.enqueueAction(action);
    },
    doChangeOwner: function(cmp, event, helper) {


        var action = cmp.get("c.changeListOwner");
        action.setParams({
            "listId": cmp.get('v.listdetail.listId'),
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
                    cmp.set('v.listdetail.ownerId', cmp.get('v.selItem.val'));
                    cmp.set('v.listdetail.ownerName', cmp.get('v.selItem.text'));
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

        // If we are in native Lightning, always go back to the subscriber list home
        var eventObjectHome = $A.get("e.force:navigateToObjectHome");
        if (eventObjectHome) {
            eventObjectHome.setParams({
                scope: "wbsendit__Subscriber_List__c"
            });
            eventObjectHome.fire();
        } else {
            if (cmp.get('v.listdetail.isRunningLightning')) {
                // Cater for users coming from a related subscriber list in Lightning
                window.history.back();
            } else {
                window.location.href = cmp.get('v.listdetail.listViewHomeURL');
            }

        }
    },
    navigateToListHome: function(cmp, event, helper, sfListId) {

        var eventToComponent = $A.get("e.force:navigateToComponent");
        if (eventToComponent) {
            eventToComponent.setParams({
                componentDef: "wbsendit:SubscriberListHome",
                componentAttributes: {
                    listId: sfListId,
                    licenceDetail: cmp.get('v.licenceDetail')
                }
            });
            eventToComponent.fire();
        } else {
            window.location.href = '/apex/SubscriberListHome?id=' + sfListId;
        }
    },
    turnOffSpinner: function(cmp) {
        $A.util.addClass(cmp.find('subscriberlist-spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
})