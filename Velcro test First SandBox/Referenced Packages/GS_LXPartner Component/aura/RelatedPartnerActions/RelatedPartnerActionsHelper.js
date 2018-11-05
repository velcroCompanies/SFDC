({
	deletePartner : function(component) {
        var context = this;
        // Create the action
        var action = component.get("c.deletePartner");
        action.setParams({
            "recordId": component.get("v.partnerRecId")
        });
        // Callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
				component.getEvent("partnerDeletedEvent").fire();
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                if(errors[0] && errors[0].message) {
                    context.showToast(errors[0].message, "error");
                }else{
                    context.showToast("Unkown Error", "error"); 
                } 
  
            } else {
                context.showToast("Failed with state: "+state, "error");
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action); 
   }, 
   openEditModal : function(component) {
        var openEditModal = component.getEvent("partnerEditEvent");
        openEditModal.setParams({
            partnerRecordId: component.get("v.partnerRecId"),
            sObjectName: component.get("v.sObjName")
        }).fire();
   },
   showToast : function(msg, type) {
       var toastEvent = $A.get("e.force:showToast");
       toastEvent.setParams({
        "message": msg,
        "type": type
       });
       toastEvent.fire();
    } 
})