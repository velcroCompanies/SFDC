({

    doInit: function(cmp, event, helper) {

        // Fire event to check for running jobs
        helper.doFireJobCheck(cmp, event, helper);

        var action = cmp.get('c.getSyncSettingsPageInfo');

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var settings = actionResult.getReturnValue();
                cmp.set('v.settings', settings);

                // Check for missing campaign monitor client
                if (settings.isConnected && settings.clientNames === '') {
                    cmp.find('b12-prompt-client').open();
                    cmp.set('v.settings.clientNames', 'NO ACTIVE CLIENTS');
                }

                helper.doChart(cmp, event, helper, settings);

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
            helper.turnOffSpinner(cmp);
        });

        $A.enqueueAction(action);

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
    doFireDisconnectEvent: function(cmp, event, helper, settings) {
        var jobEvent = $A.get("e.wbsendit:sldsDisconnectEvent");
        jobEvent.fire();
    },
    doConnectEvent: function(cmp, event, helper, settings) {

        // Received an event from the connect component
        var connected = event.getParam("connectionSettings");
        if (!connected.isConnected) {
            // Disable buttons
            helper.disableDisconnectButtons(cmp, event, helper);
        } else {
            helper.enableDisconnectButtons(cmp, event, helper);
        }
    },

    // Check if the status of the job
    doCheckJobs: function(cmp, event, helper) {

        var msgType = event.getParam("msgType");
        var showJobsBanner = event.getParam("showJobsBanner");

        //Set up the callback
        if (msgType === 'NX_JOB_STATUS') {

            if (showJobsBanner) {
                cmp.set('v.disableSyncNowButton', true);
                cmp.set('v.disableSelectClientButton', true);
            } else if (!cmp.get('v.disableDisconnectButton')) {
                // Only enable reset data button when all jobs have finished and we are connected
                cmp.set('v.disableSyncNowButton', false);
                cmp.set('v.disableSelectClientButton', false);
            }

        }

    },

    // Check if the status of the job
    doRunSyncNow: function(cmp, event, helper) {

        cmp.set('v.disableSyncNowButton', true);
        cmp.set('v.disableSelectClientButton', true);
        cmp.set('v.showJobsBanner', true);

        helper.doFireJobCheck(cmp, event, helper, true);

        var action = cmp.get("c.refreshData");
        action.setParams({
            refreshType: 'SYNC_NOW'
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

    disableDisconnectButtons: function(cmp, event, helper) {
        cmp.set('v.disableSyncNowButton', true);
        cmp.set('v.disableDisconnectButton', true);
        cmp.set('v.disableSelectClientButton', true);
    },
    enableDisconnectButtons: function(cmp, event, helper) {
        cmp.set('v.disableSyncNowButton', false);
        cmp.set('v.disableDisconnectButton', false);
        cmp.set('v.disableSelectClientButton', false);
    },

    doDisconnect: function(cmp, event, helper) {

        var action = cmp.get('c.' + 'disconnectFromCM');

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var settings = actionResult.getReturnValue();

                helper.saveSettings(cmp, event, helper, settings);
                helper.doDisconnectSuccess(cmp, event, helper, settings);
                helper.doFireDisconnectEvent(cmp, event, helper);

                helper.disableDisconnectButtons(cmp);

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

    doDisconnectSuccess: function(cmp, event, helper, settings) {

        helper.saveSettings(cmp, event, helper, settings);
        var modal = cmp.find('disconnectDialog');

        if (modal) {
            modal.close();
        }
    },

    openMultiClientModal: function(cmp, event, helper) {

        var action = cmp.get('c.' + 'getClientDetails');

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                helper.getClientDetailsSuccess(cmp, event, helper, actionResult.getReturnValue());

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

    saveClients: function(cmp, event, helper) {

        var newClients = [];
        var newClientsLabel = [];
        var selectedClients = cmp.get('v.selectedClients');

        var showSaveMsg = true;

        // Build up array of selected clients
        for (var i = 0; i < selectedClients.length; i++) {

            if (!cmp.get('v.settings.isPremiumEnabled') && i > 0) {
                helper.successNotification(cmp, event, helper, 'Multi-Client is a premium feature. Only one client can be selected at a time with the free version.');
                showSaveMsg = false;
                break;
            }
            newClients.push(selectedClients[i].value);
            newClientsLabel.push(selectedClients[i].label);
        }

        var action = cmp.get('c.updateSelectedClients');

        action.setParams({
            clients: newClients.join(',')
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {
                if (showSaveMsg) {
                    helper.successNotification(cmp, event, helper, 'Client selection was saved. The configuration is being updated in the background.');
                }

                // Set the client names
                cmp.set('v.settings.clientNames', newClientsLabel.join(','));

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                        if (errors[0].message.includes('SENDIT-017')) {
                            cmp.find('b12-prompt').open();
                        }
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

            // Hide the client picklist modal
            helper.hideModal(cmp, event, helper, 'multiClientsDialog');

        });

        $A.enqueueAction(action);

    },
    doSaveAdvancedSettings: function(cmp, event, helper, settingType, value) {

        var action = cmp.get('c.' + 'saveAdvancedSetting');
        action.setParams({
            settingType: settingType,
            value: value
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {
                helper.successNotification(cmp, event, helper, 'Sync Settings were updated');
                // var settings = actionResult.getReturnValue();

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

    saveSetting: function(cmp, event, helper, theSetting, theValue) {

        helper.callController(cmp, event, helper, 'saveSetting', { setting: theSetting, value: theValue }, helper.saveSettingsSuccess);

    },

    showModal: function(cmp, event, helper, modalId) {

        var modal = cmp.find(modalId);
        if (modal) {
            modal.open();
        }
    },

    hideModal: function(cmp, event, helper, modalId) {

        var modal = cmp.find(modalId);
        if (modal) {
            modal.close();
        }
    },

    updateSelectedClientsSuccess: function(cmp, event, helper) {

        helper.hideModal(cmp, event, helper, 'multiClientsDialog');

    },

    getClientDetailsSuccess: function(cmp, event, helper, clientDetails) {

        var available = [];
        var selected = [];

        for (var i = 0; i < clientDetails.length; i++) {

            var client = clientDetails[i];

            var item = { label: client.ClientName, value: client.ClientId, selected: false };
            if (client.IsConnected) {
                selected.push(item);
            } else {
                available.push(item);
            }
        }

        cmp.set('v.availableClients', available);
        cmp.set('v.selectedClients', selected);

        helper.showModal(cmp, event, helper, 'multiClientsDialog');

    },



    updateSyncFrequencySuccess: function(cmp, event, helper, settings) {

        helper.saveSettings(cmp, event, helper, settings);
    },

    handleConnectionCompletedEvent: function(cmp, event, helper) {

        // this.doLoadSettings(cmp, event, helper);

    },

    updateSyncFrequency: function(cmp, event, helper, newFrequency) {

        cmp.set('v.settings.syncFrequency', newFrequency);
        this.callController(cmp, event, helper, 'updateSyncFrequency', { frequency: newFrequency }, this.updateSyncFrequencySuccess);

    },

    saveSettingsSuccess: function(cmp, event, helper, settings) {

        helper.saveSettings(cmp, event, helper, settings);

    },

    // Call a method on the controller
    callController: function(cmp, event, helper, methodName, parameters, success, error) {

        var action = cmp.get('c.' + methodName);

        if (parameters) {
            action.setParams(parameters);
        }

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                helper.successNotification(cmp, event, helper, 'Sync Settings were updated');
                if (success) {

                    var newsettings = actionResult.getReturnValue();

                    // Hack - if we can't get the connected user, use the old one
                    if (newsettings.connectedAs === 'Connected') {
                        newsettings.connectedAs = cmp.get('v.settings.connectedAs');
                    }

                    success(cmp, event, helper, newsettings);
                }



            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                        if (errors[0].message.includes('SENDIT-017')) {
                            cmp.find('b12-prompt').open();
                        }
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            helper.turnOffSpinner(cmp);
        });

        $A.enqueueAction(action);

    },

    doChart: function(cmp, event, helper, settings) {
        // Build metrics for the Salesforce space donut chart

        var dataStorage = [];

        if (settings && settings.totalStorage) {

            var segmentEmail = {};
            segmentEmail.segment = 'Email';
            segmentEmail.value = settings.totalTrackingData;
            dataStorage.push(segmentEmail);

            var segmentSubscriber = {};
            segmentSubscriber.segment = 'Subscriber';
            segmentSubscriber.value = settings.totalSubscriberData;
            dataStorage.push(segmentSubscriber);

            var segmentOther = {};
            segmentOther.segment = 'Other';
            segmentOther.value = settings.totalOtherStorageUsed;
            dataStorage.push(segmentOther);

            var segmentFree = {};
            segmentFree.segment = 'Free';
            segmentFree.value = settings.totalStorageFree;
            dataStorage.push(segmentFree);
            cmp.set('v.data', dataStorage);

            if (settings.totalStorageFree < 0) {
                cmp.find('b12-prompt').open();
            }
            $A.util.removeClass(cmp.find('storage-id'), "slds-hide");

        } else {
            dataStorage = JSON.parse('[{"segment":"Email","value":0},{"segment":"Subscriber","value":0},{"segment":"Other","value":1},{"segment":"Free","value":0}]');
            cmp.set('v.data', dataStorage);
            $A.util.addClass(cmp.find('storage-id'), "slds-hide");

        }
    },

    saveSettings: function(cmp, event, helper, settings) {

        if (settings && !settings.connectedAs) {
            var old = cmp.get('v.settings.connectedAs');
            settings.connectedAs = old;
        }
        if (settings && !settings.syncEmailTrackingData) {
            settings.syncEmailTrackingData = cmp.get('v.settings.syncEmailTrackingData');
            settings.statsToSaveBounced = cmp.get('v.settings.statsToSaveBounced');
            settings.statsToSaveClicked = cmp.get('v.settings.statsToSaveClicked');
            settings.statsToSaveOpened = cmp.get('v.settings.statsToSaveOpened');
            settings.statsToSaveSent = cmp.get('v.settings.statsToSaveSent');
            settings.statsToSaveUnsubscribed = cmp.get('v.settings.statsToSaveUnsubscribed');

        }

        cmp.set('v.settings', settings);

    },

    doSaveTrackingData: function(cmp, event, helper) {

        // Import email tracking data: true/false
        var syncEmailTrackingData = cmp.find('email-sync-all-id').get('v.checked');

        var txnTypes = [];

        // Get selected txn types
        if (syncEmailTrackingData) {

            if (cmp.get('v.settings.statsToSaveSent')) {
                txnTypes.push('recipients');
            }
            if (cmp.get('v.settings.statsToSaveOpened')) {
                txnTypes.push('opens');
            }
            if (cmp.get('v.settings.statsToSaveClicked')) {
                txnTypes.push('clicks');
            }
            if (cmp.get('v.settings.statsToSaveBounced')) {
                txnTypes.push('bounces');
            }
            if (cmp.get('v.settings.statsToSaveUnsubscribed')) {
                txnTypes.push('unsubscribes');
            }
        }

        // If we are turning back on txns, then select all types
        if (syncEmailTrackingData && txnTypes.length === 0) {
            cmp.set('v.settings.statsToSaveSent', true);
            cmp.set('v.settings.statsToSaveOpened', true);
            cmp.set('v.settings.statsToSaveClicked', true);
            cmp.set('v.settings.statsToSaveBounced', true);
            cmp.set('v.settings.statsToSaveUnsubscribed', true);
            txnTypes.push('recipients');
            txnTypes.push('opens');
            txnTypes.push('clicks');
            txnTypes.push('bounces');
            txnTypes.push('unsubscribes');
        }

        // Toggle the txn to off if all txn types are deselected
        if (txnTypes.length === 0) {
            cmp.find('email-sync-all-id').set('v.checked', false);
        }

        // Generate string of txn types to be stored in settings
        var statsToSave = txnTypes.join(' ');
        statsToSave = (statsToSave === '') ? 'none' : statsToSave;

        // Days to retain
        var dtr = cmp.find('days-retain-id');
        if (dtr) {
            var daysToRetain = dtr.get('v.value');
            if (!daysToRetain)
                daysToRetain = -1;
        }

        var action = cmp.get("c.saveTrackingData");
        action.setParams({
            syncEmailTrackingData: syncEmailTrackingData,
            statsToSave: statsToSave,
            daysToRetain: daysToRetain
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();

            if (state === "SUCCESS") {

                helper.successNotification(cmp, event, helper, 'Email tracking data settings were updated and will apply on the next sync.');

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