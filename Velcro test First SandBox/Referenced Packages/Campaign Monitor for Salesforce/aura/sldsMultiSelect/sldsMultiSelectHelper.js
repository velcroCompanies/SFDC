({
	setSelectedItem : function(component, event, helper){

		// The bits of the event we're interested in
		var selected = event.getParam('index');
		var list = event.getParam('eventId');

		// The event could have come from one of two lists
		// Need to store the values for different lists in different attributes
		// Determine those attributes up front
		var indexAttr = (list === 'available' ? 'v.availableIndex' : 'v.selectedIndex');
		var optionsAttr = (list === 'available' ? 'v.availableOptions' : 'v.selectedOptions');


		var oldSelected = component.get(indexAttr);
		var c = component.get(optionsAttr);

		if(oldSelected != null){
			c[oldSelected].selected = false;
		}
		c[selected].selected = true;

		component.set(indexAttr, selected);
		component.set(optionsAttr, c);

	},

	moveItemBetweenArrays : function(component, helper, srcAttr, dstAttr, index){

		var src = component.get(srcAttr);
		var dst = component.get(dstAttr);

		if(!src || !dst){
			return;
		}

		var itemsToMove = src.splice(index, 1);

		if(itemsToMove.length > 0){
			var item = itemsToMove[0];
			item.selected = false;
			dst.push(item);
		}

		component.set(srcAttr, src);
		component.set(dstAttr, dst);

	}
})