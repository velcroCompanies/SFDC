({
    doGetListMembers: function(cmp, event, helper) {

        var membersList = [];

        var action = cmp.get("c.getMembers");
        action.setParams({
            "searchFilter": cmp.get('v.searchFilter'),
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var members = actionResult.getReturnValue();
                cmp.set('v.allLists', members);
                if (members.length > 50) {
                    cmp.set('v.subHeader', '50+ items');
                } else {
                    cmp.set('v.subHeader', members.length + ' items');
                }

                cmp.set("v.maxPage", Math.floor((members.length + 19) / 20));

                helper.renderPage(cmp);
                cmp.set('v.isLoading', false);
                cmp.set('v.pageNumber', 1);
                cmp.set('v.disableRefreshButton', false);

                helper.turnOffSpinner(cmp);

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
    doGetListDetails: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberListDetail");
        action.setParams({
            "subscriberListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var listdetail = actionResult.getReturnValue();
                cmp.set('v.listdetail', listdetail);

                // If prevent member sync is enabled, show a message and hide the refresh button
                if (listdetail.preventMemberSync) {
                    cmp.set('v.noSubscribersLabel', 'Members won\'t sync whilst "Prevent Member Sync" is Enabled.');
                    $A.util.addClass(cmp.find('refreshButtonId'), 'slds-hide');
                }

                helper.doGetListMembers(cmp, event, helper);
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

    renderPage: function(cmp) {
        var records = cmp.get("v.allLists"),
            pageNumber = cmp.get("v.pageNumber"),
            pageRecords = records.slice((pageNumber - 1) * 20, pageNumber * 20);
        cmp.set("v.currentList", pageRecords);
    },

    doRefreshLists: function(cmp, event, helper) {

        // Disable the buttons and show banner
        cmp.set('v.disableRefreshButton', true);

        var action = cmp.get("c.refreshSubscribers");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
            "cmListId": cmp.get('v.listdetail.cmListId'),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var jobId = actionResult.getReturnValue();

                cmp.set('v.jobId', jobId);
                helper.pollRefreshList(cmp, event, helper);
                helper.successNotification(cmp, event, helper, 'Importing new records from Campaign Monitor');
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
    pollRefreshList: function(cmp, event, helper) {
        helper.checkRefreshLists(cmp, event, helper);

        //execute checkRefreshLists() again after 5 sec each
        var internalTimer = window.setInterval(
            $A.getCallback(function() {

                helper.checkRefreshLists(cmp, event, helper);
                var progress = cmp.get('v.progress');
                if (progress === 100) {
                    clearInterval(cmp.get('v.timerId'));
                    helper.doGetListDetails(cmp, event, helper);
                    helper.successNotification(cmp, event, helper, 'List is now up to date with Campaign Monitor');
                }

            }), 2000
        );

        if (internalTimer) {
            cmp.set('v.timerId', internalTimer);
        }

    },
    checkRefreshLists: function(cmp, event, helper, lastcheck) {

        var action = cmp.get("c.isRefreshRunning");
        action.setParams({
            "jobId": cmp.get('v.jobId'),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var isJobRunning = actionResult.getReturnValue();
                cmp.set('v.progress', isJobRunning.pctComplete);

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
    doSelectMember: function(cmp, event, helper, memberId) {

        // Send event to subscriber home to setup Member page
        var compEvent = cmp.getEvent("subscriberListHomeEvent");
        compEvent.setParams({
            "action": 'MEMBER_ACTION',
            "id": memberId
        });
        compEvent.fire();
    },
    doNavigateBack: function(cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if (!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }

        // If we are in native Lightning, always go back to the subscriber list home
        var eventToObjectHome = $A.get("e.force:navigateToObjectHome");
        if (eventToObjectHome) {
            eventToObjectHome.setParams({
                scope: "wbsendit__Subscriber_List__c"
            });
            eventToObjectHome.fire();
        } else {
            window.location.href = cmp.get('v.listdetail.listViewHomeURL');
        }
    },

    turnOffSpinner: function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    successNotification: function(cmp, event, helper, msg) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");

        notificationEvent.setParams({
            msg: msg
        }).fire();

    },
})