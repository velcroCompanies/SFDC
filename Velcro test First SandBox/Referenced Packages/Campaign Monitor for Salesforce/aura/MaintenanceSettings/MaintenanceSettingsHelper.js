({

    // Check if the status of the job
    doInitJobs: function(cmp, event, helper) {

        // Fire event to check for running jobs
        helper.doFireJobCheck(cmp, event, helper);

        // Get any error logs and display them in the maintenance table
        helper.getMessages(cmp, event, helper);
    },

    doFireJobCheck: function(cmp, event, helper, initJob) {
        // Fire event to check for running jobs
        var jobEvent = $A.get("e.wbsendit:sldsJobsEvent");
        jobEvent.setParams({ "msgType": 'NX_CHECK_RUNNING_JOBS' });
        if (initJob) {
            jobEvent.setParams({ "initJob": true });
        }
        jobEvent.fire();
    },

    // Check if the status of the job
    doCheckJobs: function(cmp, event, helper) {

        var msgType = event.getParam("msgType");
        var showJobsBanner = event.getParam("showJobsBanner");

        if (msgType === 'NX_JOB_STATUS') {

            var runningJobs = event.getParam("apexJobs");

            // If there are jobs running then set the banner
            var runningSetupPageLayout = false;
            var runningRemovePageLayout = false;
            var runningRefresh = false;
            for (var i = 0; i < runningJobs.length; i++) {

                if (runningJobs[i].jobType === 'ADD_PAGE_LAYOUT') {
                    cmp.set('v.setupLayoutJob', runningJobs[i]);
                    runningSetupPageLayout = true;
                }

                if (runningJobs[i].jobType === 'REMOVE_PAGE_LAYOUT') {
                    cmp.set('v.removeLayoutJob', runningJobs[i]);
                    runningRemovePageLayout = true;
                }

            }

            if (runningSetupPageLayout) {
                cmp.set('v.disableRemoveLayout', true);
            } else if (!showJobsBanner) {
                cmp.set('v.setupLayoutJob', null);
                cmp.set('v.disableRemoveLayout', false);
            }

            if (runningRemovePageLayout) {
                cmp.set('v.disableAddLayout', true);
            } else if (!showJobsBanner) {
                cmp.set('v.removeLayoutJob', null);
                cmp.set('v.disableAddLayout', false);
            }

            if (!showJobsBanner) {
                cmp.set('v.disableReset', false);
            } else {
                cmp.set('v.disableReset', true);
            }

        }

    },

    // Check if the status of the job
    doSetupPagelayouts: function(cmp, event, helper) {

        // Disable the buttons and show banner
        cmp.set('v.disableAddLayout', true);
        cmp.set('v.disableRemoveLayout', true);
        cmp.set('v.showJobsBanner', true);

        helper.doFireJobCheck(cmp, event, helper, true);

        var action = cmp.get("c.addPageLayouts");
        action.setParams({
            sessionId: cmp.get('v.sfdcSessionId')
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {} else if (state === "ERROR") {

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

    // Check if the status of the job
    doRemovePagelayouts: function(cmp, event, helper) {

        // Disable the buttons and show banner
        cmp.set('v.disableAddLayout', true);
        cmp.set('v.disableRemoveLayout', true);
        cmp.set('v.showJobsBanner', true);

        helper.doFireJobCheck(cmp, event, helper, true);

        var action = cmp.get("c.removePageLayouts");
        action.setParams({
            sessionId: cmp.get('v.sfdcSessionId')
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {} else if (state === "ERROR") {

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

    // Check if the status of the job
    doResetData: function(cmp, event, helper, resetType) {

        // Disable the reset button and checkboxes
        cmp.set('v.disableReset', true);
        cmp.set('v.disableResetButton', true);
        cmp.set('v.showJobsBanner', true);

        var action = cmp.get("c.refreshData");
        action.setParams({
            refreshType: resetType
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                // cmp.set('v.disableNotification', false);
                helper.doFireJobCheck(cmp, event, helper);
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

    // Check if the status of the job
    getMessages: function(cmp, event, helper) {

        var action = cmp.get("c.getMessageLog");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                cmp.set('v.messageLog', actionResult.getReturnValue());


                var resultsMessage = '';
                if (actionResult.getReturnValue().length > 0) {
                    resultsMessage = actionResult.getReturnValue().length + (actionResult.getReturnValue().length === 1 ? ' message' : ' messages');
                }
                cmp.set('v.resultsMessage', resultsMessage);
                helper.turnOffSpinner(cmp);

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

    // Check if the status of the job
    doDeleteMessages: function(cmp, event, helper, name) {

        cmp.set('v.disableClearLog', true);

        var action = cmp.get("c.clearLog");
        action.setParams({
            name: name
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                helper.getMessages(cmp, event, helper);
                cmp.set('v.disableClearLog', false);
                helper.successNotification(cmp, event, helper, 'Deleted log messages');
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
    turnOffSpinner: function(cmp) {

        $A.util.addClass(cmp.find('body-spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    successNotification: function(cmp, event, helper, msg) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg
        }).fire();

    },

})