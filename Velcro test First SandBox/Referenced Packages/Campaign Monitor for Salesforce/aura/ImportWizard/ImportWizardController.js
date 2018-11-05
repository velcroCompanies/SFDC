({
    onInit: function(cmp, event, helper) {
        helper.doInit(cmp, event, helper);
    },
    doRunOnce: function(cmp, event, helper) {
        debugger
        var importConfig = cmp.get('v.importConfig');
        importConfig.action = 'run';
        importConfig.isRunOnceDisabled = true;
        cmp.set('v.importConfig', importConfig);

        helper.saveSubscriberImportRecord(cmp, event, helper);
    },
    doSaveSchedule: function(cmp, event, helper) {

        var importConfig = cmp.get('v.importConfig');
        importConfig.action = 'schedule';
        importConfig.isScheduleDisabled = true;
        cmp.set('v.importConfig', importConfig);

        helper.saveSubscriberImportRecord(cmp, event, helper);

    },
    doSaveScheduleRunOnce: function(cmp, event, helper) {

        var importConfig = cmp.get('v.importConfig');
        importConfig.action = 'run'; // and schedule
        importConfig.isScheduleDisabled = true;
        cmp.set('v.importConfig', importConfig);

        helper.saveSubscriberImportRecord(cmp, event, helper);

    },
    doCancel: function(cmp, event, helper) {

        // Send event to close the window? or toggle visibility
        helper.doHideWizard(cmp);

    },
    doImportWizardEvent: function(cmp, event) {

        var importConfig = event.getParam("importConfig");
        cmp.set('v.importConfig', importConfig);

        if (cmp.get('v.listdetail.isPremiumOrTrial') === "false") {
            cmp.set('v.importConfig.isNextDisabled', true);
        }

        // Set title and subtitle
        cmp.set('v.importConfig.importSubTitle', cmp.get('v.importConfig.subscriberListName'));
        if (cmp.get('v.importConfig.importSubTitleObject')) {
            cmp.set('v.importConfig.importSubTitle', cmp.get('v.importConfig.subscriberListName') + ' - ' + cmp.get('v.importConfig.importSubTitleObject'));
        }

        // Show / Hide general message
        if (cmp.get('v.importConfig').generalMsg) {
            cmp.set('v.generalMsg', cmp.get('v.importConfig').generalMsg);
            cmp.set('v.showGeneralMsgClass', '');
        } else {
            cmp.set('v.showGeneralMsgClass', 'slds-hide');
        }

        // Set the next, save etc buttons
        if (importConfig.runType) {
            $A.util.addClass(cmp.find("next-id"), "slds-hide");
            if (importConfig.runType === 'schedule') {
                $A.util.removeClass(cmp.find("save-id"), "slds-hide");
                $A.util.removeClass(cmp.find("saverun-id"), "slds-hide");
                $A.util.addClass(cmp.find("runonce-id"), "slds-hide");
                cmp.set('v.importConfig.isScheduleDisabled', false);
            }
            if (importConfig.runType === 'run') {
                $A.util.removeClass(cmp.find("runonce-id"), "slds-hide");
                $A.util.addClass(cmp.find("save-id"), "slds-hide");
                $A.util.addClass(cmp.find("saverun-id"), "slds-hide");
            }

            if (importConfig.runType === 'scheduleDisabled') {
                $A.util.addClass(cmp.find("runonce-id"), "slds-hide");
                $A.util.removeClass(cmp.find("save-id"), "slds-hide");
                $A.util.removeClass(cmp.find("saverun-id"), "slds-hide");
                cmp.set('v.importConfig.isScheduleDisabled', true);
            }
        } else {
            $A.util.removeClass(cmp.find("next-id"), "slds-hide");
            $A.util.addClass(cmp.find("runonce-id"), "slds-hide");
            $A.util.addClass(cmp.find("save-id"), "slds-hide");
            $A.util.addClass(cmp.find("saverun-id"), "slds-hide");
        }

        if (importConfig.step === 1) {
            cmp.set("v.pctComplete", "0%");
            cmp.set("v.step1", 'slds-is-active');
            cmp.set("v.step2", '');
            cmp.set("v.step3", '');
            cmp.set("v.step4", '');
        } else if (importConfig.step === 2) {
            cmp.set("v.pctComplete", "35%");
            cmp.set("v.step1", 'slds-is-completed');
            cmp.set("v.step2", 'slds-is-active');
            cmp.set("v.step3", '');
            cmp.set("v.step4", '');
        } else if (importConfig.step === 3) {
            cmp.set("v.pctComplete", "66%");
            cmp.set("v.step1", 'slds-is-completed');
            cmp.set("v.step2", 'slds-is-completed');
            cmp.set("v.step3", 'slds-is-active');
            cmp.set("v.step4", '');
        } else if (importConfig.step === 4) {
            cmp.set("v.pctComplete", "100%");
            cmp.set("v.step1", 'slds-is-completed');
            cmp.set("v.step2", 'slds-is-completed');
            cmp.set("v.step3", 'slds-is-completed');
            cmp.set("v.step4", 'slds-is-active');
        } else if (importConfig.step === 5) {
            // We may never end up here as the user presses the next button
            cmp.set("v.pctComplete", "100%");
            cmp.set("v.step1", 'slds-is-completed');
            cmp.set("v.step2", 'slds-is-completed');
            cmp.set("v.step3", 'slds-is-completed');
            cmp.set("v.step4", 'slds-is-completed');
        }
    },
    doNextStep: function(cmp, event, helper) {
        helper.doNext(cmp, event, helper);
    },

    openWizard: function(component, event, helper) {
        helper.toggleVisibility(component, true);
    },

    closeWizard: function(component, event, helper) {
        helper.toggleVisibility(component, false);
    }
})