@isTest

Private Class UnitTest_Check_Opportunity {
 
  static testMethod void LCUnitTest()
  {
    Opportunity o1=new Opportunity(); 
    o1.Name='Test Opp1'; 
    List <User> user_list = [SELECT Id  FROM User where Email='rfontcuberta@velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    List <Account> account_list = [SELECT Id FROM Account where org__c = 'VESA' LIMIT 1];    
    for (Account account_rec : account_list)
    {
      o1.accountid = account_rec.Id;
    }    
    o1.closeDate=date.today(); 
    o1.Request_Status__c = 'Approved';    
    o1.StageName='Draft';
    o1.Probability=70;
    insert o1;  
  } 

  static testMethod void LCUnitTest2()
  {
    Opportunity o1=new Opportunity(); 
    o1.Name='Test Opp2'; 
    List <User> user_list = [SELECT Id  FROM User where Email='rfontcuberta@velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    List <Account> account_list = [SELECT Id FROM Account where org__c = 'VESA' LIMIT 1];    
    for (Account account_rec : account_list)
    {
      o1.accountid = account_rec.Id;
    }    
    o1.closeDate=date.today(); 
    o1.Request_Status__c = 'Approved';    
    o1.StageName='Draft';
    o1.Probability=70;
    insert o1;  
    Blob picture = Blob.valueOf('');
    Attachment a1 = new Attachment (ParentId = o1.id,Body = picture,ContentType = 'image/jpg',Name = 'VehiclePicture');
    Attachment a2 = new Attachment (ParentId = o1.id,Body = picture,ContentType = 'image/jpg',Name = 'VehiclePicture');
    Attachment[] lstAt = new List<Attachment>{a1,a2};
    insert lstAt;
  } 

  static testMethod void LCUnitTest3()
  {
    Opportunity o1=new Opportunity(); 
    o1.Name = 'Test Opp3';
    List <User> user_list = [SELECT Id  FROM User where Email='rfontcuberta@velcro.com'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    List <Account> account_list = [SELECT Id FROM Account where org__c = 'VESA' LIMIT 1];    
    for (Account account_rec : account_list)
    {
      o1.accountid = account_rec.Id;
    }    
    o1.closeDate=date.today(); 
    o1.Request_Status__c = 'Draft';    
    o1.StageName='Draft';
    o1.Probability=70;
    insert o1;  
  } 
}