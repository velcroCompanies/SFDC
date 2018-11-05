trigger Check_Account_blank_values on Account (before update) {    
//*********************************************************************************************//
//* Trigger Name: Check_Account_blank_values *//
//* Description : Check for opportunity values to be updated and avoid updating if they are null  *//
//* Creation Date: 25-April-2018 *//
//*-------------------------------------------------------------------------------------------*//
//* History:                                        *//
//*********************************************************************************************// 

	public static Boolean runningInASandbox() {
  		return [SELECT IsSandbox FROM Organization LIMIT 1].IsSandbox;
	}

    Account[] accounts = new List<Account>();
    
    
    // UserRole userRole = [SELECT Id FROM UserRole WHERE Name='Executive' LIMIT 1 ];
    
    UserRole userRole = [SELECT Id FROM UserRole WHERE Name='Velcro Americas Oracle' LIMIT 1];  
    if (userRole!=null) {  // if role exists 
    
       // trigger executes only for specidifed users in sync role or in a test run
        if(userRole.Id != UserInfo.getUserRoleId() && !Test.isRunningTest() ) return; 
        
    
        // loop through all accounts that are being updated or added
        for(Integer i = 0; i < Trigger.new.size(); i++){ 
        // if updating a record...
        if(Trigger.isUpdate)  {
            // if new data is blank, keep old values.
            if(Trigger.new[i].Phone == null) Trigger.new[i].Phone=Trigger.old[i].Phone;
            if(Trigger.new[i].Fax == null) Trigger.new[i].Fax=Trigger.old[i].Fax;
            if(Trigger.new[i].Website == null) Trigger.new[i].Website=Trigger.old[i].Website;
             
            }
        if (Trigger.isInsert)   {
           
          	}
       	if (runningInASandbox()) {
            	Trigger.new[i].Market__c= 'a0B4C000001MVaa';
            	Trigger.new[i].Category__c='a0D4C000000Jufe';
         	}
             
    	}  
	}
}
