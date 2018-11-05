({

    loadComponent: function(cmp, event, helper, cmpName) {

        $A.createComponent(
            "wbsendit:" + cmpName, {
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
                helper.turnOffSpinner(cmp);
            }

        );

    },
    turnOffSpinner: function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    turnOnSpinner: function(cmp) {
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
    },

})