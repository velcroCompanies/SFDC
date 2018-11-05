({

    doInit : function(component, event, helper) {
        
        Promise.all([helper.getUsername(), helper.getReportId()]).then(function(result) {
          console.log(result);
        }, function() {
          console.log('failed');
        });        
        
        /**
        helper.getUsername().then(function(result){
            console.log(result);
        })
        
        helper.getReportId().then(function(result){
            console.log(result);
        })   
        **/
        
        var badges = component.get("c.getUserBadgesByStatus");
    	var totalBadges = component.get("c.getUserBadgeCountByStatus");
        
        totalBadges.setParams({
            "userId": component.get("v.recordId"), 
            "status": "Completed"
        });
        totalBadges.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.totalBadgeCount", "Trailhead Badges Earned (" + response.getReturnValue() + ")");
                component.set("v.hasBadges", response.getReturnValue() > 0 ? true : false);
            }
        });
        badges.setParams({
            userId: component.get("v.recordId"),
            status: "Completed",
            maxBadges: 6
        });
        badges.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.badges", response.getReturnValue());
            }            
        });
        $A.enqueueAction(badges);
		$A.enqueueAction(totalBadges);          
    },
    
   // TODO - change this to a promise
    handleViewAllClick : function(component, event, helper) {
        var action = component.get("c.getProfileUrl");
        action.setParams({
            "userId": component.get("v.recordId")
        });        
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {    
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": response.getReturnValue()
                });
                urlEvent.fire();      
            }
        });  
        $A.enqueueAction(action);
    },
    
    // TODO - change this to a promise
    handleViewAllClickOLD : function(component, event, helper) {
        var action = component.get("c.getUserName");
        action.setParams({
            "userId": component.get("v.recordId")
        });        
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var userName = response.getReturnValue();
                var action2 = component.get("c.getViewAllReportId");      
                action2.setCallback(this, function(response){
                    if (component.isValid() && response.getState() === "SUCCESS") {
                        console.log('ready to redirect');
                        var urlEvent = $A.get("e.force:navigateToURL");
                        urlEvent.setParams({
                            "url": "https://trailhead.salesforce.com/users/profiles/00550000006GNcaAAG"
                        });
                        urlEvent.fire();
                    }
                });
                $A.enqueueAction(action2);
            }
        });  
        $A.enqueueAction(action);
    }  
})