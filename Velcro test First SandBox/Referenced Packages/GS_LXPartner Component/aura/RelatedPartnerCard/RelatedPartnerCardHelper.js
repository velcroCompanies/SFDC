({
	getPartners : function(component) {
       var partnerUtil = component.find("utilMethods");
       partnerUtil.getPartnerRecords(
       component.get("v.sObjectName"),
       component.get("v.recordId"),
       "AccountTo.Name",
       "ASC",
       function(response){
         var partners = response.getReturnValue(); 
         if(partners){
            component.set("v.partners", partners);  
			component.set("v.partnerSubset", partners.slice(0,component.get("v.noOfCardElements")));     
         }
         
       });   
  },

  getLabels: function(component, event, helper) {
    let partnerUtil = component.find("utilMethods");
       partnerUtil.getPartnerLabels(
       function(response){
         let labelsObj = response.getReturnValue(); 
         if(labelsObj){
            component.set("v.labelsObj", labelsObj);
         }
         
       });   
  },

	navigateToPartnerList : function(component, recName) {
		var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "GS_LXPartner:RelatedPartnerList",
            componentAttributes: {
                partners : component.get("v.partners"),
                noOfModalCreateRows: component.get("v.noOfModalCreateRows"),
                sObjectName : component.get("v.sObjectName"),
                recordName: recName,
                recordId: component.get("v.recordId"),
                accountExtraField : component.get('v.accountExtraField'),
                oppExtraField : component.get("v.oppExtraField"),
                showOppField : component.get("v.showOppField"),
                labelsObj : component.get("v.labelsObj")

            }
        });
        evt.fire();
    },
    getAccount : function(component) {
        var context = this;
        // Create the action
        var action = component.get("c.getAccount");
        console.log("recordId" + component.get("v.recordId"));
        action.setParams({
            "recordId": component.get("v.recordId")
        });
        // Callback
        action.setCallback(this, function(response) {
            var acc = response.getReturnValue(); 
            context.navigateToPartnerList(component, acc.Name);
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
   },
    getOpportunity : function(component) {
        var context = this;
        // Create the action
        var action = component.get("c.getOpportunity");
        action.setParams({
            "recordId": component.get("v.recordId")
        });
        // Callback
        action.setCallback(this, function(response) {
            var opp = response.getReturnValue(); 
            context.navigateToPartnerList(component, opp.Name);
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
   },
    openCreatePartnerModal : function(component) {
       $A.createComponent("GS_LXPartner:CreatePartner",
         {
             rows : component.get("v.noOfModalCreateRows"),
             sObjectName: component.get("v.sObjectName"),
             recordId: component.get("v.recordId"),
             accountExtraField : component.get("v.accountExtraField"),
             oppExtraField : component.get("v.oppExtraField"),
             labelsObj : component.get("v.labelsObj")

         },
         function(newCmp){
            if (component.isValid()) {
               component.set("v.body", newCmp); 
            }
         }
      );
   }, 
  closeCreatePartnerModal : function(component) {
		if (component.isValid()) {
            component.set("v.body", []);
        } 
  },

  handlePartnerEdit : function(component, event, helper) {
     $A.createComponent("GS_LXPartner:EditPartner",
         {
            recordId: event.getParam("partnerRecordId"),
            sObjectName : event.getParam("sObjectName"),
            labelsObj : component.get("v.labelsObj")

         },
         function(newCmp){
            if (component.isValid()) {
               component.set("v.body", newCmp); 
            }
         }
      );
   },
   closeEditPartnerModal : function(component) {
    if (component.isValid()) {
            component.set("v.body", []);
        } 
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