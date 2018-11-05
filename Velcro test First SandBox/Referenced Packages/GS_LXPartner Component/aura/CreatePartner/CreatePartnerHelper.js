({
    closeModal : function(component) {
		var destroyPartnerModalEvent = component.getEvent("closeCreatePartnerModal");    
        destroyPartnerModalEvent.fire();        
	},
    getPartnerRoles : function(component) {
        // Create the action
        var action = component.get("c.getPartnerRoles");
        // Callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") { 
                var noPrimaryCheck = document.getElementById("radio-pr-none");
                if(noPrimaryCheck){
                    noPrimaryCheck.checked = true;
                }
                
                component.set("v.roles", response.getReturnValue()); 
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action); 
    },
    savePartners : function(component, event, partners) {
        
        if(partners.length <=0){
            component.set("v.errorMsg", "Please select an Account to proceed with Save");
            return;
        }else{
            component.set("v.errorMsg","");
        }
        
        //this.showSpinner(component);
        // Create the action
        var action = component.get("c.addPartners");
        action.setParams({"sObjectAPIName": component.get("v.sObjectName"),
                          "recordId": component.get("v.recordId"),
                          "partnerAccounts": JSON.stringify(partners)
                         });
        // Callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                // fire savePartnerEvent
                component.getEvent("partnerAddedEvent").fire();
                //this.hideSpinner(component);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                if(errors[0] && errors[0].message) {
					component.set("v.errorMsg",errors[0].message);
                }else{
                	component.set("v.errorMsg","Unkown Error");  
                } 
  
            } else {
                component.set("v.errorMsg", "Failed with state: "+state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action); 
    },
    showSpinner : function(component) {
	   var spinner = component.find("crt-pr-modal-spinner");
       $A.util.removeClass(spinner, "slds-hide"); 
	},
    hideSpinner : function(component) {
	   var spinner = component.find("crt-pr-modal-spinner");
       $A.util.addClass(spinner, "slds-hide");	
	}
})