({	
	doInit: function(component, event, helper) { 

		let sObjName = component.get('v.sObjectName'),
		result = '',
		fieldName = '',
		selectedRecord = component.get('v.selectedRecord');


		if ( sObjName == 'Account' || sObjName =='account') {
			fieldName = component.get('v.accountExtraField');
		} else {
			fieldName = component.get('v.oppExtraField');
		}

		if (fieldName) {
			result = selectedRecord[fieldName];
		} else {
			result = '';
		}

		if (result != undefined) {
			component.set('v.resultant', result);	
		}
	},

	selectRecord : function(component, event, helper){      
         // get the selected record from list  
         var selectedRecord = component.get("v.selectedRecord");
         // call the event   
         var selectedRecordEvent = component.getEvent("selectedRecordEvent");  
         selectedRecordEvent.setParams({"selectedRecord" : selectedRecord });  
         // fire the event  
         selectedRecordEvent.fire();
    }
})