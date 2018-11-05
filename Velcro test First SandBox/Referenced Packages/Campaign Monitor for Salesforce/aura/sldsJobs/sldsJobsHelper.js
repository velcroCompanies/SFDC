({
    // Check if the status of the job
    doCheckJobs: function(cmp, event, helper) {

        var action = cmp.get("c.getApexJobs");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var runningJobs = actionResult.getReturnValue();

                // Show jobs banner
                if (runningJobs.length > 0) {
                    cmp.set('v.runningJobCount', 5);
                }
                // Keep on showing banner for X iterations to cater for gaps between batches
                if (cmp.get('v.runningJobCount') > 0) {
                    cmp.set('v.runningJobCount', cmp.get('v.runningJobCount') - 1);
                    cmp.set('v.showJobsBanner', true);
                } else {
                    cmp.set('v.showJobsBanner', false);
                }

                // Fire event
                var jobEvent = $A.get("e.wbsendit:sldsJobsEvent");
                jobEvent.setParams({ "apexJobs": runningJobs });
                jobEvent.setParams({ "msgType": 'NX_JOB_STATUS' });
                jobEvent.setParams({ "showJobsBanner": cmp.get('v.showJobsBanner') });
                jobEvent.fire();

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

    // helper.navigateToPage(helper, '/' + subscriberListId);
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