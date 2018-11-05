({
    SetPDFParams_void  : function(cmp, event, helper) { 
         
         console.log('void : ');
         
    },
    
    SetPDFParamsEmail : function(component, event, helper) {
      //string Id, String Lang,String Option 
        var action = component.get("c.AttachPDFToQuote");
        
        action.setCallback(this, function(response) {
              var res = response.getReturnValue();
              if(res=='SUCCESS')
              	{
            	 $A.get("e.force:refreshView").fire(); 
              	}
              else {
               $A.get("e.force:navigateToURL").setParams({"url": res }).fire();
               }

         });
         
        action.setParams({
            "Id"   : component.get("v.recordId"),
            "Lang": component.get("v.QuoteRecord.Language__c").toLowerCase(),
            "Option": "1"  
        });
        $A.enqueueAction(action);
        console.log('Request creation od PDF ' + component.get("v.recordId") );
        component.set("v.isOpen", false);  
         
     },
     SetPDFParams : function(component, event, helper) {
      //string Id, String Lang,String Option 
        var action = component.get("c.AttachPDFToQuote");
        
        action.setCallback(this, function(response) {
              var res = response.getReturnValue();
              if(res=='SUCCESS')
              	{
            	 $A.get("e.force:refreshView").fire(); 
              	}
              else {
               $A.get("e.force:navigateToURL").setParams({"url": res }).fire();
               }

         });
        action.setParams({
            "Id"   : component.get("v.recordId"),
            "Lang": component.get("v.QuoteRecord.Language__c").toLowerCase(),
            "Option": "0"    // do not send email.
        });
        $A.enqueueAction(action);
        console.log('Request creation od PDF ' + component.get("v.recordId") );
        component.set("v.isOpen", false);
         
     },
    
   handleClick : function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    },
    
    
    
    doInit : function(component, event, helper) {
       
    //get record type of initial record
       //var passRecID = component.get("{!v.QuoteRecord}");
        var QuoteId= component.get("{!v.recordId}");
        var QuoteOrgId= component.get("{!v.QuoteRecord.Org_ID__c}");
        var QuoteLang= component.get("{!v.QuoteRecord.Language__c}");
        var QuoteTemplate= component.get("{!v.QuoteRecord.Quote_Template__c}");
        
        if ( QuoteTemplate == null || QuoteTemplate==""  ) 
           { QuoteTemplate=QuoteOrgId; }
         else 
            { QuoteTemplate=QuoteOrgId+QuoteTemplate;}
        if (QuoteLang===null) {QuoteLang='es';}
        
        var src="/apex/EMEA_"+ QuoteTemplate + "_Quote_PDF?id=" + QuoteId + "&lang="+ QuoteLang.toLowerCase();
       
       var d = new Date();
       var tstamp = d.getTime();  
       // add time stamp to url to make SF reload the page.
       src+="&t="+ tstamp;
       component.set("v.iframeSource", encodeURI(src));
       console.log('The iframe url is:_' + encodeURI(src));
      
    },
    modalOpen: function(component, event, helper) {
       component.set("v.isOpen", true);  
    
    },
    modalClose: function(component, event, helper) {
    component.set("v.isOpen", false);  
    },
    
})