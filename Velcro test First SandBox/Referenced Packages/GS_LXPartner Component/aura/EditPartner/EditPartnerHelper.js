({
	closeModal : function(component) {
		var destroyPartnerModalEvent = component.getEvent("closeEditPartnerModal");    
        destroyPartnerModalEvent.fire();        
	},

	getRoleInfo : function(component) {
		// Create the action
	    var action = component.get("c.getPartnerRoleInfo");
	    action.setParams({
	    	"partnerId" : component.get("v.recordId")
	    });
	    // Callback
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") { 
	            var returnValue = JSON.parse(response.getReturnValue());
	            var roleWrapperList = [];
	            if(returnValue) {
	            	for(var i=0; i<returnValue.roleList.length; i++) {
	            		var roleValue = {};
						roleValue.value = returnValue.roleList[i].ApiName;
						roleValue.label = returnValue.roleList[i].ApiName;
						if(roleValue.label == returnValue.roleName) {
							roleValue.selected = "true";
							component.set("v.roleName", roleValue.value);
						}
						roleWrapperList.push(roleValue);
	            	}
				}
				component.set("v.roles", roleWrapperList); 
				component.set("v.partnerName", returnValue.partnerName);
				component.find("RoleSelectList").set("v.options", roleWrapperList);
	        }
	        else {
	            console.log("Failed with state: " + state);
	        }
	    });
	    
	    // Send action off to be executed
	    $A.enqueueAction(action); 
	},

	editPartner : function(component, helper) {
		var selectedRole = component.find("RoleSelectList").get("v.value");
		if(selectedRole == component.get("v.roleName")){
            component.set("v.errorMsg", "Please change the Role to proceed with Save.");
            return;
        }else{
            component.set("v.errorMsg","");
        }

        var action = component.get("c.editPartnerRole");
	    action.setParams({
	    	"sObjectName" : component.get("v.sObjectName"),
	    	"partnerId" : component.get("v.recordId"),
	  		"selectedRoleName" : selectedRole
	    });
	    // Callback
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") { 
	            helper.closeModal(component);
	            var partnerEditedEvt = component.getEvent("partnerEdited");    
        		partnerEditedEvt.fire();
				
	        }
	        else {
	            component.set("v.errorMsg", "No Edit Access Permission.");
	        }
	    });
	    
	    // Send action off to be executed
	    $A.enqueueAction(action); 
	}
})