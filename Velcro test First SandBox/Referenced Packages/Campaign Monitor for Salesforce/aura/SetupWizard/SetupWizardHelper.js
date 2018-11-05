({
    doGetSetupDetails : function(cmp, event, helper) {

        var action = cmp.get("c.getSetupDetails");
        action.setParams({
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

            	var setupDetail = actionResult.getReturnValue();
                cmp.set('v.setupDetail', setupDetail);

                // Check if the user is already connected and we just need to poll
                if(setupDetail.isConnected) {

                	// If we are already connected, it's possible there is a session Id problem and the page has reloaded
					helper.doStartStatusCheck(cmp, event, helper);
                }

            }
            else if (state === "ERROR") {
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

    doOpenConnectionWindow : function(cmp, event, helper) {

    	// Reset the return code
    	cmp.set('v.authResponse.description', '');
    	cmp.set('v.authResponse.code', '');

        var authWindowHandle = window.open(cmp.get('v.setupDetail.oauthURL'), '_blank');
    },

    doCheckStatus : function(cmp, event, helper) {

        var action = cmp.get("c.getInstallStatus");
        action.setParams({
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var installStatus = actionResult.getReturnValue();
				var pollCount = cmp.get('v.pollCount');
                if(pollCount == 0 && installStatus.description == 'Completed') {
					cmp.set('v.installStage', 'Checking status...');
                } else {
					cmp.set('v.installStage', 'Finishing setup...');
                }


				if(installStatus.description == 'Completed' && pollCount != 0) {

					// Show completion button
			        var connectId = cmp.find("b12-connect-id");
        			$A.util.addClass(connectId, 'slds-hide');

			        var loaderId = cmp.find("b12-loader-id");
        			$A.util.addClass(loaderId, 'slds-hide');

			        var successId = cmp.find("b12-success-id");
        			$A.util.removeClass(successId, 'slds-hide');

					// Enable finish button
					cmp.set('v.finishDisabled', false);

                    // Auto close the window
                    window.setTimeout(
                        $A.getCallback(function() {
                            helper.doFinish(cmp, event, helper);
                        }), 5000
                    );

				} else {

					pollCount++;
					cmp.set('v.pollCount', pollCount);

					// Start polling
					var restartTimerId = window.setTimeout(
					    $A.getCallback(function() {
					        helper.doCheckStatus(cmp, event, helper);
					    }), 3000
					);
				}

            }
            else if (state === "ERROR") {
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
    doStartStatusCheck : function(cmp, event, helper) {

    	cmp.set('v.installStage', 'Checking status...');

        // Show job is running
        var successId = cmp.find("b12-success-id");
        $A.util.addClass(successId, 'slds-hide');

        var connectId = cmp.find("b12-connect-id");
        $A.util.addClass(connectId, 'slds-hide');

        var loaderId = cmp.find("b12-loader-id");
        $A.util.removeClass(loaderId, 'slds-hide');

        helper.doCheckStatus(cmp, event, helper);
    },
    doFinish : function(cmp, event, helper) {

        if(cmp.get('v.cmpid') == '2') {
            window.location.href = cmp.get('v.setupDetail.cancelledURL');
        } else {
            window.location.href = cmp.get('v.setupDetail.finishedURL');
        }
    },
})