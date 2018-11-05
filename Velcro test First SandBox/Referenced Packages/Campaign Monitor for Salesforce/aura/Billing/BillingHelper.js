({

    licenceDetails: function(cmp) {

        var action = cmp.get("c.getLicenceDetails");

        //Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {

            $A.util.toggleClass(cmp.find('spinner-id'), "slds-hide");

            var licence = actionResult.getReturnValue();
            cmp.set("v.licence", licence);

            if (licence.sfdcError) {
                cmp.set('v.promptHeader', 'Licence Error');
                cmp.set('v.promptBody', 'Your licence details are currently unavailable. ' + licence.sfdcError[0].message);
                cmp.find('b12-prompt-subscription').open();
            } else if (!licence.orgId) {
                cmp.set('v.promptHeader', 'Licence Error');
                cmp.set('v.promptBody', 'Your licence details are currently unavailable. Try again in a few minutes or contact support@beaufort12.com');
                cmp.find('b12-prompt-subscription').open();

            } else {
                var resultsMessage = '';
                if (licence.invoices && licence.invoices.length > 0) {
                    resultsMessage = licence.invoices.length + (licence.invoices.length === 1 ? ' Invoice' : ' Invoices');
                    $A.util.toggleClass(cmp.find('invoice-id'), "slds-hide");
                } else {
                    $A.util.toggleClass(cmp.find('no-invoice-id'), "slds-hide");
                }

                // If the licence is not active, show the buy button
                if (licence.isPaidLicence !== true) {

                    $A.util.addClass(cmp.find('no-invoice-id'), "slds-hide");
                    $A.util.addClass(cmp.find('invoice-id'), "slds-hide");
                    $A.util.toggleClass(cmp.find('buy-now-id'), "slds-hide");

                    cmp.set('v.isFree', true);
                } else {
                    cmp.set('v.isFree', false);
                }

                cmp.set('v.resultsMessage', resultsMessage);
            }

            this.turnOffSpinner(cmp);

        });
        // action.setExclusive();
        $A.enqueueAction(action);
    },

    doResendInvoice: function(cmp, helper, messageId, email) {

        var action = cmp.get("c.resendInvoice");
        action.setParams({ messageId: messageId, email: email });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var resendResult = actionResult.getReturnValue();
                if (resendResult && resendResult.status === 'Accepted') {
                    helper.successNotification(cmp, event, helper, 'Invoice resent to ' + resendResult.contactEmail);
                } else if (resendResult && resendResult.status === 'OK') {
                    helper.successNotification(cmp, event, helper, 'Invoice resent to ' + resendResult.contactEmail + '.  It can take up to 30min receive.');
                } else {
                    helper.successNotification(cmp, event, helper, resendResult.status);
                }
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },
    doUpdateBillingContact: function(cmp, event, helper) {

        var action = cmp.get("c.updateBillingDetails");
        action.setParams({ invoiceJson: JSON.stringify(cmp.get("v.licence")) });

        //Set up the callback
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === "SUCCESS") {
                helper.successNotification(cmp, event, helper, 'Successfully updated billing contact details');
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },

    doOpenUpdateCardModal: function(cmp, event, helper) {

        // Initialise the stripe checkout service
        var handler = StripeCheckout.configure({
            key: cmp.get("v.licence.licenceSummary.stripeKey"),
            image: $A.get('$Resource.SendItAssets') + '/img/logo.png',
            locale: 'auto',
            token: function(token) {

                // Send update card event (avoid callback hell)
                var compUpdateEvent = cmp.getEvent("updateCardEvent");
                compUpdateEvent.setParams({
                    "id": token.id
                });
                compUpdateEvent.fire();
            },
        });

        // Open the Stripe checkout modal
        handler.open({
            name: 'Beaufort 12 Ltd',
            description: 'Campaign Monitor for Salesforce',
            currency: 'usd',
            billingAddress: false,
            panelLabel: 'Update Card Details',
            allowRememberMe: false
        });
        event.preventDefault();

    },

    doOpenPurchaseModal: function(cmp, event, helper) {

        // Initialise the stripe checkout service
        var handler = StripeCheckout.configure({
            key: cmp.get("v.licence.licenceSummary.stripeKey"),
            image: $A.get('$Resource.SendItAssets') + '/img/logo.png',
            locale: 'auto',
            token: function(token) {

                // Send event (can't call createsubscription directly)
                var compEvent = cmp.getEvent("subscriptionEvent");
                compEvent.setParams({
                    "id": token.id,
                    "email": token.email,
                    "country": token.card.country,
                    "name": token.card.name
                });
                compEvent.fire();
            },
        });

        var cost = cmp.get('v.licence.licenceSummary.licenceCost');

        // Open the Stripe checkout modal
        handler.open({
            name: 'Beaufort 12 Ltd',
            description: 'Campaign Monitor for Salesforce',
            currency: 'usd',
            amount: (cost * 100),
            billingAddress: true,
            panelLabel: 'Subscribe {{amount}}/mo',
            allowRememberMe: false
        });
        event.preventDefault();

    },

    doCreateSubscription: function(cmp, event, helper, tokenid, tokenemail, country, name) {

        var action = cmp.get("c.processPayment");
        action.setParams({
            "stripeToken": tokenid,
            "stripeEmail": tokenemail,
            "country": country,
            "name": name,
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var createResponse = actionResult.getReturnValue();

                // If unsuccessful display a prompt with the problem
                if (createResponse.code !== 'ACTIVE') {

                    helper.turnOffSpinner(cmp);
                    cmp.set('v.promptHeader', 'Payment Failed');
                    cmp.set('v.promptBody', createResponse.message);
                    cmp.find('b12-prompt-subscription').open();

                    cmp.set('v.isFree', true);
                } else {

                    helper.navigateToPage(helper, '/apex/generalsettings?cmpid=4');

                }

            } else if (state === "ERROR") {
                helper.turnOffSpinner(cmp);
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },

    doUpdateCard: function(cmp, event, helper, tokenid) {

        var action = cmp.get("c.updateCard");
        action.setParams({
            "stripeToken": tokenid
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                // TODO: Confirmation message
                var createResponse = actionResult.getReturnValue();

                // If card update is unsuccessful, display a prompt with the problem
                if (createResponse.code !== 'ACTIVE') {

                    cmp.set('v.promptHeader', 'Payment Failed');
                    cmp.set('v.promptBody', createResponse.message);
                    cmp.find('b12-prompt-subscription').open();

                } else {
                    // send notification that it was successful
                    helper.successNotification(cmp, event, helper, 'Successfully updated card details');
                }

            } else if (state === "ERROR") {
                helper.turnOffSpinner(cmp);
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    turnOffSpinner: function(cmp) {

        $A.util.addClass(cmp.find('body-spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-spinner-id'), "slds-show");

        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-show");

    },
    turnOnSpinner: function(cmp) {

        $A.util.addClass(cmp.find('body-spinner-id'), "slds-show");
        $A.util.removeClass(cmp.find('body-spinner-id'), "slds-hide");

        $A.util.addClass(cmp.find('body-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-show");
    },
    successNotification: function(cmp, event, helper, msg) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg
        }).fire();

    },
    // Navigation functions (TODO: revisit in Spring 16)
    navigateToPage: function(helper, path) {
        if ((!helper.isLightning()) && helper.hasSforceOne()) {
            sforce.one.navigateToURL(path); // eslint-disable-line
        } else {
            window.location.href = path;
        }
    },
    hasSforceOne: function() {
        var sf;
        try {
            sf = (sforce && sforce.one); // eslint-disable-line
        } catch (exc) {
            sf = false;
        }
        return sf;
    },
    isLightning: function() {
        return $A.get("e.force:showToast");
    },
    isMobile: function() {
        var userAgent = window.navigator.userAgent.toLowerCase();
        return (-1 !== userAgent.indexOf('mobile'));
    }
})