({
	doInit: function(cmp, event, helper) {

		helper.doGetImports(cmp, event, helper);

	},
	onHandleDestroy : function (component, event, helper) {

		try {
			var val = event.getParam("value");

			// Stop the poller when the component is destroyed
			window.clearInterval(val.get('v.timerId'));
		} catch (err) {
		}
    },
	onStartImportWizard: function(cmp, event, helper) {
		helper.loadImportWizard(cmp, event, helper);
	},
	onSelectImport: function(cmp, event, helper) {

		// User selects existing import record
		var rowIndex = event.target.id;
		var scheduledId = cmp.get('v.currentList')[rowIndex].id;

		cmp.set('v.selectedRecordIndex', rowIndex);
		helper.loadImportWizardScheduleId(cmp, event, helper, scheduledId);

	},
	doImportWizardEvent : function(cmp, event) {

        var importConfig = event.getParam("importConfig");
        if(importConfig === 'Preparing') {

			var selectedRecordIndex = cmp.get('v.selectedRecordIndex');
			if(selectedRecordIndex) {
				var scheduledRecord = cmp.get('v.currentList')[selectedRecordIndex];

				var currentList = cmp.get('v.currentList');
				currentList[selectedRecordIndex].status = 'Preparing';
				cmp.set('v.currentList', currentList);
			}

        }

    },

    // If user interacts with the menu, don't refresh the underlying table
	onListMenuSelect : function(cmp, event) {

		// Stop polling as the user makes a menu selection
		cmp.set('v.isPollEnabled', false);

		// Restart polling after a few seconds
		// NB. if the user hovers over the menu when the timer reactivates, a SFDC defect is reported on screen
		if(!cmp.get('v.restartTimerId')) {
			var restartTimerId = window.setTimeout(
			    $A.getCallback(function() {
			        cmp.set('v.isPollEnabled', true);
			        cmp.set('v.restartTimerId', null);
			    }), 10000
			);
			cmp.set('v.restartTimerId', restartTimerId);
		}
    },

	onListMenuSelectItem : function(cmp, event, helper) {

		// Stop the polling
		cmp.set('v.isPollEnabled', false);

		// Extract Ids etc from the row
		var selectedMenuItemValue = event.getParam("value");
    	var actionType = selectedMenuItemValue.split(':')[0];
    	var rowIndex = selectedMenuItemValue.split(':')[1];
    	var scheduledRecord = cmp.get('v.currentList')[rowIndex];

    	if(actionType === 'viewResults') {
    		helper.loadImportResults(cmp, event, helper, scheduledRecord.results);
    	} else if(actionType === 'editItem') {
			helper.loadImportWizardScheduleId(cmp, event, helper, scheduledRecord.id);
		} else if(actionType === 'deleteItem') {
			helper.doDeleteImport(cmp, event, helper, scheduledRecord.id);
		}

    },
	onBack: function(cmp, event, helper) {
		helper.doNavigateBack(cmp, event, helper);
	},
})