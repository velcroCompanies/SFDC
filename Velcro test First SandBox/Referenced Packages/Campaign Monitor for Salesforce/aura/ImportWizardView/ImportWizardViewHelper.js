({
    doHideResults : function(cmp) {
        var promptBackdrop = cmp.find('results-id');
        $A.util.toggleClass(promptBackdrop, 'slds-hide');
    },
    doGetScheduledResult : function(cmp, event, helper, importRecord) {

        var results = JSON.parse(importRecord);

        var resultsMessage = '';
        if(results.failureDetailLists) {
            if(results.failureDetailLists.length > 0 && results.failureDetailLists.length < 20) {
                resultsMessage = results.failureDetailLists.length + ' import warnings';
            } else if(results.failureDetailLists.length >= 20) {
                resultsMessage = 'Showing first ' + results.failureDetailLists.length + ' import warnings';
            } else {
                resultsMessage = 'Success. There were no import failures';
            }
        }

        cmp.set('v.resultsMessage', resultsMessage);

    },

})