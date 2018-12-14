trigger Check_Opportunity on Opportunity (after insert, after update) {
//*********************************************************************************************//
//* Trigger Name: Check_Opportunity Trigger *//
//* Description : Check the opportunity status and send email to approvers *//
//* Creation Date: 12-Feb-2016 *//
//* Owner : Salvador Alcaide *//
//* History Version *//
//* --------------- *//
//* Date Version User Description *//
//*-------------------------------------------------------------------------------------------*//
//* 12-Feb-2016 1.0 Salcaide Initial Version *//
//* 30-Mar-2016 1.0 Salcaide get the approvers list *//
//*  09-Feb-2018 1.0 Rfontcuberta. Added functions and changed execution logic  adding doit conditions to whole code 
//*********************************************************************************************// 
    
    public static String emailMsg(Opportunity Oppo )
    {
        String msg='';
        msg = '<b>Opportunity</b>: ' + URL.getSalesforceBaseUrl().toExternalForm() +'/';
        msg+= Oppo.Id + '<br/><br/>Account Name: ' + Oppo.Account_Name__c + '<br/>';
        msg+= 'Opportunity Type: ' + Oppo.Opportunity_Type__c + '<br/>';
        return msg;
        
    }
    public List<String> emailMsgSetRecipeints(Opportunity Oppo)
    {
     List<String> toAddresses = new List<String>();
             //Populate the addresses list
            //30-Mar-2016 begin
            //First find the process instance
            List <ProcessInstance> pro_insts = [SELECT Id From ProcessInstance Where TargetObjectId = :Oppo.Id];            
            for (ProcessInstance v_pro_inst : pro_insts)
            {
              //msg = msg + 'processInstance.ID: ' + v_pro_inst.Id + '<br/>';
              //Now find the approvers of process instance
              List <ProcessInstanceWorkitem> proinst_items = [Select ActorId From ProcessInstanceWorkitem Where ProcessInstanceId = :v_pro_inst.Id];
              for (ProcessInstanceWorkitem v_proinst_item : proinst_items)
              {
                 //msg = msg + 'ProcessInstanceWorkitem.ActorId: ' + v_proinst_item.ActorId + '<br/>';
                 //Now find the email of approvers
                 List <User> Users = [SELECT Id, email, Username FROM User where id = :v_proinst_item.ActorId];
                 for (User v_user : Users)
                 {
                   toAddresses.add(v_user.email);
                 }
                 
              }
           }
           //if  (toAddresses.isEmpty()) {
               toAddresses.add('rfontcuberta@velcro.com');
           // }
           return toAddresses;
       }
    
    // Temporary variables to work
    String subject; //String variable to have the subject of email
    String msg; //String variable to have the message of email
    Boolean doit;
    // get this for all opportunities updated
    for(Opportunity Oppo : Trigger.new)
    {        
        //
        doit = false;
        // If we are inserting a record and Request Status is Approved
        If (Trigger.IsInsert)
        {
           doit = (Oppo.Request_Status__c == 'Approved');  
        }
        //If we are updating a record 
        If (Trigger.IsUpdate) 
        {
          // If Request status of opportunity is changed and new status is Approved
          doit = ((Oppo.Request_Status__c != trigger.oldMap.get(Oppo.Id).Request_Status__c) && (Oppo.Request_Status__c == 'Approved'));
        }
        if (Oppo.DR_Operating_Unit__c != '485')
        {
          doit = false;
        }
        System.debug('doit or not? :' + doit);
        
        if (doit)   // 09-02-2018. We will not execute code if we finally don't send an email.
        {
            
        
        //Build and subject and message
        subject = 'Opportunity approved: ' + Oppo.Opportunity_Code__c + '!';
        msg=emailMsg(Oppo);
        //Create the email to send
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                        
        //populate the subject
        mail.setSubject( subject );
        // add recipeints
        mail.setToAddresses(emailMsgSetRecipeints(Oppo));
        
        //Find the Opportunity list of attachments 
        List<Attachment> attach = [Select Name, Body, ContentType
                                           From  Attachment 
                                           Where IsDeleted = FALSE And ParentId = :Oppo.Id];
            //Check If opportunity has attachments
        if (!attach.isEmpty()){
                 //Create the list of attachments for email
                 List<Messaging.Emailfileattachment> fileAttachments = new List<Messaging.Emailfileattachment>();
                 //Get each attachment of the list
                 for (Attachment v_attach : attach)
                 {
                     //Create a instance of attachment
                     Messaging.Emailfileattachment efa = new Messaging.Emailfileattachment();
                     //Set the fileName and the file into attachment
                     efa.setFileName(v_attach.Name);
                     efa.setBody(v_attach.Body);
                     //Set the attachment to attachment list
                     fileAttachments.add(efa);
                  
                }
                 //include the Files to attach to email if we got some.
                 if (!fileAttachments.isEmpty()) {
                    mail.setFileAttachments(fileAttachments);
                 }
            }
            
            else
            {    //if opportunity has not attachment, indicate into email
                 msg += 'Opportunity without attachments';
            }
            //add the body to email
            mail.setHtmlBody(msg); //email.setPlainTextBody(msg);
                                              
            // Sends the email
            Messaging.SendEmailResult [] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        }
    }
}