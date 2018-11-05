({  
	keyPressController : function(component, event, helper) {
        
		var searchKeyWord = component.get("v.searchKeyWord"); 
        if( searchKeyWord.length > 1 ) { // open the lookup result List
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.search(component,event);
            
        } else { // close the lookup result List
            component.set("v.searchResults", null ); 
            component.set("v.message", "");
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
	},
    // Clears the record selection 
    clear :function(component,event,heplper){
      
         var pillTarget = component.find("lookup-pill");
         var lookUpTarget = component.find("lookup-input-div"); 
        
         $A.util.addClass(pillTarget, 'slds-hide');
         $A.util.removeClass(pillTarget, 'slds-show');
        
         $A.util.addClass(lookUpTarget, 'slds-show');
         $A.util.removeClass(lookUpTarget, 'slds-hide');
      
         component.set("v.searchKeyWord",null);
         component.set("v.searchResults", null );
    },
    // called when the end user selects a record from the result list.   
    handleSelectionEvent : function(component, event, helper) {
       // get selected record from event 
       var selectedRecord = event.getParam("selectedRecord");
	   component.set("v.selectedRecord", selectedRecord); 
       
        var pillTarget = component.find("lookup-pill");
           $A.util.addClass(pillTarget, 'slds-show');
           $A.util.removeClass(pillTarget, 'slds-hide');
      
        var forclose = component.find("searchRes");
           $A.util.addClass(forclose, 'slds-is-close');
           $A.util.removeClass(forclose, 'slds-is-open');
        
        var lookUpTarget = component.find("lookup-input-div");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');  
      
	}
})