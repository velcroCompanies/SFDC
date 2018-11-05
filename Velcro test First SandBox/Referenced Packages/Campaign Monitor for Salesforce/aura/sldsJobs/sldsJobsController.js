({
	onJobs : function(cmp, event, helper) {

		var msgType = event.getParam("msgType");

		// There can be a gap between a check and the user pressing the button. This can
		// result in the button becoming enabled again. Setting the job count to 2 means
		// that the check will be done twice, giving the check job time to set the status.
		var initJob = event.getParam("initJob");
		if(initJob) {
			cmp.set('v.runningJobCount', 5);
		}

		// This event param is sent when we want to start a job check
		if(msgType === 'NX_CHECK_RUNNING_JOBS') {
			helper.doCheckJobs(cmp, event, helper);
		}

		// // This event is sent
		// if(apexJobs === 'NX_JOB_STATUS') {
		// 	var apexJobs = event.getParam("apexJobs");
		// 	console.log(apexJobs);
		// }


	},
    onViewApexJobs : function(cmp, event, helper) {
        helper.navigateToPage(helper, '/apexpages/setup/listAsyncApexJobs.apexp');
    },
})