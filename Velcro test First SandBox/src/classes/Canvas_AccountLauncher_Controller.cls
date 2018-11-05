//create json content to pass to Canvas application 

public with sharing class Canvas_AccountLauncher_Controller {

    public Account m_pAccount {get; set;}
    
    public User m_pUser {get; set;}
    
    public String jsonOutput {get; set;} 

    public Canvas_AccountLauncher_Controller(ApexPages.StandardController stdController){       

        //get the current account details
        this.m_pAccount = [Select a.Id, a.Name, a.AccountNumber, a.Oracle_Account_Id__c 
                        From Account a
                        WHERE a.Id=:((Account)stdController.getRecord()).Id];
                        
        //get the user Oracle Id
        this.m_pUser = [SELECT Id, Name, Oracle_User_ID__c FROM User WHERE Id=:UserInfo.getUserId()];
                        
        //prepare JSON string representation
        JSONGenerator pGenerator = JSON.createGenerator(true);
        pGenerator.writeStartObject();
        
        pGenerator.writeFieldName('SFAccount');
        pGenerator.writeObject(m_pAccount);
        
        pGenerator.writeFieldName('SFUser');
        pGenerator.writeObject(m_pUser);
        
        pGenerator.writeEndObject();
        
        
        
        //set JSON output
        this.jsonOutput = pGenerator.getAsString();
    }

}