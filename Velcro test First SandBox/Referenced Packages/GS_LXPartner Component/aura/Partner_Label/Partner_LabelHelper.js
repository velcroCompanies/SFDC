({
	doInit : function(component) {
        var action = component.get("c.getLabel");
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(component.isValid && state=="SUCCESS") {
                component.set("v.partnerL", response.getReturnValue());
            } else console.log("error receiving Partner Label " + state);
        });
		$A.enqueueAction(action);
	}
})