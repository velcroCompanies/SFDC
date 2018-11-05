@isTest 
Private Class UnitTest_Opportunity_email
{ 

  static testMethod void LCUnitTest()
  {
    Opportunity o1=new Opportunity(); 
    o1.Name='Test Opp1'; 
    List <User> user_list = [SELECT Id From User Where name = 'Roger Fontcuberta'];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    o1.closeDate=date.today(); 
    o1.StageName='Draft';
    o1.Probability=70;
    insert o1; 
  } 

  static testMethod void LCUnitTest1()
  {
    Opportunity o1=new Opportunity(); 
    o1.Name='Test Opp2'; 
    List <User> user_list = [SELECT Id From User Where UserRole.Name = 'Product Development' LIMIT 1];  
    for (User user_rec : user_list)
    {
      o1.ownerid = user_rec.Id;    
    }
    o1.closeDate=date.today(); 
    o1.StageName='Draft';
    o1.Probability=70;
    insert o1; 
  } 

 }