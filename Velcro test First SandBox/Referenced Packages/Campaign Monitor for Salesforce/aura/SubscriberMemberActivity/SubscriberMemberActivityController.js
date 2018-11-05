({
    onInit: function(cmp, event, helper) {
        document.title = 'Email History';
        helper.doGetActivity(cmp, event, helper);
    },

    onCampaignMenu: function(cmp, event, helper) {
        var cmCampaignId = event.getParam("value");

        if (cmCampaignId) {
            cmp.set('v.campDetail.webVersionURL', '');
            $A.util.removeClass(cmp.find('tempate-spinner-id'), "slds-hide");
            $A.util.addClass(cmp.find('tempate-id'), "slds-hide");
            cmp.find('b12-preview-modal').open();
            helper.doGetCampaignDetails(cmp, event, helper, cmCampaignId);
        }
    },
    onDisplayListFilter: function(cmp, event, helper) {
        $A.util.removeClass(cmp.find('b12-listfilter-id'), "slds-hide");
    },
    onFilterList: function(cmp, event, helper) {

        var activitySummary = cmp.get('v.activitySummary');
        if (activitySummary.hasTooManyLists) {
            helper.turnOnSpinner(cmp);
            helper.doGetActivityForList(cmp, event, helper);
        } else {
            helper.doFilterList(cmp, event, helper);
        }

    },
    onCancelFilter: function(cmp, event, helper) {
        $A.util.addClass(cmp.find('b12-listfilter-id'), "slds-hide");
    },
    onExpand: function(cmp, event, helper) {

        if (cmp.get('v.activitySummary')) {
            cmp.set('v.expandedLabel', cmp.get('v.isExpanded') ? 'Collapse All' : 'Expand All');
            cmp.set('v.isExpanded', !cmp.get('v.isExpanded'));
            helper.doSetResultsMessage(cmp);
        }
    },
    onRefresh: function(cmp, event, helper) {
        helper.turnOnSpinner(cmp);
        helper.doGetActivity(cmp, event, helper);
    },
    onBack: function(cmp, event, helper) {
        helper.doNavigateBack(cmp, event, helper);
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