({
	search : function(component,event) {
      this.showSpinner(component);
      var extraFieldToQuery = '',
      sObjectName = component.get("v.sObjectName");

      if(sObjectName == "account" || sObjectName == "Account") {
        extraFieldToQuery = component.get("v.accountExtraField");
      } else {
        extraFieldToQuery = component.get("v.oppExtraField");
      }

      console.log(component.get("v.accountExtraField"), component.get("v.oppExtraField"));

	  // call SObjectLookupService(Apex)
      var action = component.get("c.getLookupRecords");
      action.setParams({
          'searchString': component.get("v.searchKeyWord"),
          'sObjectAPIName': sObjectName,
          'recordId': component.get("v.recordId"),
          'extraFieldToQuery': extraFieldToQuery
      });
      // callBack    
      action.setCallback(this, function(response) {
          var state = response.getState();
          if (component.isValid() && state === "SUCCESS") {
              var results = response.getReturnValue();
              // if results size is 0 display 'No Result Found'
              if (results.length == 0) {
                $A.util.removeClass(component.find("searchResultsMsg"), "slds-hide");
                  component.set("v.message", 'No Result Found...');
              } else {
                $A.util.addClass(component.find("searchResultsMsg"), "slds-hide");
              }
              // set searchResult list with return value from server.
              component.set("v.searchResults", results);
              console.log(results);
              this.hideSpinner(component);
          }
      });
      // enqueue the Action  
      $A.enqueueAction(action);
	},
    showSpinner : function(component) {
	   var spinner = component.find("lookup-spinner");
       $A.util.removeClass(spinner, "slds-hide");
       $A.util.addClass(component.find("lookup-spinner-div"), "slds-m-around--large");  
	},
    hideSpinner : function(component) {
	   var spinner = component.find("lookup-spinner");
       $A.util.addClass(spinner, "slds-hide");
       $A.util.removeClass(component.find("lookup-spinner-div"), "slds-m-around--large");
	}
})