({

    doGetActivity: function(cmp, event, helper) {
        var recordId = '';
        if (cmp.get('v.recordId')) {
            cmp.set('v.isStandalone', true);
            recordId = cmp.get('v.recordId');
        } else {
            recordId = cmp.get('v.memberId');
            cmp.set('v.isStandalone', false);
        }

        var action = cmp.get('c.getActivityHistoryForAllList');
        action.setParams({
            "recordId": recordId,
        });
        action.setCallback(this, function(actionResult) {
            debugger
            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var activitySummary = actionResult.getReturnValue();

                if (!activitySummary.isPremium) {
                    // Show upgrade banner
                    $A.util.removeClass(cmp.find('b12-email-feature-id'), "slds-hide");
                    cmp.set('v.resultsMessage', '');
                    $A.util.addClass(cmp.find('b12-activity-buttons-id'), "slds-hide");
                    helper.turnOffSpinner(cmp);

                    return;
                }

                if (typeof activitySummary !== 'undefined' && activitySummary.activities.length > 0) {
                    // the array is defined and has at least one element

                    cmp.set('v.activitySummary', activitySummary);
                    cmp.set('v.subscriberLists', activitySummary.subscriberLists);
                    cmp.set('v.selectedListFilter', activitySummary.primarySubscriberListId)

                    // Build up the subscriber list so the user can filter campaigns on them
                    var subscriberLists = [];


                    // If there are too many lists, then we don't give the user the option to select all
                    if (!activitySummary.hasTooManyLists) {
                        subscriberLists.push({ class: "optionClass", label: "All Subscriber Lists", value: "ALL", selected: true });

                        if (cmp.get('v.isStandalone')) {
                            cmp.set('v.selectedListFilter', 'ALL');
                        }
                    }

                    for (var j = 0; j < activitySummary.subscriberLists.length; j++) {
                        var list = activitySummary.subscriberLists[j];

                        // If there are too many lists, and we are in a standalone view, the select the first subscriber list
                        if (j == 0 && activitySummary.hasTooManyLists && cmp.get('v.isStandalone')) {
                            cmp.set('v.selectedListFilter', list.listId);
                        }
                        subscriberLists.push({ class: "optionClass", label: list.listName, value: list.listId, selected: cmp.get('v.selectedListFilter') == list.listId });
                    }
                    cmp.set('v.subscriberLists', subscriberLists);

                    helper.doFilterList(cmp, event, helper);

                } else {
                    $A.util.removeClass(cmp.find('b12-no-activity-id'), "slds-hide");
                    cmp.set('v.resultsMessage', '');
                    $A.util.addClass(cmp.find('b12-activity-buttons-id'), "slds-hide");
                    helper.turnOffSpinner(cmp);
                }

            } else if (state === "ERROR") {
                helper.processError(cmp, helper, actionResult.getError());
            }
        });
        $A.enqueueAction(action);
    },
    doGetActivityForList: function(cmp, event, helper) {

        var activitySummary = cmp.get('v.activitySummary'); // Contains the original response


        var action = cmp.get('c.getActivityHistoryForList');
        action.setParams({
            "email": activitySummary.email,
            "listId": cmp.get('v.selectedListFilter')
        });
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var activities = actionResult.getReturnValue();

                // Replace the previous activities
                activitySummary.activities = activities;
                helper.doFilterList(cmp, event, helper);

            } else if (state === "ERROR") {
                helper.processError(cmp, helper, actionResult.getError());
            }
        });
        $A.enqueueAction(action);
    },
    doFilterList: function(cmp, event, helper) {

        var activitySummary = cmp.get('v.activitySummary'); // Contains the original response

        var selectedActivities = [];
        var selectedActivitiesSummary = [];
        var selectedListFilter = cmp.get('v.selectedListFilter');

        // Loop through all the lists
        for (var i = 0; i < activitySummary.activities.length; i++) {
            var activity = activitySummary.activities[i];
            debugger
            if (activity.listId !== selectedListFilter && selectedListFilter !== 'ALL') {
                continue;
            }

            for (var k = 0; k < activity.activitySummaryHistory.length; k++) {
                selectedActivitiesSummary.push(activity.activitySummaryHistory[k]);
            }

            // Now loop through all the campaigns in the list
            for (var j = 0; j < activity.activityHistory.length; j++) {

                var act = activity.activityHistory[j];

                var history = {};
                history.campaignName = act.name;
                history.activity = act.activity;
                history.activityDateEpoch = act.activityDateEpoch;
                history.urlClicked = act.urlClicked;
                history.activityColour = act.activityColour;
                history.activityType = act.activityType;
                history.id = act.id;
                history.listId = activity.listId;

                selectedActivities.push(history);
            }
        }
        selectedActivities.sort(function(a, b) {
            return b.activityDateEpoch - a.activityDateEpoch;
        });

        selectedActivitiesSummary.sort(function(a, b) {
            return b.lastActivityDateEpoch - a.lastActivityDateEpoch;
        });


        cmp.set('v.selectedActivitiesSummary', selectedActivitiesSummary);
        cmp.set('v.selectedActivities', selectedActivities);
        cmp.set('v.isFiltered', selectedListFilter !== 'ALL');

        helper.doSetResultsMessage(cmp);
        helper.turnOffSpinner(cmp);

    },
    doSetResultsMessage: function(cmp) {

        var selectedActivitiesSummary = cmp.get('v.selectedActivitiesSummary');
        var selectedActivities = cmp.get('v.selectedActivities');

        var resultsMessage = '';
        if (cmp.get('v.isExpanded')) {
            if (selectedActivitiesSummary.length > 0) {
                resultsMessage = selectedActivitiesSummary.length + (selectedActivitiesSummary.length === 1 ? ' campaign' : ' campaigns');
            }
        } else {
            if (selectedActivities.length > 0) {
                resultsMessage = selectedActivities.length + (selectedActivities.length === 1 ? ' activity' : ' activities');
            }
        }
        cmp.set('v.resultsMessage', resultsMessage);
        $A.util.addClass(cmp.find('b12-listfilter-id'), "slds-hide");

        if ((selectedActivitiesSummary.length > 0 || selectedActivities.length > 0)) {
            $A.util.addClass(cmp.find('b12-no-activity-id'), "slds-hide");
        } else {
            $A.util.removeClass(cmp.find('b12-no-activity-id'), "slds-hide");
        }

    },
    doGetCampaignDetails: function(cmp, event, helper, cmCampaignId) {

        var action = cmp.get("c.getCampaignSummary");
        action.setParams({
            "cmCampaignId": cmCampaignId
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var campDetail = actionResult.getReturnValue();

                cmp.set('v.campDetail', campDetail);
                $A.util.addClass(cmp.find('tempate-spinner-id'), "slds-hide");
                $A.util.removeClass(cmp.find('tempate-id'), "slds-hide");

            } else if (state === "ERROR") {
                helper.processError(cmp, helper, actionResult.getError());
            }
        });
        $A.enqueueAction(action);
    },
    doNavigateBack: function(cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if (!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }
        if (backLocation === 'SUBSCRIBER_LIST_DETAIL') {

            // Send event to subscriber home to setup Member page
            var compEvent = cmp.getEvent("subscriberListHomeEvent");
            compEvent.setParams({
                "action": 'SUBSCRIBER_LIST_DETAIL',
                "id": cmp.get("v.listId")
            });
            compEvent.fire();

        }
    },
    processError: function(cmp, helper, errors) {
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message); // eslint-disable-line
            }
        } else {
            console.log("Unknown error"); // eslint-disable-line
        }
        cmp.set('v.resultsMessage', 'Unable to get email activity. Try again in 5min.');

        helper.turnOffSpinner(cmp);
    },
    turnOffSpinner: function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    turnOnSpinner: function(cmp) {
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
    },
})