({
	getPartners : function(component, sortBy, sortDirection, index) {         
		//show spinner
        this.showSpinner(component);
        var context = this;
        var partnerUtil = component.find("utilMethods");
        partnerUtil.getPartnerRecords(
        component.get("v.sObjectName"),
        component.get("v.recordId"),
        sortBy, 
        sortDirection,    
        function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                    var partners = response.getReturnValue();
                	console.log("partners");
                	console.log(partners);

                    component.set("v.partners", partners);
                    //reset header icon
                    if(index){
                    	context.resetHeader(component, index, sortDirection);
                    } else {
                        context.refreshPartnerCard(component, partners);
                    }    
                    context.hideSpinner(component);
            }
            else {
                console.log("Failed with state: " + state);
            } 
        });   
    },
	getPartnerFields : function(component) {   
       var partnerUtil = component.find("utilMethods");
       partnerUtil.getPartnerFields(
       component.get("v.sObjectName"), 
       function(response){
         var partners = response.getReturnValue();
         if(! component.get("v.showOppField") ) {
            var elementPos = partners.map(function(x) {return x.label; }).indexOf("Opportunity");
            if (elementPos >= 1 ) {
              partners.splice(elementPos, 1);
            }
          }        
         component.set("v.partnerFields", response.getReturnValue());    
       });   
    },
    resetHeader : function(component, index, sortDirection) {
        var partnerHeaders = component.get("v.partnerFields");
        for(var i=0;i<partnerHeaders.length;i++){
            if(i == index){
               partnerHeaders[i].sortDirection = sortDirection;
            }else{
               partnerHeaders[i].sortDirection = ""; 
            }
        }
        component.set("v.partnerFields", partnerHeaders); 
    },
    refreshPartnerCard : function(component, partners) { 
	   var refreshEvent = $A.get("e.GS_LXPartner:refreshPartnerCardEvent");
	   refreshEvent.setParams({
           "partners":partners  
       });
       refreshEvent.fire();
	},
    showSpinner : function(component) {
	   var spinner = component.find("list-spinner");
       $A.util.removeClass(spinner, "slds-hide"); 
	},
    hideSpinner : function(component) {
	   var spinner = component.find("list-spinner");
       $A.util.addClass(spinner, "slds-hide");	
	},
    closeCreatePartnerModal : function(component) {
		if (component.isValid()) {
            component.set("v.body", []);
        } 
   },
   closeEditPartnerModal : function(component) {
    if (component.isValid()) {
            component.set("v.body", []);
        } 
   },
   handlePartnerEdit : function(component, event, helper) {
     $A.createComponent("GS_LXPartner:EditPartner",
         {
            recordId: event.getParam("partnerRecordId"),
            sObjectName : event.getParam("sObjectName"),
            labelsObj: component.get("v.labelsObj")
         },
         function(newCmp){
            if (component.isValid()) {
               component.set("v.body", newCmp); 
            }
         }
      );
   },
   showToast : function(msg, type ) {
       var toastEvent = $A.get("e.force:showToast");
       toastEvent.setParams({
        "message": msg,
        "type": type
       });
       toastEvent.fire();
    }  
})