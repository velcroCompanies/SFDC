({
	doInit: function(component, event, helper) {
        helper.getPartnerFields(component);
    },
    clickColumnSort: function(component, event, helper) {
        var columnClicked = event.srcElement.ownerDocument.activeElement;
        var currentSort = columnClicked.getAttribute("data-sort-dir");
        var sortDirection;
        if(currentSort == "" || currentSort == "DESC"){
            sortDirection = "ASC"; // if column not sorted, sort by ASC
        } else {
            sortDirection = "DESC";
        }
        
        helper.getPartners(component,columnClicked.getAttribute("data-field-name"), 
				sortDirection,columnClicked.getAttribute("data-index"));

	},
    handlePartnerAddition: function(component, event, helper) {
       helper.closeCreatePartnerModal(component);
       helper.getPartners(component,"AccountTo.Name","ASC", null);
       helper.showToast("Partner Created.", "success"); 
	},
    handlePartnerDeletion: function(component, event, helper) {
       helper.getPartners(component,"AccountTo.Name","ASC", null);
       helper.showToast("Partner Deleted.", "success"); 
	},
    openCreatePartnerModal : function(component, event, helper) {
       helper.showSpinner(component);
       $A.createComponent("GS_LXPartner:CreatePartner",
         {
             rows : component.get("v.noOfModalCreateRows"),
             sObjectName: component.get("v.sObjectName"),
             recordId: component.get("v.recordId"),
             accountExtraField: component.get('v.accountExtraField'),
             oppExtraField: component.get('v.oppExtraField'),
             labelsObj: component.get('v.labelsObj')

         },
         function(newCmp){
            if (component.isValid()) {
               component.set("v.body", newCmp);
               helper.hideSpinner(component);  
            }
         }
      );
   },
   closeCreatePartnerModal : function(component, event, helper) {
		helper.closeCreatePartnerModal(component);
   },
   handlePartnerEdit : function(component, event, helper) {
        helper.handlePartnerEdit(component, event, helper);
    },
  closeEditPartnerModal : function(component, event, helper) {
      helper.closeEditPartnerModal(component);
  },
  handlePartnerEdited: function(component, event, helper) {
      helper.closeEditPartnerModal(component);
     helper.getPartners(component,"AccountTo.Name","ASC", null);
     helper.showToast("Partner Edited.", "success"); 
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