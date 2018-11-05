({
    doValidateSOQL: function (cmp, event, helper) {

        cmp.set('v.validateDisabled', true);

        var action = cmp.get("c.validateSOQL");
        action.setParams({
            soql: cmp.get("v.soqlValue")
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var soqlResult = actionResult.getReturnValue();
                var importConfig = cmp.get('v.importConfig');

                // Check if the list view is invalid (i.e. been deleted)
                if (soqlResult === '') {
                    cmp.set('v.soqlError', '');
                    cmp.set('v.soqlValid', 'SOQL syntax is valid');

                    // Store the SOQL
                    importConfig.soql = cmp.get('v.soqlValue');
                    importConfig.importTypeId = cmp.get('v.soqlValue');

                    if (cmp.get('v.soqlTitle')) {
                        importConfig.importTitle = cmp.get('v.soqlTitle');
                        // Enable the next button
                        importConfig.isNextDisabled = false;
                    } else {

                        // Disable the next button because we need a title
                        importConfig.isNextDisabled = true;
                    }


                } else {
                    cmp.set('v.soqlValid', '');
                    cmp.set('v.soqlError', 'SOQL invalid or too complex. ' + soqlResult);

                    // Clear out the SOQL
                    importConfig.soql = '';

                    // Disable the next button
                    importConfig.isNextDisabled = true;
                }
                cmp.set('v.importConfig', importConfig);
                helper.fireWizardEvent(cmp, event, helper);

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
            cmp.set('v.validateDisabled', false);

        });
        $A.enqueueAction(action);
    },
    fireWizardEvent: function (cmp, event, helper) {

        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({ "importConfig": cmp.get('v.importConfig') });
        compEvent.fire();
    },
})