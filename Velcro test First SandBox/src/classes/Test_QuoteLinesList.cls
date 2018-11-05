/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 */
 
@isTest
private class Test_QuoteLinesList {

 static testMethod void QuoteLinesUnitTest() {
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
 //quo.recordTypeId= Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Quote').getRecordTypeId();
 insert quo;
  }
 else system.debug('opp is null')  ;  
   
   
  if (quo!=null){
  	
        
 system.debug('quote:' +quo.Id)  ;  
  
  Quote_line__c qline= new Quote_line__c();
  qline.Description__c='desc';
  qline.Minimun_Order_Quantity__c=100;
  qline.Price__c=1;
  qline.Product_Code__c='123';
  qline.quote__c= quo.Id;
  qline.Units_of_measure__c='Roll';
  
  insert qline;
  system.debug('quote line:' +qline.Id)  ; 
  } 
  try{  
  ApexPages.StandardController sc = new ApexPages.StandardController(quo);
  QuoteLinesListController Qlines= new QuoteLinesListController(sc);
  
  //Qlines.addCount=1;
  Qlines.QuoteLinesExisting();
  Qlines.SetDelPos(1);
  Qlines.delWrapper();
  } catch (exception e) {
    system.debug('quote 1 ha petat')  ;
  }
  try {
  ApexPages.StandardController sc2 = new ApexPages.StandardController(quo);
  QuoteLinesListController Qlines2= new QuoteLinesListController(sc2);
  
  Qlines2.QuoteLinesExisting();
  Qlines2.SetaddCount(1);
  Qlines2.addRows();
  Qlines2.save();
  } catch (exception e) {
    system.debug('quote 2 ha petat')  ;
  }
  
  
        
    }
}