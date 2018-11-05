({
	doInit : function(cmp, event, helper) {

		var importConfig = cmp.get('v.importConfig');

        var wizardImportList = [];

        // Disable list views if there is no API access
        if(importConfig.isAPIEnabled) {
        	wizardImportList.push({ class: "optionClass", label: "Salesforce List View", value: "listview", selected: true });
        } else {
			$A.util.removeClass(cmp.find('listview-msg-id'), "slds-hide");
		}

        wizardImportList.push({ class: "optionClass", label: "Salesforce Report", value: "report", selected: false });
        // wizardImportList.push({ class: "optionClass", label: "Add Subscribers from SOQL (Advanced)", value: "soql", selected: false });

        cmp.set('v.sourceList', wizardImportList);

		importConfig.title = 'Import Wizard - Select Import Type';
		importConfig.isNextDisabled = false;
		importConfig.bodyClass = 'slds-grid slds-grid--vertical-align-center';
		importConfig.step = 1;
		importConfig.runType = '';
		importConfig.schedule = '';
		importConfig.fieldMap = '';
		importConfig.importType = cmp.find("wizard-select-id").get("v.value");
		cmp.set('v.importConfig', importConfig);

        helper.selectImportType(cmp, event, helper);

    },
	doSelectImportType : function(cmp, event, helper) {

		cmp.get('v.importConfig').importType = cmp.get('v.selectedSourceList');
		helper.selectImportType(cmp, event, helper);
	},


})