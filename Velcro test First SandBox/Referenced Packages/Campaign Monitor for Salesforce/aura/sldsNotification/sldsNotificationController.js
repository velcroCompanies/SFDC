({
    showNotification : function(component, event, helper) {

        if(event.getParam("msgType") === 'NX_CHECK_RUNNING_JOBS') {
            // Don't need to handle this message type
            // console.log('NX_CHECK_RUNNING_JOBS');
        } else {
            // console.log('NX_MSG');
        	// Get notification msg
        	component.set("v.message", event.getParam("msg"));

            if(event.getParam("msgSeverity")) {
                component.set("v.severity", event.getParam("msgSeverity"));
            }

        	// TODO: https://www.lightningdesignsystem.com/components/utilities/visibility/#flavor-transition-hide-show
        	$A.util.removeClass(component, "slds-transition-hide");
        	$A.util.addClass(component, "slds-transition-show");
        	// $A.util.removeClass(component, "slds-hide");

            window.setTimeout($A.getCallback(function() {
                if(component.isValid()) {
                    $A.util.addClass(component, "slds-transition-hide");
                    $A.util.removeClass(component, "slds-transition-show");
                }
            }), component.get("v.fadeTimeout"));

        }
    },


})