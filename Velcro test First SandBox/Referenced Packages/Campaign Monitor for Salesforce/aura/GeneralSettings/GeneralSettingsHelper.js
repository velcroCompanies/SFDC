({
    // Get the general settings values
    doGetSettings: function(cmp, event, helper) {

        var action = cmp.get("c.getSettings");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                cmp.set("v.settings", actionResult.getReturnValue());
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
            this.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    // Save the general settings values
    doSaveSettings: function(cmp, event, helper) {

        var action = cmp.get("c.saveSettings");
        action.setParams({
            genSettings: JSON.stringify(cmp.get("v.settings")),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                helper.successNotification(cmp, event, helper);
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
    turnOffSpinner: function(cmp) {

        $A.util.addClass(cmp.find('body-spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    successNotification: function(cmp, event, helper) {
        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: 'Campaign Monitor Settings were updated'
        }).fire();

    },
})