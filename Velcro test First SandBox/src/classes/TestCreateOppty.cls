@isTest
public class TestCreateOppty {
    public static testMethod void newOpptyValid(){
        Account a = new Account();
         a.Name='Burlington Acme';
		 a.BillingStreet='street';
		 a.BillingPostalCode='08020';
		 a.BillingCity='Manchester';
		 a.BillingCountry='United States';
		 a.SBU__c='Construction';
		 a.Org__c='VUSA';
		 a.Customer_Category__c='Automotive Seating';
		insert a;
        Case c = new Case(AccountId = a.Id);
           
         c.SBU__c='Industrial';
         c.Quality_Issue_Plant__c='VAP';
         c.Quality_Contact__c='Ben Tarazon';
         c.UOM__c='Meter';
         c.Total__c= 1;
         //c.PO_Number__c='1';
         //c.SO_Number__c='1';
         
        insert c;
             
        String oppName = 'Burlington Acme 1000 TVs';
        
        List<Opportunity> lob = [SELECT Name, AccountId, StageName, CloseDate From Opportunity];
        System.assertEquals(0, lob.size());
        CreateOppty.newOppty(oppName, c.id);
        List<Opportunity> lo = [SELECT Name, AccountId, StageName, CloseDate From Opportunity];
        System.assertEquals(1, lo.size());
        System.assertEquals(lo[0].Name, oppName);
        System.assertEquals(lo[0].AccountId, a.Id);
        System.assertEquals(lo[0].StageName, 'Perception Analysis');
        System.assertEquals(lo[0].CloseDate, Date.today().addMonths(1));
    }
}