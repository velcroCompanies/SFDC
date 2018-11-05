({
	doInit : function(cmp, event, helper) {

		var importConfig = cmp.get('v.importConfig');
		importConfig.title = 'Import Wizard - Select Report';

        if(importConfig.scheduledId) {
    		importConfig.isNextDisabled = false;
        } else {
			importConfig.isNextDisabled = true;
        }

		importConfig.bodyClass = 'slds-grid slds-grid--vertical-align-center';
		importConfig.step = 2;
		cmp.set('v.importConfig', importConfig);

		// Initialise the parent wizard
		helper.fireWizardEvent(cmp, event, helper);

		// Get the valid report folder
		helper.doGetReportFolders(cmp, event, helper);


    },
	doSelectReportFolder : function(cmp, event, helper) {

		var selected =  cmp.get('v.selectedFolder');
		helper.doGetReports(cmp, event, helper, selected);

		helper.fireWizardEvent(cmp, event, helper);

	},
	doSelectReport : function(cmp, event, helper) {

        var importConfig = cmp.get('v.importConfig');
        var selectedReport =  cmp.get('v.selectedReport');
        importConfig.isNextDisabled = (selectedReport === 'none');
        importConfig.importTypeId = selectedReport;

        // Find the label for the picklist and assign to importTitle
        for (var i = 0; i < cmp.get('v.reportList').length; i += 1 ) {
        	if(cmp.get('v.reportList')[i].value === importConfig.importTypeId) {
        		importConfig.importTitle = cmp.get('v.reportList')[i].label;
        		importConfig.importSubTitleObject = importConfig.importTitle;
        		break;
        	}
        }
        cmp.set('v.importConfig', importConfig);

		helper.fireWizardEvent(cmp, event, helper);

	},

})