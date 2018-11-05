({
	getPartnerRecords : function(component, event, helper) {	
        var params = event.getParam('arguments');
        if (params) {
            // Create the action
        	var action;
            var sObject = params.sObjectName;
            if(sObject == "Account"){
                action = component.get("c.getPartnersByAccountId");  
            }else if(sObject == "Opportunity"){
                action = component.get("c.getPartnersByOpportunityId");
            }else {
                return;
            } 
            
            //set params  
            action.setParams({
                "recordId": params.recordId,
                "sortBy": params.sortBy,
                "sortDirection": params.sortDirection
            });
            
            var callback = params.callback;
            //Set any optional callback and enqueue the action
        	if (callback) {
            	action.setCallback(this, callback);
        	}        
            // Send action off to be executed
            $A.enqueueAction(action);
        }
	},
    getPartnerFields : function(component, event, helper) {	
        let params = event.getParam('arguments');
        if (params) {
            // Create the action
        	var action;
            var sObject = params.sObjectName;
            if(sObject == "Account"){
                action = component.get("c.getPartnerFieldsForAccount");  
            }else if(sObject == "Opportunity"){
                action = component.get("c.getPartnerFieldsForOpportunity");
            }else {
                return;
            }
            
            var callback = params.callback;
            //Set any optional callback and enqueue the action
        	if (callback) {
            	action.setCallback(this, callback);
        	}        
            // Send action off to be executed
            $A.enqueueAction(action);
        }
    },

    getPartnerLabels: function(component, event, helper) {
        let params = event.getParam('arguments'),
        callback = params.callback,
        action = component.get("c.getLabels");

        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },
})