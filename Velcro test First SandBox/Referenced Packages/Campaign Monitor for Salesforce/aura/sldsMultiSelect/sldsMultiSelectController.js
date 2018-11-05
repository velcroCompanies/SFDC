({

	doInit : function(component, event, helper){

		var selectedItems = component.get('v.selectedOptions');
		if(!selectedItems){
			component.set('v.selectedOptions',selectedItems);
		}

	},

	handleitemSelected : function(component, event, helper){

		helper.setSelectedItem(component, event, helper);

	},

	moveAvailableToSelected : function(component, event, helper){

		helper.moveItemBetweenArrays(component, helper, 'v.availableOptions', 'v.selectedOptions', component.get('v.availableIndex'));
		component.set('v.availableIndex', undefined);

	},

	moveSelectedToAvailable : function(component, event, helper){

		helper.moveItemBetweenArrays(component, helper, 'v.selectedOptions', 'v.availableOptions', component.get('v.selectedIndex'));
		component.set('v.selectedIndex', undefined);

	}

})