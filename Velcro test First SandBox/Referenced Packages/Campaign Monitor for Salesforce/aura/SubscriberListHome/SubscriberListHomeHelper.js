({

    loadComponent: function(cmp, event, helper, cmpName) {

        $A.createComponent(
            "wbsendit:" + cmpName, {
                "listId": cmp.get("v.listId"),
                "action": cmp.get('v.action'),
                "backLocation": cmp.get('v.backLocation')
            },
            function(newCmp, status, errorMessage) {

                //Add the new button to the body array
                if (status === "SUCCESS") {
                    cmp.set("v.listcomponent", []); // Clear out previous components
                    var listcomponent = cmp.get("v.listcomponent");
                    listcomponent.push(newCmp);
                    cmp.set("v.listcomponent", listcomponent);

                    cmp.set('v.selectedMainMenu', cmpName);


                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                    // Show offline error
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                    // Show error message
                }
            }
        );

    },
    loadComponentMember: function(cmp, event, helper, name) {

        cmp.set('v.menuType', 'MEMBER_MENU');

        $A.createComponent(
            "wbsendit:" + name, {
                "memberId": cmp.get("v.memberId"),
                "action": cmp.get('v.action'),
                "listId": cmp.get("v.listId"),
                "backLocation": cmp.get('v.backLocation')
            },
            function(newCmp, status, errorMessage) {

                //Add the new button to the body array
                if (status === "SUCCESS") {

                    cmp.set("v.listcomponent", []); // Clear out previous components
                    var listcomponent = cmp.get("v.listcomponent");
                    listcomponent.push(newCmp);
                    cmp.set("v.listcomponent", listcomponent);

                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                }
            }
        );

    },
    // Set the subscriber list for the rule as we need it for other menu options
    setSubscriberListId: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberListIdFromRule");
        action.setParams({
            "ruleId": cmp.get("v.ruleId"),
        });

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === "SUCCESS") {

                cmp.set("v.listId", actionResult.getReturnValue());
                helper.loadComponentRule(cmp, event, helper, 'SubscriberListRules');
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
    loadComponentRule: function(cmp, event, helper, name) {

        cmp.set('v.menuType', 'MAIN_MENU');

        $A.createComponent(
            "wbsendit:" + name, {
                "ruleId": cmp.get("v.ruleId"),
                "listId": cmp.get("v.listId"),
                "action": cmp.get('v.action'),
                "backLocation": cmp.get('v.backLocation')
            },
            function(newCmp, status, errorMessage) {

                //Add the new button to the body array
                if (status === "SUCCESS") {

                    cmp.set("v.listcomponent", []); // Clear out previous components
                    var listcomponent = cmp.get("v.listcomponent");
                    listcomponent.push(newCmp);
                    cmp.set("v.listcomponent", listcomponent);
                    cmp.set('v.selectedMainMenu', "SubscriberListRules");

                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                }
            }
        );

    },

})