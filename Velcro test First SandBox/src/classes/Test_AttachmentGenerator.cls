@isTest

public class Test_AttachmentGenerator {

 static  testMethod void TestPdf()
 { 
 String Lang='EN';
 String Option='0';
 String result='';
 Quote quo = new Quote();
 opportunity opp= new Opportunity();
 opp.Name='test opp';
 opp.closeDate=date.today(); 
 opp.StageName='Draft'; 
 insert opp;
 system.debug('opp:' +opp.Id)  ;  
 
 
 /***** test contacts ***/
    Account newAcc = new Account();
    newAcc.name='test ACC for contacts';
    newAcc.Org__c='VESA';
    newAcc.SBU__c='Transportation';
    newAcc.Customer_Category__c='Automotive Seating';
    //Id RecordTypeIdaccount = Schema.SObjectType.Account.getRecordTypeInfosByName().get('EMEA Customer').getRecordTypeId();
    //newAcc.RecordTypeId= RecordTypeIdaccount;
    //newAcc.RecordTypeId='012A00000019lmdIAA';
    //insert newAcc;
    
    
    Contact con =new Contact();
    con.FirstName='Roger';
    con.LastName='Mas';
    con.email='roger@roger.com';
    con.LeadSource='Other';
    con.Contact_Type__c='Buyer';
    
    List<Account> acc_list = [SELECT Id From Account Where Name like '%A%' LIMIT 1];  
    for (Account acc_rec : acc_list)
    {
      con.AccountId =  acc_rec.Id;    
    }
    
        
    insert con;
    //Now update the OCR for the primary contact
    OpportunityContactRole ocr = new OpportunityContactRole();
    ocr.ContactId = con.Id;
    ocr.OpportunityId = opp.Id;
    ocr.IsPrimary = TRUE;
    ocr.Role = 'Decision Maker';
    insert ocr;
    System.debug('created opportunity contact role for primary');
 
 
 if (opp!=null)
     {
 quo.Name='Test quote';
 quo.OpportunityId= opp.Id;
 quo.Language__c='EN'; 
 /*quo.recordTypeId='0120U0000000B36';*/
 try 
 { insert quo;
   system.debug('quote:' +quo.Id)  ;	
 	}
 catch (Exception e) { 
    system.debug('quote exception')  ;
 	}
 }
  else system.debug('opp is null')  ;  
       
   
 
 String quoid= (String)quo.Id;
 result= AttachmentGenerator.AttachPDFToQuote(quoid, Lang, Option);
 System.assertEquals ('SUCCESS',result);
 Option='1';
 result= AttachmentGenerator.AttachPDFToQuote(quoId, Lang, Option); 
 System.assertNotEquals ('SUCCESS',result);
 
 ApexPages.StandardController sc = new ApexPages.StandardController(quo);
 ExtDocsQuote extQuote= new ExtDocsQuote(sc); 
 result= extQuote.getQuoteVersion();
 System.assertNotEquals ('1',result);
 
 /**** lightning component class tests **/
 Option='0';
 result= AttachmentGenerator_Lightning.AttachPDFToQuote(quoid, Lang, Option);
 System.assertEquals ('SUCCESS',result);
 Option='1';
 result= AttachmentGenerator_Lightning.AttachPDFToQuote(quoId, Lang, Option); 
 System.assertNotEquals ('SUCCESS',result);
 
 sc = new ApexPages.StandardController(quo);
 extQuote= new ExtDocsQuote(sc); 
 result= extQuote.getQuoteVersion();
 System.assertNotEquals ('1',result);
 
 
 
 
 
 }
}