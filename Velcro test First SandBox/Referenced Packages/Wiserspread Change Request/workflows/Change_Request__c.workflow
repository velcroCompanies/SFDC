<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Email_For_User_When_CR_Status_Is_Completed_Fixed</fullName>
        <description>Email For User When CR Status Is Completed/Fixed</description>
        <protected>false</protected>
        <recipients>
            <field>original_owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Change_request_folder/Email_when_CR_Status_is_Completed_Fixed</template>
    </alerts>
    <alerts>
        <fullName>Email_to_owner_when_CR_is_submitted</fullName>
        <description>Email to owner when CR is submitted</description>
        <protected>false</protected>
        <recipients>
            <field>original_owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Change_request_folder/On_submit_a_CR</template>
    </alerts>
</Workflow>
