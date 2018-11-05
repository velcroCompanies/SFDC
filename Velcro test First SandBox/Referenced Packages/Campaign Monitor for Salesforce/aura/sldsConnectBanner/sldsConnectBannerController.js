({
    onInit : function(cmp, event, helper) {
        helper.doInit(cmp, event, helper);
    },
    onDisconnectEvent : function(cmp, event, helper) {
        var connInfo = cmp.get('v.setupDetail');
        connInfo.isConnected = false;
        cmp.set('v.setupDetail', connInfo);

    },
    onConnect : function(cmp, event, helper){
         window.location.href = '/apex/SetupWizard?cmpid=2';
    },
})