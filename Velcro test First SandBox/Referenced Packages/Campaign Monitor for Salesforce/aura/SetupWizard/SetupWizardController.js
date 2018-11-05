({
	onInit : function(cmp, event, helper) {
        helper.doGetSetupDetails(cmp, event, helper);
    },
	onConnectEvent : function(cmp, event, helper) {
        // Receive connect event
        var connected = event.getParam("connectionSettings");
        cmp.set('v.connectionInfo', connected);

    },
	onDisconnectEvent : function(cmp, event, helper) {

        var connInfo = cmp.get('v.setupDetail');
        connInfo.isConnected = false;
        cmp.set('v.setupDetail', connInfo);

    },
	onConnect : function(cmp, event, helper){
		helper.doOpenConnectionWindow(cmp);

        var b12ConnectId = cmp.find("b12-connect-id");
        $A.util.addClass(b12ConnectId, 'slds-hide');

        var b12LoaderId = cmp.find("b12-loader-id");
        $A.util.removeClass(b12LoaderId, 'slds-hide');

	},
	onConnectionCompleted : function(cmp, event, helper){

        console.log('Code:' + event.getParam('code'));
        console.log('State:' + event.getParam('state'));

        var code = event.getParam('code');
        var state = event.getParam('state');

        if(code === '203') {
            helper.doStartStatusCheck(cmp, event, helper);
        } else {
            // Show error
            var successId = cmp.find("b12-success-id");
            $A.util.addClass(successId, 'slds-hide');

            var connectId = cmp.find("b12-connect-id");
            $A.util.addClass(connectId, 'slds-hide');

            var loaderId = cmp.find("b12-loader-id");
            $A.util.addClass(loaderId, 'slds-hide');

            var errorId = cmp.find("b12-error-id");
            $A.util.removeClass(errorId, 'slds-hide');

            cmp.set('v.installStage', state);
        }


	},
    onCheckStatus : function(cmp, event, helper) {

        helper.doStartStatusCheck(cmp, event, helper);

    },
    onHelpError : function(cmp, event, helper) {

        // Open help link with for errors
        window.open('http://support.beaufort12.com/', '_blank');
    },
    onFinish : function(cmp, event, helper) {
        helper.doFinish(cmp, event, helper);
    },
    onCancel : function(cmp, event, helper) {
        window.location.href = cmp.get('v.setupDetail.cancelledURL');
    },

})