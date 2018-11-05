({
	doInit : function(cmp, event, helper) {

		cmp.set('v.importRecord', JSON.parse(cmp.get('v.importResult')));
		helper.doGetScheduledResult(cmp, event, helper, cmp.get('v.importResult'));

    },
    doCancel : function(cmp, event, helper) {

        // Send event to close the window? or toggle visibility
        helper.doHideResults(cmp);

    },
    onKeyup : function(cmp, event, helper) {

    	if (event.keyCode === 27 ) {
	    	helper.doHideResults(cmp);
    	}

    },
})