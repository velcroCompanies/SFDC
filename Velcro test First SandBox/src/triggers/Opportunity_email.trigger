trigger Opportunity_email on Opportunity (before insert, before update) {
   //*********************************************************************************************//
   //* Trigger Name: Opportunity_email Trigger                                                   *//
   //* Description : Get the EmailToSalesforce email address of owner to download then in Oracle *//
   //* Creation Date: 29-Jan-2016                                                                *//
   //* Owner        : Salvador Alcaide                                                           *//
   //* History Version                                                                           *//
   //* ---------------                                                                           *//
   //* Date           Version         User             Description                               *//
   //*-------------------------------------------------------------------------------------------*//
   //* 29-Jan-2016    1.0             Salcaide         Initial Version                           *//
   //*********************************************************************************************//   
   // Temporary variables to work
   String s_temp; // String variable to get the EmailToSalesforce of current owner
   String s_temp2;  // String Variable to find the first separator "," in s_temp and discart from this position to end
   String s_temp3;    // String Variable to find the last separator "=" in s_temp2 and get from this position to end
   // get this for all opportunities inserted or updated   
   for(Opportunity Oppo : Trigger.new)
   {  
      Oppo.Internal_email__c = '';
      // find the EmailDomainName of current owner of opportunity and convert to string
      s_temp = String.valueOf([Select
                              EmailDomainName
                          From 
                              EmailServicesAddress 
                          Where 
                              Function.FunctionName = 'EmailToSalesforce' And 
                              RunAsUserId= :Oppo.OwnerId LIMIT 1]);
      // when s_temp is '()' , the owner has not defined the EmailDomainName in his setup, or is disabled the functionality
      Integer n = Integer.valueof(s_temp.compareTo('()'));
      // if user has email activated, set the value of custom field
      if (n!=0) {
        s_temp2 = s_temp.substringBefore(',');
        s_temp3 = s_temp2.substringAfterLast('=');
        Oppo.Internal_email__c = 'emailtosalesforce@' + s_temp3;
      }
   }
}