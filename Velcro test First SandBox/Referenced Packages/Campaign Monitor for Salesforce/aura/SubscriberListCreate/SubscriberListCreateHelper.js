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
    doUpdateList: function(cmp, event, helper) {

        var action = cmp.get("c.updateCreateRule");
        action.setParams({
            "listDetailString": JSON.stringify(cmp.get('v.listdetail'))
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var result = actionResult.getReturnValue();

                if (result.code !== "200") {
                    cmp.set('v.fieldWarnings', result);
                    cmp.set('v.listdetail.createRule', 'ACTION_DO_NOTHING');
                    cmp.find('b12-field-warnings-id').open();

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
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    doNavigateBack: function(cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if (!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }

        // If we are in native Lightning, always go back to the subscriber list home
        var eventToObjectHome = $A.get("e.force:navigateToObjectHome");
        if (eventToObjectHome) {
            eventToObjectHome.setParams({
                scope: "wbsendit__Subscriber_List__c"
            });
            eventToObjectHome.fire();
        } else {
            window.location.href = cmp.get('v.listdetail.listViewHomeURL');
        }
    },
    turnOffSpinner: function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    turnOnSpinner: function(cmp) {
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
    },
    showNotification: function(cmp, event, helper, msg, msgSeverity) {
        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg,
            msgSeverity: msgSeverity
        }).fire();
    },
})