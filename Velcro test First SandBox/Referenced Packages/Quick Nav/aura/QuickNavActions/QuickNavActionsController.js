({
	navigateToUrl : function(cmp, event) {
        var url = event.getParam('arguments').url;
        if(!url) alert('ERROR: No URL provided!');

        var urlEvent = $A.get("e.force:navigateToURL");
    	urlEvent.setParams({ 
        	"url": url 
        });
    	urlEvent.fire();
	},
    
    navigateToObjectHome : function (cmp, event) {
        var ObjectName = event.getParam('arguments').ObjectName;
        if(!ObjectName) alert('navigateToObjectHome target chosen but no Object selected');
        
        var homeEvent = $A.get("e.force:navigateToObjectHome");
    	homeEvent.setParams({ 
            "scope": ObjectName 
        });
    	homeEvent.fire();
	},
    
    navigateToList : function (cmp, event) {
        var listViewParams = event.getParam('arguments').listViewParams;
        if(!listViewParams) alert('ERROR: navigateToList target chosen but no List View selected');
        
	   	var listParams = listViewParams.split(",");
        var navEvent = $A.get("e.force:navigateToList");
       	navEvent.setParams({
    	   	"listViewId": listParams[0],
           	"listViewName": listParams[1],
           	"scope": listParams[2]
        });
        navEvent.fire();
	},
    
    navigateToLightningPage : function(cmp, event) {
        debugger;
        var ComponentName = event.getParam('arguments').ComponentName;
        if(!ComponentName) alert('navigateToLightningPage target chosen but no Lightning Page selected');
        
    	var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            "componentDef": "one:flexipage",
            "componentAttributes": {
                     "flexiPageDeveloperName": ComponentName,
            }
        });
    	evt.fire();    
    }
    
})