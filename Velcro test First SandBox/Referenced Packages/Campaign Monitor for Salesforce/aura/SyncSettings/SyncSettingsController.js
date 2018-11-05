({
    onInit: function(cmp, event, helper) {

        // Initialise chart
        var dataStorage = JSON.parse('[{"segment":"Email","value":0},{"segment":"Other","value":0},{"segment":"Free","value":0}]');
        cmp.set('v.data', dataStorage);

        // Call main init
        helper.doInit(cmp, event, helper);

    },
    onRunSyncNow: function(cmp, event, helper) {
        helper.doRunSyncNow(cmp, event, helper);
    },
    onCheckJobs: function(cmp, event, helper) {
        helper.doCheckJobs(cmp, event, helper);
    },
    onConnectEvent: function(cmp, event, helper) {
        helper.doConnectEvent(cmp, event, helper);
    },
    doConnect: function(cmp, event, helper) {},

    onDisconnect: function(cmp, event, helper) {
        helper.doDisconnect(cmp, event, helper);

    },

    handleNeverClicked: function(cmp, event, helper) {

        helper.updateSyncFrequency(cmp, event, helper, 'never');

    },

    handleHourlyClicked: function(cmp, event, helper) {

        helper.updateSyncFrequency(cmp, event, helper, 'hourly');

    },

    handleDailyClicked: function(cmp, event, helper) {

        helper.updateSyncFrequency(cmp, event, helper, 'daily');

    },

    handleWeeklyClicked: function(cmp, event, helper) {

        helper.updateSyncFrequency(cmp, event, helper, 'weekly');

    },

    handleMonthlyClicked: function(cmp, event, helper) {

        helper.updateSyncFrequency(cmp, event, helper, 'monthly');

    },


    connectionCompleted: function(cmp, event, helper) {

        helper.handleConnectionCompletedEvent(cmp, event, helper);

    },

    showDisconnectDialog: function(cmp, event, helper) {

        helper.showModal(cmp, event, helper, 'disconnectDialog');

    },

    showMultiClientModal: function(cmp, event, helper) {

        helper.openMultiClientModal(cmp, event, helper);

    },

    saveClients: function(cmp, event, helper) {

        helper.saveClients(cmp, event, helper);

    },


    saveAutoResponders: function(cmp, event, helper) {

        helper.doSaveAdvancedSettings(cmp, event, helper, 'auto', cmp.get('v.settings.enableAutoResponders'));

    },

    saveAccountTrigger: function(cmp, event, helper) {

        helper.doSaveAdvancedSettings(cmp, event, helper, 'acctrigger', cmp.get('v.settings.accountContactTrigger'));

    },
    saveDisableTriggers: function(cmp, event, helper) {

        helper.doSaveAdvancedSettings(cmp, event, helper, 'allactions', cmp.get('v.settings.disableAllActions'));

    },

    saveBulkActions: function(cmp, event, helper) {

        helper.doSaveAdvancedSettings(cmp, event, helper, 'bulkactions', cmp.get('v.settings.disableBulkActions'));

    },

    saveAllActions: function(cmp, event, helper) {

        helper.doSaveAdvancedSettings(cmp, event, helper, 'allactions', cmp.get('v.settings.disableAllActions'));

    },

    saveTrackingDataToggle: function(cmp, event, helper) {
        debugger
        var syncEmailTrackingData = cmp.find('email-sync-all-id').get('v.checked');
        if (syncEmailTrackingData) {
            cmp.set('v.settings.statsToSaveSent', true);
            cmp.set('v.settings.statsToSaveOpened', true);
            cmp.set('v.settings.statsToSaveClicked', true);
            cmp.set('v.settings.statsToSaveBounced', true);
            cmp.set('v.settings.statsToSaveUnsubscribed', true);
        }

        helper.doSaveTrackingData(cmp, event, helper);

    },
    saveTrackingDataDay: function(cmp, event, helper) {
        helper.doSaveTrackingData(cmp, event, helper);
    },
    saveTrackingDataItem: function(cmp, event, helper) {

        // Set the variant
        var cmpId = event.getSource().getLocalId();
        var item = cmp.find(cmpId);

        if (cmpId === 'recipients-id') {
            cmp.set('v.settings.statsToSaveSent', (item.get('v.variant') !== 'brand'));
        }
        if (cmpId === 'opens-id') {
            cmp.set('v.settings.statsToSaveOpened', (item.get('v.variant') !== 'brand'));
        }
        if (cmpId === 'clicks-id') {
            cmp.set('v.settings.statsToSaveClicked', (item.get('v.variant') !== 'brand'));
        }
        if (cmpId === 'bounces-id') {
            cmp.set('v.settings.statsToSaveBounced', (item.get('v.variant') !== 'brand'));
        }
        if (cmpId === 'unsubscribes-id') {
            cmp.set('v.settings.statsToSaveUnsubscribed', (item.get('v.variant') !== 'brand'));
        }

        if (cmp.get('v.settings.statsToSaveSent') ||
            cmp.get('v.settings.statsToSaveOpened') ||
            cmp.get('v.settings.statsToSaveClicked') ||
            cmp.get('v.settings.statsToSaveBounced') ||
            cmp.get('v.settings.statsToSaveUnsubscribed')) {

        } else {
            cmp.set('v.settings.syncEmailTrackingData', false);
        }

        helper.doSaveTrackingData(cmp, event, helper);

    },
})