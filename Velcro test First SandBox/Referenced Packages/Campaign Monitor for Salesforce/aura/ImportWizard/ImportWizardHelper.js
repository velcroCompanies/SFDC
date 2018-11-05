({
    doInit: function(cmp, event, helper) {

        // Check for premium
        var isPremiumOrTrial = cmp.get('v.listdetail.isPremiumOrTrial');
        var showUpgradeMsgClass = isPremiumOrTrial ? 'slds-hide' : 'slds-show';
        cmp.set('v.showUpgradeMsgClass', showUpgradeMsgClass);

        // Check for org is connected
        var isConnected = cmp.get('v.listdetail.isConnected');
        var showConnectMsgClass = isConnected ? 'slds-hide' : 'slds-show';
        cmp.set('v.showConnectMsgClass', showConnectMsgClass);

        // Check API
        var isAPIEnabled = cmp.get('v.listdetail.isAPIEnabled');

        // Setup the main import wizard config (it's passed to each page)
        var importConfig = {};
        importConfig.title = 'Import Wizard - Select Import Type';
        importConfig.listId = cmp.get('v.listdetail.cmListId');
        importConfig.subscriberListId = cmp.get('v.listdetail.listId');
        importConfig.scheduledId = cmp.get('v.scheduledId');
        importConfig.subscriberListName = cmp.get('v.listdetail.listName');
        importConfig.scheduledRecord = '';
        if (importConfig.scheduledId) {
            importConfig.step = 1;
        } else {
            importConfig.step = 0;
        }
        importConfig.isNextDisabled = true;
        importConfig.isRunOnceDisabled = false;
        importConfig.isScheduleDisabled = false;
        importConfig.bodyClass = 'slds-grid slds-grid--vertical-align-center';
        importConfig.importType = '';
        importConfig.importTypeId = '';
        importConfig.importTitle = '';
        importConfig.importSubTitle = importConfig.subscriberListName;
        importConfig.importSubTitleObject = '';
        importConfig.fieldMap = '';
        importConfig.runType = '';
        importConfig.action = '';
        importConfig.soql = '';
        importConfig.isAPIEnabled = isAPIEnabled;
        // TODO: Turn on preventMemberSync after the import has bedded down
        importConfig.preventMemberSync = true; // (cmp.get('v.preventMemberSync') === "true");

        cmp.set('v.importConfig', importConfig);

        if (!isConnected)
            return;

        debugger
        // Check for scheduled URL parameter
        if (importConfig.scheduledId && isPremiumOrTrial) {
            helper.doGetScheduledRecord(cmp, event, helper, importConfig.scheduledId);
        } else {
            helper.doNext(cmp, event, helper);
        }
    },
    doGetScheduledRecord: function(cmp, event, helper, scheduledId) {

        var action = cmp.get("c.getScheduledRecordJSON");
        action.setParams({
            scheduledId: scheduledId
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var importConfig = cmp.get('v.importConfig');
                importConfig.scheduledRecord = actionResult.getReturnValue().schedule;
                importConfig.importType = actionResult.getReturnValue().importType;
                importConfig.importTypeId = actionResult.getReturnValue().importTypeId;
                importConfig.importTitle = actionResult.getReturnValue().importTitle;
                importConfig.importSubTitle = actionResult.getReturnValue().subscriberListName;
                importConfig.subscriberListName = importConfig.importSubTitle
                importConfig.subscriberListId = actionResult.getReturnValue().subscriberListId;
                importConfig.soql = actionResult.getReturnValue().soql;
                importConfig.refreshType = actionResult.getReturnValue().refreshType;
                importConfig.segmentName = actionResult.getReturnValue().segmentName;
                importConfig.clearBlankValues = actionResult.getReturnValue().clearBlankValues;
                cmp.set('v.importConfig', importConfig);

                // cmp.set("v.scheduledImport", actionResult.getReturnValue());
                helper.doNext(cmp, event, helper);
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },

    // Save / Save & Run
    saveSubscriberImportRecord: function(cmp, event, helper) {
        debugger
        var action = cmp.get("c.saveAndRun");
        action.setParams({
            importConfig: JSON.stringify(cmp.get("v.importConfig"))
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                helper.fireWizardEvent(cmp, event, helper, 'Preparing');
                helper.doHideWizard(cmp);
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },
    doNext: function(cmp, event, helper) {

        var importConfig = cmp.get("v.importConfig");
        importConfig.isNextDisabled = true;
        cmp.set("v.importConfig", importConfig);

        // Clear out previous component
        cmp.set("v.body", []);

        var cmpName = "wbsendit:ImportWizardSelect";
        var cmpId = "importWizardSelectId";
        var step = "";


        if (cmp.get("v.importConfig").step === 3) {
            cmpName = "wbsendit:ImportSchedule";
            cmpId = "importScheduleId";
        }

        if (cmp.get("v.importConfig").step === 2) {
            cmpName = "wbsendit:ImportFieldMap";
            cmpId = "importFieldMapId";
        }

        if (cmp.get("v.importConfig").step === 1) {
            if (cmp.get("v.importConfig").importType.toLowerCase() === 'report') {
                cmpName = "wbsendit:ImportReport";
                cmpId = "importReportId";
            } else if (cmp.get("v.importConfig").importType.toLowerCase() === 'listview') {
                cmpName = "wbsendit:ImportListView";
                cmpId = "importListViewId";
            } else if (cmp.get("v.importConfig").importType.toLowerCase() === 'soql') {
                cmpName = "wbsendit:ImportSoql";
                cmpId = "importSoqlId";
            }
        }

        // Dynamically set body component of the wizard
        $A.createComponent(
            cmpName, {
                "aura:id": cmpId,
                "importConfig": cmp.get("v.importConfig")
            },
            function(fieldMap, status, errorMessage) {

                //Add the new button to the body array
                if (status === "SUCCESS") {

                    var body = cmp.get("v.body");
                    body.push(fieldMap);
                    cmp.set("v.body", body);

                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                }
            }
        );
    },

    // Navigation functions (TODO: revisit in Spring 16)
    navigateToPage: function(helper, path) {
        if ((!helper.isLightning()) && helper.hasSforceOne()) {
            sforce.one.navigateToURL(path); // eslint-disable-line
        } else {
            window.location.href = path;
        }
    },
    hasSforceOne: function() {
        var sf;
        try {
            sf = (sforce && sforce.one); // eslint-disable-line
        } catch (exc) {
            sf = false;
        }
        return sf;
    },
    isLightning: function() {
        return $A.get("e.force:showToast");
    },
    isMobile: function() {
        var userAgent = window.navigator.userAgent.toLowerCase();
        return (-1 !== userAgent.indexOf('mobile'));
    },
    doHideWizard: function(cmp) {
        var promptBackdrop = cmp.find('wizard-id');
        $A.util.toggleClass(promptBackdrop, 'slds-hide');
    },
    fireWizardEvent: function(cmp, event, helper, status) {

        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({ "importConfig": status });
        compEvent.fire();
    },
})