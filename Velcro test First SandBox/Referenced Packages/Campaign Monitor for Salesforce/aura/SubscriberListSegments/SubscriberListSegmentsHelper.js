({
    doGetListDetails: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberListDetail");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var listdetail = actionResult.getReturnValue();
                cmp.set('v.listdetail', listdetail);

                helper.doGetSegments(cmp, event, helper);

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

    doGetSegments: function(cmp, event, helper) {
        debugger
        var action = cmp.get("c.getSegments");
        action.setParams({
            "cmListId": cmp.get('v.listdetail.cmListId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var segments = actionResult.getReturnValue();
                cmp.set('v.segments', segments);

                // var segmentList = [{ "class": "optionClass", "label": "-- None --", "value": "none", "selected": true }];
                var segmentList = [];
                for (var j = 0; j < segments.length; j++) {
                    var segment = segments[j];
                    segmentList.push({ class: "optionClass", label: segment.title, value: segment.segmentID, selected: false });
                }
                cmp.set('v.segmentList', segmentList);

                if (segments.length > 0) {
                    cmp.set('v.segmentId', segments[0].segmentID);
                    helper.doGetSegmentMembers(cmp, event, helper);
                } else {
                    cmp.set('v.hasSegments', false);
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
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    setSubHeader: function(cmp, members, filtered) {

        if (members) {
            if (filtered) {
                if (members.length == 1) {
                    cmp.set('v.subHeader', members.length + ' subscriber');
                } else if (members.length >= 50) {
                    cmp.set('v.subHeader', members.length + '+ subscribers');
                } else if (members.length < 50) {
                    cmp.set('v.subHeader', members.length + ' subscribers');
                }

            } else {
                cmp.set('v.subHeader', cmp.get('v.segmentRoot.totalNumberOfRecords') + ' subscribers');
                cmp.set('v.showSegmentFilter', (cmp.get('v.segmentRoot.totalNumberOfRecords') <= 100000 && !members.length == 0));
            }
        }
    },
    setSubHeaderVisibility: function(cmp) {
        $A.util.addClass(cmp.find('b12-subheader-sort'), "slds-hide");
        $A.util.removeClass(cmp.find('b12-subheader-sort'), "slds-show");

        $A.util.addClass(cmp.find('b12-subheader-filter'), "slds-show");
        $A.util.removeClass(cmp.find('b12-subheader-filter'), "slds-hide");

        $A.util.addClass(cmp.find('b12-footer'), "slds-hide");
        $A.util.removeClass(cmp.find('b12-footer'), "slds-show");
    },
    doFindSegmentMember: function(cmp, event, helper) {


        var members = cmp.get('v.allLists');
        var searchValue = cmp.find('search').get('v.value');

        var filteredList = [];
        var filterCount = 0;

        for (var j = 0; j < members.length; j++) {
            var member = members[j];

            if (member.email.includes(searchValue)) {

                filteredList.push(member);

                // Don't keep on searching otherwise we will blow limits
                filterCount++;
                if (filterCount >= 50) {
                    break;
                }
            }
        }

        // Check if it wasn't found, if so, keep searching in SF
        if (filterCount < 50) {
            var action = cmp.get("c.findSegmentMember");
            action.setParams({
                "segmentId": cmp.get('v.segmentRoot.segmentId'),
                "email": searchValue,
                "numberOfPages": cmp.get('v.segmentRoot.numberOfPages'),
                "currentFilterSize": filterCount,
            });

            action.setCallback(this, function(actionResult) {

                var state = actionResult.getState();
                if (state === "SUCCESS") {
                    var pageRecords = actionResult.getReturnValue();
                    if (pageRecords.length) {
                        filteredList = filteredList.concat(pageRecords.segmentMembers);
                    }

                    cmp.set("v.currentList", filteredList);

                    cmp.set('v.subHeaderFilter', 'Filtered by "' + searchValue + '"');

                    helper.setSubHeader(cmp, filteredList, true);
                    helper.setSubHeaderVisibility(cmp);


                } else if (state === "ERROR") {

                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.showNotification(cmp, event, helper, 'Unable to contact Campaign Monitor. Please try refresh the page and try again.', 'warning');
                            console.log("Error message: " + errors[0].message); // eslint-disable-line
                        }
                    } else {
                        console.log("Unknown error"); // eslint-disable-line
                    }
                }
            });
            $A.enqueueAction(action);

        } else {

            cmp.set('v.currentList', filteredList);
            cmp.set('v.subHeaderFilter', 'Filtered by "' + searchValue + '"');

            helper.setSubHeader(cmp, filteredList, true);
            helper.setSubHeaderVisibility(cmp);
        }



    },
    doGetSegmentMembers: function(cmp, event, helper) {

        var action = cmp.get("c.getSegmentMembers");
        action.setParams({
            "pageNumber": 1,
            "segmentId": cmp.get('v.segmentId')
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var segmentRoot = actionResult.getReturnValue();
                cmp.set('v.segmentRoot', segmentRoot);
                var members = segmentRoot.segmentMembers;

                cmp.set('v.allLists', members);
                helper.setSubHeader(cmp, members);

                cmp.set("v.maxPage", Math.floor((members.length + 19) / 20));

                helper.renderPage(cmp);
                cmp.set('v.isLoading', false);
                cmp.set('v.pageNumber', 1);
                cmp.set('v.disableRefreshButton', false);

                cmp.set('v.loadedSegmentMembers', true);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.showNotification(cmp, event, helper, 'Unable to contact Campaign Monitor. Please try refresh the page and try again.', 'warning');
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


    doSelectMember: function(cmp, event, helper, memberId) {

        var eventToObjectHome = $A.get("e.force:navigateToSObject");
        if (eventToObjectHome) {
            eventToObjectHome.setParams({
                "recordId": memberId,
                "slideDevName": "detail"
            });
            eventToObjectHome.fire();
        } else {
            window.location.href = '/' + memberId;
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
    turnOnSpinner: function(cmp) {
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
    },
    showNotification: function(cmp, event, helper, msg, msgSeverity) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg,
            msgSeverity: msgSeverity
        }).fire();
    },

})