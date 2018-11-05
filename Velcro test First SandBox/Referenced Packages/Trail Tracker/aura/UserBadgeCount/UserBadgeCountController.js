({
	doInit : function(component, event, helper) {
        
        // get the assigned count for the user
    	var assigned = component.get("c.getUserBadgeCountByStatus");
        assigned.setParams({"userId": component.get("v.recordId"), "status": "Assigned"});
        assigned.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.assignedBadges", response.getReturnValue());
            }
        });
        $A.enqueueAction(assigned);
        
        // get the in progress count for the user
    	var inprogress = component.get("c.getUserBadgeCountByStatus");
        inprogress.setParams({"userId": component.get("v.recordId"), "status": "In-Progress"});
        inprogress.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.inprogressBadges", response.getReturnValue());
            }
        });
        $A.enqueueAction(inprogress); 
        
        // get the completed count for the user
    	var completed = component.get("c.getUserBadgeCountByStatus");
        completed.setParams({"userId": component.get("v.recordId"), "status": "Completed"});
        completed.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.completedBadges", response.getReturnValue());
            }
        });
        $A.enqueueAction(completed);          

	}  
})