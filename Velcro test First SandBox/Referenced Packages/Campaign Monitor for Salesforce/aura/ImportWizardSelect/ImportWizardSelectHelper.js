({

    selectImportType : function(cmp, event, helper) {

        var selected = cmp.get('v.selectedSourceList')

        if(selected === 'listview') {
            cmp.set('v.importTooltip', 'Import emails into Campaign Monitor from any compatible Salesforce List View. Map fields from a Salesforce List View to Campaign Monitor. Optionally schedule the import (NB. when scheduled, subsequent updates to the list view will not flow through to this import).');
        } else if(selected === 'report') {
            cmp.set('v.importTooltip', 'Import emails into Campaign Monitor from any compatible Salesforce Report. Map fields from a Salesforce Report to Campaign Monitor. Optionally schedule the import.');
        } else if(selected === 'soql') {
            cmp.set('v.importTooltip', 'Advanced: Use SOQL to extract Salesforce emails and load into Campaign Monitor. Map fields from the SOQL to Campaign Monitor. Optionally schedule the import to run daily.');
        }

        // Send event to the parent wizard
        helper.fireWizardEvent(cmp, event, helper);

    },

    fireWizardEvent : function(cmp, event, helper) {
        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({"importConfig": cmp.get('v.importConfig') });
        compEvent.fire();
    },
})