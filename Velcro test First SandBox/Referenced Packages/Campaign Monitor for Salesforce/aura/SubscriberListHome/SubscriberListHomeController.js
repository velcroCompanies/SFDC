({
    doInit: function(cmp, event, helper) {

        if (cmp.get('v.memberId')) {
            helper.loadComponentMember(cmp, event, helper, 'SubscriberMemberDetail');
        } else if (cmp.get('v.ruleId') || cmp.get('v.action') === 'NEW_RULE') {
            cmp.set("v.activeComponent", 'SubscriberListRules');

            // Need to get the subscriber list Id before getting the rule
            helper.setSubscriberListId(cmp, event, helper);
        } else {
            helper.loadComponent(cmp, event, helper, 'SubscriberList');
        }

    },
    onMenuSelection: function(cmp, event, helper) {

        var componentName = event.getParam('name');

        // Dynamically load the lightning component based on the menu selection
        if (cmp.get("v.activeComponent") !== componentName) {
            cmp.set("v.activeComponent", componentName);

            cmp.set('v.upgradeMessageTitle', '');
            cmp.set('v.upgradeMessageBody', '');
            if (!cmp.get('v.licenceDetail.premiumEnabled')) {
                cmp.set("v.listcomponent", []); // Clear out previous components

                var upgradeMessageTitle = '';
                var upgradeMessageBody = '';

                if (componentName === 'SubscriberMemberActivity') {
                    upgradeMessageTitle = 'Tracking History is a premium feature';
                    upgradeMessageBody = 'See what emails people are opening, links they clicked, email previews and more.';
                }
                if (componentName === 'SubscriberMemberPreferences') {
                    upgradeMessageTitle = 'Custom Fields is a premium feature';
                    upgradeMessageBody = 'Use custom fields to personalise emails, build segments and drive journeys.';
                }
                if (componentName === 'SubscriberListImport') {
                    upgradeMessageTitle = 'Import Wizard is a premium feature';
                    upgradeMessageBody = 'Import Salesforce records into Campaign Monitor via a report or list view. Map fields and run instantly or schedule the import to run periodically.';
                }

                if (upgradeMessageTitle) {
                    cmp.set('v.upgradeMessageTitle', upgradeMessageTitle);
                    cmp.set('v.upgradeMessageBody', upgradeMessageBody);

                    $A.util.removeClass(cmp.find('b12-feature-id'), "slds-hide");
                    cmp.set("v.listcomponent", []); // Clear out previous components
                    return;
                }
                $A.util.addClass(cmp.find('b12-feature-id'), "slds-hide");
            }


            if (cmp.get('v.memberId')) {
                helper.loadComponentMember(cmp, event, helper, componentName);
            } else {
                helper.loadComponent(cmp, event, helper, componentName);
            }

        }
    },
    doHomeEventHandler: function(cmp, event, helper) {

        // Dynamically load the lightning component based on the menu selection
        if (event.getParam('action') === 'MEMBER_ACTION') {
            cmp.set('v.menuType', 'MEMBER_MENU');

            var memberId = event.getParam('id');
            cmp.set("v.memberId", memberId);
            cmp.set('v.backLocation', 'SUBSCRIBER_LIST_DETAIL');

            helper.loadComponentMember(cmp, event, helper, 'SubscriberMemberDetail');
        }
        if (event.getParam('action') === 'SUBSCRIBER_LIST_DETAIL') {
            cmp.set('v.menuType', 'MAIN_MENU');

            var listId = event.getParam('id');
            cmp.set("v.listId", listId);
            cmp.set('v.memberId', null);

            helper.loadComponent(cmp, event, helper, 'SubscriberListMembers');
        }
    },
    onUpgrade: function(cmp, event, helper) {

        var eventToURL = $A.get("e.force:navigateToURL");
        if (eventToURL) {
            eventToURL.setParams({
                "url": "/apex/generalsettings?cmpid=4"
            });
            eventToURL.fire();
        } else {
            window.location.href = '/apex/generalsettings?cmpid=4';
        }

    },
})