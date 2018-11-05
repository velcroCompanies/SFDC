({
    doInit: function (cmp, event, helper) {

        var importConfig = cmp.get('v.importConfig');
        importConfig.title = 'Import Wizard - Select SOQL';

        if (importConfig.scheduledId) {
            importConfig.isNextDisabled = false;
        } else {
            importConfig.isNextDisabled = true;
        }

        importConfig.bodyClass = 'slds-grid slds-grid--vertical-align-center';
        importConfig.step = 2;
        cmp.set('v.importConfig', importConfig);

        cmp.set('v.soqlTitle', importConfig.importTitle);
        cmp.set('v.soqlValue', importConfig.soql);
        cmp.set('v.validateDisabled', !importConfig.soql)

        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");

    },
    onValidateSoql: function (cmp, event, helper) {

        helper.doValidateSOQL(cmp, event, helper);

    },
    onChangeSoql: function (cmp, event, helper) {

        cmp.set('v.validateDisabled', cmp.get("v.soqlValue").length == 0);

        // Hide the error message
        cmp.set('v.soqlError', '');
        cmp.set('v.soqlValid', '');

        // Disable the next button
        var importConfig = cmp.get('v.importConfig');
        importConfig.isNextDisabled = true;
        helper.fireWizardEvent(cmp, event, helper);


    }
})