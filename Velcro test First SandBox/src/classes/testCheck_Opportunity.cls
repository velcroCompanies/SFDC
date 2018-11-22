@isTest

public class testCheck_Opportunity {

 static testMethod void LCUnitTest1()
  {
    Account newAcc = new Account();
    newAcc.name='test Account 1';
    newAcc.Org__c='VUSA';
    newAcc.SBU__c='Transportation';
    newAcc.Customer_Category__c='Automotive Seating';
    Id RecordTypeIdaccount = Schema.SObjectType.Account.getRecordTypeInfosByName().get('EMEA Customer').getRecordTypeId();
    newAcc.RecordTypeId= RecordTypeIdaccount;
    insert newAcc;
    System.assertEquals('VUSA',newAcc.Org__c);
    
    Opportunity o1=new Opportunity(); 
    o1.Name = 'Test Opp1';
    List <User> user_list = [SELECT Id  FROM User where Username like 'velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    System.debug('Acc name: ' + newAcc.name);
       
    o1.accountid= newAcc.Id;
    o1.closeDate= system.today(); 
    o1.Request_Status__c= 'Draft';    
    o1.StageName='Developing';
    o1.Type='Existing Business';
    o1.Amount=2;
    o1.Probability=60;
    Id RecordTypeIdOpp = Schema.SObjectType.Opportunity.getRecordTypeInfosByName().get('C-EMEA Sales Opportunity').getRecordTypeId();
    o1.RecordTypeId= RecordTypeIdOpp;
    insert o1;

    System.debug('Opp:'+ o1.Name+' | '+o1.StageName+ '|  DR Org:'+ o1.DR_Operating_Unit__c );
    System.assertEquals('Draft',o1.Request_Status__c);
    
    List <Opportunity> oppList = [SELECT DR_Operating_Unit__c  FROM Opportunity where ID =  :o1.Id  ];  
    for ( Opportunity opp :oppList)
    {
        System.assertEquals('9999',opp.DR_Operating_Unit__c);
    }
    
    // formula field: will fail ...  System.assertEquals('485',o1.DR_Operating_Unit__c);
    
    Blob picture = Blob.valueOf('12345');
    Attachment a1 = new Attachment (ParentId = o1.Id,Body = picture,ContentType = 'text',Name = 'attach1.txt');
    Attachment a2 = new Attachment (ParentId = o1.Id,Body = picture,ContentType = 'text',Name = 'attach2.txt');
    insert a1; 
    insert a2;
    System.debug('Attachemnt id: '+ a1.Id + ' '+ a1.Name);
    System.debug('Attachemnt id: '+ a1.Id + ' '+ a1.Name);
    //Attachment[] lstAt = new List<Attachment>{a1,a2};
    //insert lstAt;
    o1.Request_Status__c = 'Approved'; 
    newAcc.Org__c='VESA';
    update o1;
       
    
  }


  static testMethod void LCUnitTest2()
  {
    Account newAcc = new Account();
    newAcc.name='test Account 2';
    newAcc.Org__c='VESA';
    newAcc.SBU__c='Transportation';
    newAcc.Customer_Category__c='Automotive Seating';
    Id RecordTypeIdaccount = Schema.SObjectType.Account.getRecordTypeInfosByName().get('EMEA Customer').getRecordTypeId();
    newAcc.RecordTypeId= RecordTypeIdaccount;
    insert newAcc;
    System.assertEquals('VESA',newAcc.Org__c);
    
    Opportunity o1=new Opportunity(); 
    o1.Name = 'Test Opp3';
    List <User> user_list = [SELECT Id  FROM User where Username like 'velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    System.debug('Acc name: ' + newAcc.name);
       
    o1.accountid= newAcc.Id;
    o1.closeDate= system.today(); 
    o1.Request_Status__c= 'Draft';    
    o1.StageName='Qualifying';
    o1.Type='New Business';
    o1.Amount=1;
    o1.Probability=40;
    Id RecordTypeIdOpp = Schema.SObjectType.Opportunity.getRecordTypeInfosByName().get('C-EMEA Sales Opportunity').getRecordTypeId();
    o1.RecordTypeId= RecordTypeIdOpp;
    insert o1;

    System.debug('Opp:'+ o1.Name+' | '+o1.StageName+ '|  DR Org:'+ o1.DR_Operating_Unit__c );
    System.assertEquals('Draft',o1.Request_Status__c);
    
    List <Opportunity> oppList = [SELECT DR_Operating_Unit__c  FROM Opportunity where ID =  :o1.Id  ];  
    for ( Opportunity opp :oppList)
    {
        System.assertEquals('9999',opp.DR_Operating_Unit__c);
    }
    
    // formula field: will fail ...  System.assertEquals('485',o1.DR_Operating_Unit__c);
    
    Blob picture = Blob.valueOf('12345');
    Attachment a1 = new Attachment (ParentId = o1.Id,Body = picture,ContentType = 'text',Name = 'attach1.txt');
    Attachment a2 = new Attachment (ParentId = o1.Id,Body = picture,ContentType = 'text',Name = 'attach2.txt');
    insert a1; 
    insert a2;
    System.debug('Attachemnt id: '+ a1.Id + ' '+ a1.Name);
    System.debug('Attachemnt id: '+ a1.Id + ' '+ a1.Name);
    //Attachment[] lstAt = new List<Attachment>{a1,a2};
    //insert lstAt;
    o1.Request_Status__c = 'Approved'; 
    update o1;
    newAcc.Org__c='VUSA';
    update o1;
       
    
  } 
  
  static testMethod void testCloneOpp()  {
  	
  	Account newAcc = new Account();
    newAcc.name='test Account 2';
    newAcc.Org__c='VESA';
    newAcc.SBU__c='Transportation';
    newAcc.Customer_Category__c='Automotive Seating';
    Id RecordTypeIdaccount = Schema.SObjectType.Account.getRecordTypeInfosByName().get('EMEA Customer').getRecordTypeId();
    newAcc.RecordTypeId= RecordTypeIdaccount;
    insert newAcc;
    
    Opportunity o1=new Opportunity(); 
    o1.Name = 'Test Opp3';
    List <User> user_list = [SELECT Id  FROM User where Username like 'velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    System.debug('Acc name: ' + newAcc.name);
       
    o1.accountid= newAcc.Id;
    o1.closeDate= system.today(); 
    o1.Request_Status__c= 'Draft';    
    o1.StageName='Qualifying';
    o1.Type='New Business';
    o1.Amount=1;
    o1.Probability=40;
    Id RecordTypeIdOpp = Schema.SObjectType.Opportunity.getRecordTypeInfosByName().get('C-EMEA Sales Opportunity').getRecordTypeId();
    o1.RecordTypeId= RecordTypeIdOpp;
    insert o1;
    
    
    String oldId= o1.Id;
    String Newname= o1.Name; 
    
     //clone1 = new CloneOpportunity();
    String ret= CloneOpportunity.getCloneOpp( oldId,  NewName);
    o1.Name = 'Test Cloned Child';
  	CloneOpportunity.getCloneOpp(ret, o1.Name+' clone');
  
  }
  
}