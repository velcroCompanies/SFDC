({

	click : function(component, event, helper){

		var compEvents = component.getEvent('itemSelected');
		compEvents.setParams({index : component.get('v.index'), eventId : component.get('v.eventId') });
		compEvents.fire();

	}
})