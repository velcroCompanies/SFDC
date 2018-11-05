({
	closeModal: function(component, event, helper) {
       helper.closeModal(component);
    },

    doInit: function(component, event, helper) {
        helper.getRoleInfo(component);
    },

    editPartner : function(component, event, helper) {
    	helper.editPartner(component, helper);
    }
})