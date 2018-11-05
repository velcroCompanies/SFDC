@isTest
public class testLocationsNearbyMe {


@isTest 
public static void testLocationsNearbyMe()
   {
     LocationsNearbyMe controller= new LocationsNearbyMe();
     List<Lead> myList = LocationsNearbyMe.getNearbyLeads('40.00000', '-3.700000','50','','0','ALL');
     System.assert(myList!=null);         
     LocationsNearbyMe controller2= new LocationsNearbyMe();
     
     List<Account> myAcc= LocationsNearbyMe.getNearbyAccounts('40.416775', '-3.703790','50','','0','ALL');
     System.assert(myAcc!=null);         
   
  }

static testMethod void testNearby()
{
 
 Account Acc=new Account();
 Acc.name='test account';
 Acc.BillingStreet='Castellana 1';
 Acc.BillingPostalCode='08001';
 Acc.BillingCity='Madrid';
 Acc.BillingCountry='Spain';
 Acc.SBU__c='Construction';
 Acc.Org__c='VESA';
 Acc.Customer_Category__c='Automotive Seating';
 Id RecordTypeIdaccount = Schema.SObjectType.Account.getRecordTypeInfosByName().get('EMEA Customer').getRecordTypeId();
 Acc.RecordTypeId= RecordTypeIdaccount;
 insert Acc;
 
// integer lat= Acc.BillingLatitude.intValue();
//  System.assertEquals(40,lat);
  
 Account myAccount =[SELECT Id, Name, BillingLatitude FROM Account  WHERE Name ='test account' limit 1]; 
 //integer x= myAccount.BillingLatitude.intValue();
 System.assert(myAccount!=null);
 
 Lead myLead=New Lead();
 myLead.FirstName='roger';
 myLead.LastName='roger';
 myLead.Company='ACME';
 insert myLead;
 
 Lead myL =[SELECT Id FROM Lead WHERE Company='ACME' LIMIT 1 ]; 
 // List<Account> listAccounts= getNearbyAccounts('40.416775', '-3.703790','50','','0','ALL');
 System.assert(myL!=null);

}


}