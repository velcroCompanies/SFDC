({
	 doInit: function(component, event, helper) {
         //var pl= component.get("pl");
        // component.set("pl", GS_LXPartner:partnerLabel);
         console.log('here');
 
    },
    clickNew : function(component, event, helper) {
 	     //show modal 		
         var createPartnerModalEvent = component.getEvent("openCreatePartnerModal");    
         createPartnerModalEvent.fire(); 
    },

	/* function navigateToRecord handles onclick on anchor tag for HOME to  
	*	Account / opportunity
	*/
	navigateToObjectHome: function(component, event, helper) {
		//sOBJECT
		let navigateTo = event.target.dataset.navigateto;

		var homeEvent = $A.get("e.force:navigateToObjectHome");
			homeEvent.setParams({
			"scope": navigateTo
		});
		homeEvent.fire();
	},

	/* function navigateToRecord handles onclick on anchor tag for Record 
	*
	*/
	navigateToRecord: function(component, event, helper) {
		let navigateToRecordId = event.target.dataset.navigatetorecordid;
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
		    "recordId": navigateToRecordId
		});
		navEvt.fire();
	},


})