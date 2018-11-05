({
	// Load partners from PartnerService(Apex)
    doInit: function(component, event, helper) {
        helper.getLabels(component, event, helper);
        helper.getPartners(component, event, helper);
    },
    navigateToPartnerListComponent : function(component, event, helper) {        
        var sObjectName = component.get("v.sObjectName");
        var partners = component.get("v.partners");
        if(partners.length > 0){
          	if(sObjectName == "Account") {
                helper.navigateToPartnerList(component, partners[0].AccountFrom.Name);
        	}else if(sObjectName == "Opportunity") {
            	helper.navigateToPartnerList(component, partners[0].Opportunity.Name);
        	}
        } else {
            if(sObjectName == "Account") {
                helper.getAccount(component);
        	}else if(sObjectName == "Opportunity") {
            	helper.getOpportunity(component);
        	}
        }
    },
    clickNew : function(component, event, helper) {
		// close menu
        var menu = component.find("create-new-menu");
        if(menu!=null){
           menu.set("v.visible" , false);   
        }
        
        //show modal
		helper.openCreatePartnerModal(component);		
    },
    handlePartnerAddition: function(component, event, helper) {
       helper.closeCreatePartnerModal(component);
       helper.getPartners(component);
       helper.showToast("Partner Created.", "success"); 
	},
    handlePartnerDeletion: function(component, event, helper) {
       helper.getPartners(component);
       helper.showToast("Partner Deleted.", "success"); 
	},
    handlePartnerEdited: function(component, event, helper) {
        helper.closeEditPartnerModal(component);
       helper.getPartners(component);
       helper.showToast("Partner Edited.", "success"); 
    },
    refreshView : function(component, event, helper) {
        var partners = event.getParam("partners");
        if(partners){
        	component.set("v.partners", partners);
        	component.set("v.partnerSubset", partners.slice(0,component.get("v.noOfCardElements")));
        }
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