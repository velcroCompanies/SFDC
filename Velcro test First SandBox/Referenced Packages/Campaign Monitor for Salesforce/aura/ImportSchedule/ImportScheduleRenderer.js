({
	afterRender: function (cmp, helper) {
	    this.superAfterRender();

		helper.buildRunAtTimeList(cmp, helper);

		if(cmp.get('v.importConfig.scheduledRecord.runAt')) {
			cmp.set('v.selectedTime', cmp.get('v.importConfig.scheduledRecord.runAt'));
		}

		var importConfig = cmp.get('v.importConfig');
		if(importConfig.scheduledId && importConfig.scheduledRecord && importConfig.scheduledRecord.scheduleType === 'Scheduled') {
			// There is a scheduled import record
			helper.setScheduledPreference(cmp, helper);
		} else {
			cmp.set('v.importConfig.title', 'Import Wizard - Run');
			helper.fireWizardEvent(cmp, helper);
		}
		helper.turnOffSpinner(cmp, helper);

	},
})