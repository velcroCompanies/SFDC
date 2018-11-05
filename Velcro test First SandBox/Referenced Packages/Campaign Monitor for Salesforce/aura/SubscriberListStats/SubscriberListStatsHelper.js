({
    doGetListDetails: function(cmp, event, helper) {

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

        // document.getElementById("spinner-id").className = "slds-hide";
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    successNotification: function(cmp, event, helper, msg) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");

        notificationEvent.setParams({
            msg: msg
        }).fire();

    },
})