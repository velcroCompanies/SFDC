({
    doGetMemberLists: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberMemberLists");
        action.setParams({
            "memberId" : cmp.get('v.memberId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
            	var memberLists = actionResult.getReturnValue();

            	for(var i=0; i < memberLists.length; i++){
	            	var subscriberId = memberLists[i].id;
	            	if(subscriberId.substr(0,15) === cmp.get('v.memberId') || subscriberId === cmp.get('v.memberId') ) {
	            		cmp.set('v.listName', memberLists[i].listName);
						cmp.set('v.email', memberLists[i].email);
                        cmp.set('v.sfListId', memberLists[i].subscriberList);
	            	}
            	}


            	cmp.set('v.memberLists', memberLists);

                var resultsMessage = '';
                if(memberLists.length > 0) {
                    resultsMessage = memberLists.length +  (memberLists.length === 1 ? ' list' : ' lists');
                }
                cmp.set('v.resultsMessage', resultsMessage);

                helper.turnOffSpinner(cmp);

            }
            else if (state === "ERROR") {

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
    doNavigateBack: function(cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if(!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }
        if(backLocation === 'SUBSCRIBER_LIST_DETAIL') {

            // Send event to subscriber home to setup Member page
            var compEvent = cmp.getEvent("subscriberListHomeEvent");
            compEvent.setParams({
                "action": 'SUBSCRIBER_LIST_DETAIL',
                "id" : cmp.get('v.sfListId')
            });
            compEvent.fire();

        }
    },
    turnOffSpinner : function(cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
})