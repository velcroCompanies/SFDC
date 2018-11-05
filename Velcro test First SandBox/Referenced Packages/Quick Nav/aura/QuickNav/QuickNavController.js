({
	
    navigate : function(cmp, event, helper){
        switch(cmp.get("v.Target")) {
            case "navigateToUrl":
                helper.navigateToUrl(cmp, event, helper);
                break;
            case "navigateToObjectHome":
                helper.navigateToObjectHome(cmp, event, helper);
                break;
            case "navigateToList":
                helper.navigateToList(cmp, event, helper);
                break;
            case "navigateToLightningPage":
                helper.navigateToLightningPage(cmp, event, helper);
                break;
            default:
                alert("Unexpected Navigation type");
        }
    }  
})