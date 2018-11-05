({
	clickAction : function(component, event, helper) {
        var menuItem = event.detail.menuItem;
    	if(menuItem.get("v.label") == "Edit"){
            helper.openEditModal(component);
        }
        else if(menuItem.get("v.label") == "Delete"){
            helper.deletePartner(component);
        }
        // close menu
        var menu = component.find("pr-act-menu");
        menu.set("v.visible" , false);
	}
})