/************************************************************/ 
/* Roger Fontcuberta 11/04/2018			 					*/
/* Webservice to create PDF attachement from Quote			*/
/* PDF templates are VF pages using this naming convention: */
/* EMEA_[Lang]_Quote_PDF  where Lang is ISO 639-1 code      */
/************************************************************/
/*  18/10/2018 */
/*  Add Quote_Template__c field and logic to allow  		*/
/*  use of additional templates once language is chosen     */ 


public with sharing class AttachmentGenerator_Lightning  {
   
   @AuraEnabled
   public static String AttachPDFToQuote(string Id, String Lang,String Option) {
      
       string retRes = '';
        String QId=Id;
        String oppId='';
        String OrgId='';
        Blob content;
        String CCmails='';
        Quote q=null;
        String fileName='';
        Integer version=1;
        
        
        
        /* use contact in quote to get mail , opp and Org */ 
        String contactId= ''; 
        q =  [SELECT  Contact.Id , Opportunity.Id , Org_ID__c, Quote_Template__c   FROM Quote WHERE Id =: QId  ];  
        contactId= q.Contact.Id;
        oppId = q.opportunity.Id;
        OrgId= q.Org_ID__c;
          if (q.Quote_Template__c != null ) { OrgId +=  q.Quote_Template__c;}  // add template name, if not null to the VF page to be used. 
          
          
        if (OrgId=='') { OrgId='VESA'; }  // default if not set.
        if (Lang=='') { Lang='en'; }   // default lang  
        try
        {
         PageReference pageRef = new PageReference('/apex/EMEA_'+OrgId+'_Quote_PDF?Id='+QId+'&lang='+Lang);
         if(Test.isRunningTest()) {
           content=  blob.valueOf('Unit.Test');
           }
         else {
           content = pageRef.getContent(); 
           }
         
         QuoteDocument doc = new QuoteDocument(Document = content, QuoteId = QId);
         insert doc;
        
    
        
                  
        for ( OpportunityContactRole con : [SELECT contactId FROM OpportunityContactRole WHERE  OpportunityId =: oppId  ]  ) 
          {  
            for ( Contact co : [SELECT email FROM Contact WHERE Id =: con.contactId  ]  ) { 
         	    CCmails= CCmails+ co.email+','; 
            }
          }
             
        String Emailtemplate='';
        String condition= 'EMEA_Quote_'+ Lang+ '%'; 
        System.debug('Attachemnt generator tempalte condition: '+condition) ;
         
        // get default email template, if possible.
        for (EmailTemplate et: [SELECT Id FROM EmailTemplate WHERE DeveloperName LIKE :condition ])
        {
           Emailtemplate= et.Id;
        } 
         
         String userEmail= UserInfo.getUserEmail();
         String docId= doc.Id;
         String saveUrl='/_ui/core/email/author/EmailAuthor?p2_lkid='+contactId+'&rtype=003&p3_lkid='+QId+'&doc_id='+docId+'&p24='+userEmail+'&p4='+CCmails+'&template_id='+Emailtemplate+'&retURL='+QId;
         
         if (Option=='0'){
           retRes='SUCCESS';}
         else { retRes=saveUrl;}
         
         return retRes;
       } catch(exception ex) {
           System.debug('--- Error ----------'+ ex);
           retRes= ex.getMessage();
           return retRes;
       }
   }
}