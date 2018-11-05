({
	navigateToUrl : function(component, event, helper) {
        if(!component.get("v.Url")) alert('navigateToURL target chosen but no URL provied');
        
        var urlEvent = $A.get("e.force:navigateToURL");
    	urlEvent.setParams({ 
            "url": component.get("v.Url") 
        });
    	urlEvent.fire();
	},
    
    navigateToObjectHome : function (component, event, helper) {
        if(!component.get("v.ObjectName")) alert('navigateToObjectHome target chosen but no Object selected');
        
        var homeEvent = $A.get("e.force:navigateToObjectHome");
    	homeEvent.setParams({ 
            "scope": component.get("v.ObjectName") 
        });
    	homeEvent.fire();
	},
    
    navigateToList : function (component, event, helper) {
        if(!component.get("v.ViewName")) alert('navigateToList target chosen but no List View selected');
        
	   	let listParams = component.get("v.ViewName").split(",");
        var navEvent = $A.get("e.force:navigateToList");
       	navEvent.setParams({
    	   	"listViewId": listParams[0],
           	"listViewName": listParams[1],
           	"scope": listParams[2]
        });
        navEvent.fire();
	},
    
    navigateToLightningPage : function(component, event, helper) {
        if(!component.get("v.ComponentName")) alert('navigateToLightningPage target chosen but no Lightning Page selected');
        
    	var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            "componentDef": "one:flexipage",
            "componentAttributes": {
                     "flexiPageDeveloperName": component.get("v.ComponentName"),
            }
        });
    evt.fire();    
    }
    
})