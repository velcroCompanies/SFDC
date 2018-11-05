({
	doInit : function(cmp, event, helper) {

        helper.licenceDetails(cmp);

    },
    subscriptionEventHandler : function(cmp, event, helper) {

        var tokenid = event.getParam("id");
        var tokenemail = event.getParam("email");
        var country = event.getParam("country");
        var name = event.getParam("name");

        helper.turnOnSpinner(cmp);
        helper.doCreateSubscription(cmp, event, helper, tokenid, tokenemail, country, name);
    },
    updateCardEventHandler : function(cmp, event, helper) {

        var tokenid = event.getParam("id");

        helper.turnOnSpinner(cmp);
        helper.doUpdateCard(cmp, event, helper, tokenid);
    },
    saveContact : function(cmp, event, helper) {

        helper.doUpdateBillingContact(cmp, event, helper); // Save billing contact details
        cmp.find('b12-billing-contact-modal').close();
    },
    openPurchaseModal : function(cmp, event, helper) {

        helper.doOpenPurchaseModal(cmp, event, helper);

    },
    openCardUpdateModal : function(cmp, event, helper) {

        helper.doOpenUpdateCardModal(cmp, event, helper);

    },
    openBillingContactModal : function(cmp, event, helper) {
        cmp.find('b12-billing-contact-modal').open();
    },
    openPaymentModal : function(cmp, event, helper) {
        cmp.find('b12-billing-payment-modal').open();
    },
    openResendInvoiceModal: function(cmp, event, helper) {

    	var data = event.target.value;
    	var messageId = data.split(':')[0];
    	var emailRecipient = data.split(':')[1];

    	cmp.set('v.selectedEmailRecipient', emailRecipient);
    	cmp.set('v.messageId', messageId);

        // Reset and select the first email address
        var currentRecipentEmail = cmp.find("resend-email-id");
        for (var i = 0; i < currentRecipentEmail.length ; i++) {
            var vCurrentRecipentEmail = currentRecipentEmail[i].get("v.checked");
            vCurrentRecipentEmail = false;
        }
        var vCurrentRecipentEmailFirst = currentRecipentEmail[0].get("v.checked");
        vCurrentRecipentEmailFirst = true;

    	var currentContact = cmp.get("v.licence.billingContactEmail");

    	var previousRecipientEmail = cmp.find("b12-previous-recipient-email");
    	if(emailRecipient.toLowerCase() === currentContact.toLowerCase()) {
    		$A.util.addClass(previousRecipientEmail, 'slds-hide');
    	} else {
			$A.util.removeClass(previousRecipientEmail, 'slds-hide');
    	}
        cmp.find('b12-billing-resend-modal').open();
    },

    onResendInvoice: function(cmp, event, helper) {

        var messageId = cmp.get("v.messageId");
        var currentRecipentEmail = cmp.find("resend-email-id");

        // Get the selected email
        for (var i = 0; i < currentRecipentEmail.length ; i++) {
            if(currentRecipentEmail[i].get("v.checked")) {
                email = currentRecipentEmail[i].get("v.value");
            }
        }

        helper.doResendInvoice(cmp, helper, messageId, email); // Resend the invoice

        cmp.find('b12-billing-resend-modal').close();
    },

})