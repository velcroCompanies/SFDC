({
    doInit: function(cmp, event, helper) {

        document.title = "General Settings";
        if (cmp.get('v.cmpId') === '4') {
            cmp.set('v.selectedMainMenu', 'Billing')
            helper.loadComponent(cmp, event, helper, 'Billing');
        } else if (cmp.get('v.cmpId') === '5') {
            cmp.set('v.selectedMainMenu', 'SecuritySettings')
            helper.loadComponent(cmp, event, helper, 'SecuritySettings');
        } else {
            helper.loadComponent(cmp, event, helper, cmp.get('v.selectedMainMenu'));
        }


    },
    onMenuSelection: function(cmp, event, helper) {

        var componentName = event.getParam('name');

        // Dynamically load the lightning component based on the menu selection
        if (cmp.get("v.activeComponent") !== componentName) {

            helper.turnOnSpinner(cmp);

            cmp.set("v.activeComponent", componentName);

            cmp.set('v.upgradeMessageTitle', '');
            cmp.set('v.upgradeMessageBody', '');
            if (!cmp.get('v.licenceDetail.premiumEnabled')) {
                cmp.set("v.listcomponent", []); // Clear out previous components

                var upgradeMessageTitle = '';
                var upgradeMessageBody = '';

                if (componentName === 'CampaignSettings') {
                    upgradeMessageTitle = 'Campaign Settings is a premium feature';
                    upgradeMessageBody = 'Auto create Salesforce campaigns, map and create Salesforce Campaigns statuses.';
                }
                if (componentName === 'SecuritySettings') {
                    upgradeMessageTitle = 'Advanced Security is a premium feature';
                    upgradeMessageBody = 'Assign Salesforce users to Campaign Monitor users, Manage Salesforce permission sets. Create Campaign Monitor users.';
                }

                if (upgradeMessageTitle) {
                    cmp.set('v.upgradeMessageTitle', upgradeMessageTitle);
                    cmp.set('v.upgradeMessageBody', upgradeMessageBody);

                    $A.util.removeClass(cmp.find('b12-feature-id'), "slds-hide");
                    cmp.set("v.listcomponent", []); // Clear out previous components

                    helper.turnOffSpinner(cmp);
                    return;
                }
                $A.util.addClass(cmp.find('b12-feature-id'), "slds-hide");
            }

            helper.loadComponent(cmp, event, helper, componentName);

        }
    },
    onUpgrade: function(cmp, event, helper) {

        helper.loadComponent(cmp, event, helper, 'Billing');

    },
})