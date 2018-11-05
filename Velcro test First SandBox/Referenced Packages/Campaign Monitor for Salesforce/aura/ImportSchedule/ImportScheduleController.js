({
    doInit: function(cmp, event, helper) {
        cmp.set('v.importConfig.bodyClass', 'slds-scrollable slds-p-left--large slds-p-right--large slds-p-top--small');
        debugger;

        var isReplace = cmp.get('v.importConfig.refreshType') === 'Replace';
        cmp.set('v.refreshTypeUpdate', !isReplace);
        cmp.set('v.refreshTypeReplace', isReplace);

        var segmentName = cmp.get('v.importConfig.segmentName');
        if (segmentName) {
            cmp.set('v.createSegment', true);
            $A.util.removeClass(cmp.find('segment-input-id'), "slds-hide");
        }
    },
    toggleSchedule: function(cmp, event, helper) {
        helper.doToggleSchedule(cmp, helper);
    },
    setScheduledDays: function(cmp, event, helper) {

        cmp.set('v.importConfig.title', 'Import Wizard - Schedule');
        helper.fireWizardEvent(cmp, helper);
    },
    doSetPreferredTime: function(cmp, event, helper) {

        var selectedTimes = cmp.find('runTimesId');
        cmp.set('v.selectedTime', selectedTimes.get('v.value'));

        helper.fireWizardEvent(cmp, helper);
    },
    onSelectedRefreshType: function(cmp, event, helper) {

        var refreshType = event.getSource().get('v.value').toUpperCase();
        cmp.set('v.importConfig.refreshType', refreshType);
        helper.fireWizardEvent(cmp, helper);
    },
    doSegmentToggle: function(cmp, event, helper) {

        var segmentName = cmp.get('v.importConfig.importTitle');
        if (cmp.get('v.createSegment')) {
            $A.util.removeClass(cmp.find('segment-input-id'), "slds-hide");
        } else {
            $A.util.addClass(cmp.find('segment-input-id'), "slds-hide");
            segmentName = '';
        }

        cmp.set('v.importConfig.segmentName', segmentName);
        helper.fireWizardEvent(cmp, helper);
    },
    doUpdateSegmentName: function(cmp, event, helper) {
        helper.fireWizardEvent(cmp, helper);
    },
    doUpdateClearSetting: function(cmp, event, helper) {
        helper.fireWizardEvent(cmp, helper);
    },
    collapseSectionAdvanced: function(cmp, event, helper) {

        var section = cmp.find('advanced-id');
        $A.util.toggleClass(section, 'slds-is-open');

        if (cmp.get('v.showAdvanced')) {
            cmp.set('v.showAdvanced', false);
        } else {
            cmp.set('v.showAdvanced', true);
        }
    },
})