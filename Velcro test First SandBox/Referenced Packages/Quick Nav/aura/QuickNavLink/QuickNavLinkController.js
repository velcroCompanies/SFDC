({
    navigate : function(cmp, event, helper){
        var actions = cmp.find("QuickNavActions"); //Child component with nav logic
        
        switch(cmp.get("v.Target")) {
            case "navigateToUrl":
                actions.navigateToUrl(cmp.get("v.Url"));
                break;
            case "navigateToObjectHome":
                actions.navigateToObjectHome(cmp.get("v.ObjectName"));
                break;
            case "navigateToList":
                actions.navigateToList(cmp.get("v.ViewName"));
                break;
            case "navigateToLightningPage":
                debugger;
                actions.navigateToLightningPage(cmp.get("v.ComponentName"));
                break;
            default:
                alert("Unexpected Navigation type");
        }
    }  
})