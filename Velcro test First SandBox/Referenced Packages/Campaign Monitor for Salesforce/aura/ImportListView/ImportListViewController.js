({
	doInit : function(cmp, event, helper) {
		console.log('Init'); // eslint-disable-line

		var importConfig = cmp.get('v.importConfig');
		importConfig.title = 'Import Wizard - Select List View';

        if(importConfig.scheduledId) {
    		importConfig.isNextDisabled = false;
        } else {
			importConfig.isNextDisabled = true;
        }

		importConfig.bodyClass = 'slds-grid slds-grid--vertical-align-center';
		importConfig.step = 2;
		cmp.set('v.importConfig', importConfig);

		// Get the valid report folder
		helper.doGetObjectList(cmp, event, helper);

    },
	doSelectAllObjects : function(cmp, event, helper) {

        var selected =  cmp.get('v.selectedObject');
		helper.doGetListViews(cmp, event, helper, selected);

	},
	doSelectListView : function(cmp, event, helper) {

        var importConfig = cmp.get('v.importConfig');
        importConfig.isNextDisabled = (cmp.get('v.selectedListView') === 'none');

        var objectName =  cmp.get('v.selectedObject');

        var listViewId =  cmp.get('v.selectedListView');
        importConfig.importTypeId = objectName + ':' + listViewId;

        // Get object label. E.g. "Email Tracking Statistics"
        var objectList = cmp.get('v.objectList');
        var objectLabel = '';
        for (var i = 0; i < objectList.length; i += 1 ) {
            if(objectList[i].value === objectName) {
                objectLabel = objectList[i].label;
                break;
            }
        }

        // Find the label for the picklist and assign to importTitle
        for (var j = 0; j < cmp.get('v.listViewList').length; j += 1 ) {
        	if(cmp.get('v.listViewList')[j].value === listViewId) {

        		importConfig.importTitle = '[' + objectLabel + '] ' + cmp.get('v.listViewList')[j].label;
                importConfig.importSubTitleObject = importConfig.importTitle;
        		break;
        	}
        }
        cmp.set('v.importConfig', importConfig);

        // If there is no selection, hide the next button and don't bother call into Salesforce
        if(importConfig.isNextDisabled) {
        	helper.fireWizardEvent(cmp, event, helper);
        } else {
        	$A.util.removeClass(cmp.find('working-id'), "slds-hide");

	        // Get the SOQL for this list view
	        helper.doGetListViewSOQL(cmp, event, helper, importConfig.importTypeId);
        }

	},

})