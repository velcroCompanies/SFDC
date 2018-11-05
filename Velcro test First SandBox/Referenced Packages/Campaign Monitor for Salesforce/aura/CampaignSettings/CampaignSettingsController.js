({
	doInit : function(cmp, event, helper) {
		helper.doLoadSettings(cmp);
		helper.doLoadStatuses(cmp);
    },
	doSaveStatus : function(cmp, event, helper) {
debugger
		helper.doSaveStatuses(cmp, event, helper);
    },
	doSaveResponse : function(cmp, event, helper) {
		helper.doSaveStatuses(cmp, event, helper);
    },
	doSaveAutoSetting : function(cmp, event, helper) {
		helper.doSaveSettings(cmp, event, helper);
    },
	doSaveAutoCreateCampaign : function(cmp, event, helper) {
		helper.doSaveSettings(cmp, event, helper);
    },
	doSaveCampaignStats : function(cmp, event, helper) {
		helper.doSaveSettings(cmp, event, helper);
    },
	doSaveFrequencySetting : function(cmp, event, helper) {

		var settings = cmp.get('v.settings');
		settings.refresh = event.getSource().getLocalId();
		cmp.set('v.settings', settings);

		helper.doSaveSettings(cmp, event, helper);
    },
	doAutoCreateCampaign : function(cmp, event, helper) {
		helper.doSaveSettings(cmp, event, helper);
    }
})