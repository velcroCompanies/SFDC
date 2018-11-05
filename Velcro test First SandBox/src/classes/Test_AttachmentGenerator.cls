@isTest

Private Class Test_AttachmentGenerator {

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