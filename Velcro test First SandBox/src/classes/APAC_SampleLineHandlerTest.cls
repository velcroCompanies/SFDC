@isTest
class APAC_SampleLineHandlerTest {
    static testMethod void test(){
    	Account a = new Account(Name = 'Burlington Acme',SBU__c='Transportation');
        insert a;
        Sample_Request__c sr = new Sample_Request__c(Customer__c=a.id,Request_Region__c='EMEA',Request_to_Country__c='Spain',
        		Delivery_method__c='UPS',CurrencyIsoCode='CNY');
        insert sr;
        Sample_Line__c line = new Sample_Line__c(Sample_Request__c=sr.id,Length__c=10,
        		Quantity__c=10,Estimated_Unit_Price_APAC__c=10,CurrencyIsoCode='CNY');
        insert line;
        delete line;
    }
}