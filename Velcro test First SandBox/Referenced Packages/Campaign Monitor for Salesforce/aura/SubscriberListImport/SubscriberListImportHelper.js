({
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
                helper.turnOffSpinner(cmp);

                helper.pollImportList(cmp, event, helper);
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
    doGetImports: function(cmp, event, helper) {

        console.log('Polling imports...'); // eslint-disable-line
        var membersList = [];

        var action = cmp.get("c.getImports");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var imports = actionResult.getReturnValue();

                cmp.set('v.allLists', imports);
                if (imports.length > 50) {
                    cmp.set('v.subHeader', '50+ items');
                } else {
                    cmp.set('v.subHeader', imports.length + ' items');
                }

                cmp.set("v.maxPage", Math.floor((imports.length + 19) / 20));

                helper.renderPage(cmp);
                cmp.set('v.isLoading', false);
                cmp.set('v.pageNumber', 1);

                helper.doGetListDetails(cmp, event, helper);


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
    doDeleteImport: function(cmp, event, helper, importId) {

        var action = cmp.get("c.deleteImport");
        action.setParams({
            "importId": importId
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                helper.doGetImports(cmp, event, helper);
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


    loadImportWizard: function(cmp, event, helper) {
        helper.loadImportWizardScheduleId(cmp, event, helper, null);
    },
    loadImportWizardScheduleId: function(cmp, event, helper, scheduledId) {

        // Load the import wizard
        $A.createComponent(
            "wbsendit:ImportWizard", {
                "listdetail": cmp.get("v.listdetail"),
                "scheduledId": scheduledId
            },
            function(newCmp, status, errorMessage) {

                if (status === "SUCCESS") {
                    cmp.set("v.wizardcomponent", []); // Clear out previous components
                    var wizardcomponent = cmp.get("v.wizardcomponent");
                    wizardcomponent.push(newCmp);
                    cmp.set("v.wizardcomponent", wizardcomponent);

                    // document.getElementById("spinner-id").className = "slds-hide";
                    $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                }
            }
        );
    },
    loadImportResults: function(cmp, event, helper, results) {

        $A.createComponent(
            "wbsendit:ImportWizardView", {
                "importResult": results
            },
            function(newCmp, status, errorMessage) {

                if (status === "SUCCESS") {
                    cmp.set("v.resultscomponent", []); // Clear out previous components
                    var resultscomponent = cmp.get("v.resultscomponent");
                    resultscomponent.push(newCmp);
                    cmp.set("v.resultscomponent", resultscomponent);

                    $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline."); // eslint-disable-line
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage); // eslint-disable-line
                }
            }
        );
    },
    pollImportList: function(cmp, event, helper) {

        // Only run the poll job once
        var timerId = cmp.get('v.timerId');
        if (!timerId) {



            var internalTimer = window.setInterval(
                $A.getCallback(function() {

                    if (cmp.get('v.isPollEnabled')) {
                        helper.doGetImports(cmp, event, helper);
                    }


                }), 3000
            );
            if (internalTimer) {
                cmp.set('v.timerId', internalTimer);
            }
        }

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

        // document.getElementById("spinner-id").className = "slds-hide";
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