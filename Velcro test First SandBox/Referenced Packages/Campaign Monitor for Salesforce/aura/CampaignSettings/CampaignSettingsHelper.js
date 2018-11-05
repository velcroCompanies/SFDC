({
    doLoadSettings: function(cmp, event, helper) {

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
    doSaveSettings: function(cmp, event, helper) {

        var action = cmp.get("c.saveSettings");
        action.setParams({
            refresh: cmp.get("v.settings.refresh"),
            autoSave: cmp.get("v.settings.autoSave"),
            createCampaignDate: cmp.get("v.settings.createCampaignDate"),
            autoCreateCampaign: cmp.get("v.settings.autoCreateCampaign"),
            updateCampaignStats: cmp.get("v.settings.updateCampaignStats")
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
    doLoadStatuses: function(cmp, event, helper) {

        var action = cmp.get("c.getStatuses");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                cmp.set("v.statuses", actionResult.getReturnValue());
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
    doSaveStatuses: function(cmp, event, helper) {

        var action = cmp.get("c.saveStatuses");
        action.setParams({
            statusesJSON: JSON.stringify(cmp.get("v.statuses"))
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