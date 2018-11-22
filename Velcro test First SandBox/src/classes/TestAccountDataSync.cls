@isTest

//*********************************************************************************************//
//* Class Name: TestAccountDataSync *//
//* Description : Test class used for Triggers updateing Account Data *//
//* Creation Date: 13-Sept-2018 *//
//*-------------------------------------------------------------------------------------------*//
//* History:                                        *//
//*********************************************************************************************// 


public class TestAccountDataSync {
 
  static testMethod void AccUnitTest1()
  {
  	
  	Account a = new Account(Name='Class Test Account',SBU__c='Industrial',Phone='931234567',Fax='939876543',Website='https://velcro.com');
  	a.Org__c='VUSA';
    a.SBU__c='Transportation';
    a.Customer_Category__c='Automotive Seating';
    insert a;
    a.Phone=null;
    a.Fax= null ;
    a.Website=null;
    update a;   // this should throw the account update trigger 
    
  	  	
  }
  
}