({
    doInit: function(cmp, event, helper) {

        var action = cmp.get('c.getSetupDetails');

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {
                var setupDetail = actionResult.getReturnValue();
                cmp.set('v.setupDetail', setupDetail);
                helper.doFireConnectEvent(cmp, event, helper, setupDetail);

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }

                if (error) {
                    error(cmp, event, helper, errors);
                }
            }

        });

        $A.enqueueAction(action);
    },
    doFireConnectEvent: function(cmp, event, helper, setupDetail) {

        // Fire event so that sync settings can consume and set disabled/enabled areas
        var jobEvent = $A.get("e.wbsendit:sldsConnectEvent");
        jobEvent.setParams({ "connectionSettings": setupDetail });
        jobEvent.fire();
    },

})