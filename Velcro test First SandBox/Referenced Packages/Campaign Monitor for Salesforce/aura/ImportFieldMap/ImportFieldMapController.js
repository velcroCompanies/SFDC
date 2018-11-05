({
    doInit: function(cmp, event, helper) {

        console.log('Init Field Map'); // eslint-disable-line

        var importConfig = cmp.get('v.importConfig');
        importConfig.title = 'Import Wizard - Map Fields';
        importConfig.isNextDisabled = true;
        importConfig.bodyClass = 'slds-scrollable slds-p-around--xx-large';
        importConfig.step = 3;
        importConfig.fieldMap = '';
        cmp.set('v.importConfig', importConfig);

        helper.fireWizardEvent(cmp, event, helper);

        // Call Salesforce and build Mapping table
        helper.doGetFields(cmp, event, helper);


    },

    // User maps a field
    selectCMField: function(cmp, event, helper) {

        // Get the current row from class variable
        var index = event.getSource().get('v.class').match('[0-9]+')[0]; // yes, hack!

        // Show/hide the new field input box
        if (event.getSource().get('v.value').startsWith("newField")) {
            $A.util.removeClass(cmp.find("cmFieldBox")[index], "slds-hide");

            // Default the entry to the SF field name
            cmp.get("v.fieldMap").allFields[index].cmLabel = cmp.get("v.fieldMap").allFields[index].sfLabel;
        } else {
            $A.util.addClass(cmp.find("cmFieldBox")[index], "slds-hide");
            cmp.get("v.fieldMap").allFields[index].cmLabel = '';
        }

        // Special handling for the custom field named Salesforce Id
        if (event.getSource().get('v.value') === '[SalesforceId]') {
            cmp.get("v.fieldMap").allFields[index].cmLabel = 'Salesforce Id';
        }

        helper.validateMapping(cmp, event, helper);

    },
    saveFieldName: function(cmp, event, helper) {

        var index = event.target.name;
        cmp.get("v.fieldMap").allFields[index].cmLabel = event.target.value;
        helper.fireWizardEvent(cmp, event, helper);
    }
})