<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Account_Owner_New_Oracle_Account_Created</fullName>
        <description>Account Owner New Oracle Account Created</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>Sales_Email_Templates/newAccountNotification</template>
    </alerts>
    <alerts>
        <fullName>Approved</fullName>
        <description>Approved</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/APPROVED_NEW_ACCOUNT_REQUEST</template>
    </alerts>
    <alerts>
        <fullName>Approved_by_Credit_and_Pricing</fullName>
        <description>Approved by Credit and Pricing</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>fantunes@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/AcceptedCreditReviews</template>
    </alerts>
    <alerts>
        <fullName>Final_Approval</fullName>
        <description>Final Approval</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>Velcro_Pricing_Americas</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/APPROVED_NEW_ACCOUNT_REQUEST</template>
    </alerts>
    <alerts>
        <fullName>New_Account_Set_Up_CSR</fullName>
        <description>New Account Set Up CSR</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>apatterson@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>asteiniger@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>fantunes@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/New_Account_Request2</template>
    </alerts>
    <alerts>
        <fullName>Rejected</fullName>
        <description>Rejected</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/REJECTED_NEW_ACCOUNT_REQUEST</template>
    </alerts>
    <alerts>
        <fullName>Rejected_alert</fullName>
        <description>Rejected alert</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>North_America_Executive</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/RejectedCreditReviews</template>
    </alerts>
    <alerts>
        <fullName>recalled_new_account_request</fullName>
        <description>recalled new account request</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>North_America_Executive</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/RECALLED_NEW_ACCOUNT_REQUEST</template>
    </alerts>
    <alerts>
        <fullName>recalled_new_account_request2</fullName>
        <description>recalled new account request</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>North_America_Executive</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>New_Account_Selling_Opp/RecalledCreditReviews</template>
    </alerts>
    <alerts>
        <fullName>sendNotificationOfAccountSetUp</fullName>
        <description>sendNotificationOfAccountSetUp</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/newAccountNotification</template>
    </alerts>
    <fieldUpdates>
        <fullName>Approved_by_Sales_Manager</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Approved By Sales Manager</literalValue>
        <name>Approved by Sales Manager</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Clear_New_Account_Status</fullName>
        <field>Direct_Sales_Status__c</field>
        <name>Clear New Account Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Credit_Status</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Approved By Sales And Credit</literalValue>
        <name>Credit Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Director_Approved</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Approved by Sales Director</literalValue>
        <name>Director Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>EMEA_Geo_Region</fullName>
        <description>Sets Geo Region field to EMEA</description>
        <field>Geo_Region__c</field>
        <literalValue>EMEA</literalValue>
        <name>EMEA Geo Region</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>EMEA_Set_Active_account</fullName>
        <description>Sets account Active by changing Inactive to false.</description>
        <field>Inactive__c</field>
        <literalValue>0</literalValue>
        <name>EMEA Set Active account</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>EMEA_Set_Inactive_account</fullName>
        <description>Sets Inactive to true</description>
        <field>Inactive__c</field>
        <literalValue>1</literalValue>
        <name>EMEA Set Inactive account</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>EMEA_Set_Territory</fullName>
        <description>Sets users Primary Territory value to the account</description>
        <field>EMEA_Territory__c</field>
        <formula>TEXT($User.Primary_Territory__c)</formula>
        <name>EMEA Set Territory</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>REJECT_CREDIT_STATUS</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Rejected By Credit</literalValue>
        <name>REJECT CREDIT STATUS</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Recall_Status</fullName>
        <field>Direct_Sales_Status__c</field>
        <name>Recall Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Record_Type_to_VAUS</fullName>
        <field>RecordTypeId</field>
        <lookupValue>APAC_Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Record Type to VAUS</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Rejected_New_Account</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Rejected By Sales</literalValue>
        <name>Rejected: New Account</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Account_to_Active_EMEA</fullName>
        <description>Sets account report type to Active if Oracle has been update with active status</description>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Set Account to Active EMEA</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Account_to_Inactive_EMEA</fullName>
        <description>Sets account recordtype to Inactive Acccount EMEA</description>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Inactive_Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Set Account to Inactive EMEA</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Submit</fullName>
        <field>Direct_Sales_Status__c</field>
        <literalValue>Submitted</literalValue>
        <name>Submit</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_EMEA_Account_Recordtype</fullName>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update EMEA Account Recordtype</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>setRecordTypeToCustomer</fullName>
        <description>sets the account record type to customer.</description>
        <field>RecordTypeId</field>
        <lookupValue>Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>setRecordTypeToCustomer</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>setToProspect</fullName>
        <description>sets the account type to prospect.</description>
        <field>Type</field>
        <literalValue>Prospect</literalValue>
        <name>setToProspect</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>setTypeToCustomer</fullName>
        <description>Sets the Account Type to Customer</description>
        <field>Type</field>
        <literalValue>Customer</literalValue>
        <name>setTypeToCustomer</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>updateRecTypeNonCustomer</fullName>
        <description>sets the record type to non-customer</description>
        <field>RecordTypeId</field>
        <lookupValue>Non_Customer</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>updateRecTypeNonCustomer</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Convert to EMEA Customer</fullName>
        <actions>
            <name>Update_EMEA_Account_Recordtype</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Converts Account Record Type to  Emea customer</description>
        <formula>(Owner.Region__c = &quot;EMEA&quot; &amp;&amp;
RecordType.Name= &quot;Customer&quot; &amp;&amp;
 ISPICKVAL(Type,&quot;EMEA Customer&quot;) 
)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>EMEA Geo Region</fullName>
        <actions>
            <name>EMEA_Geo_Region</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>EMEA_Set_Territory</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Sets Geo REgion to EMEA when prospects account is created</description>
        <formula>$User.Region__c = &apos;EMEA&apos;</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>LATAM Customer Convert</fullName>
        <active>true</active>
        <description>Converts Account Record Type to LATAM customer</description>
        <formula>(Owner.Region__c = &quot;LATAM&quot; &amp;&amp;
RecordType.Name= &quot;Customer&quot; &amp;&amp;
 ISPICKVAL(Type,&quot;LATAM Customer&quot;) 
)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>LATAM Non Customer Convert</fullName>
        <active>true</active>
        <description>Converts Account Record Type to LATAM Non customer</description>
        <formula>(Owner.Region__c = &quot;LATAM&quot; &amp;&amp;
RecordType.Name= &quot;Non Customer&quot; &amp;&amp;
 ISPICKVAL(Type,&quot;LATAM Non Customer&quot;) 
)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>LATAM accountSetUpInOracle</fullName>
        <actions>
            <name>Account_Owner_New_Oracle_Account_Created</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>LATAM</value>
        </criteriaItems>
        <description>Notifies account owner when an account is first set up in Oracle.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>LATAM setCustomerRecordType</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>LATAM Non-Customers</value>
        </criteriaItems>
        <description>If the Oracle ID is entered, set the account record type and type to customer.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>LATAM setNonCustomerRecordType</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>equals</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>LATAM Customers</value>
        </criteriaItems>
        <description>This rule is to handle the exception where a LATAM non-customer is set up as a customer. In this case, the record-type will be set back upon save.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Set Account to Active EMEA</fullName>
        <actions>
            <name>EMEA_Set_Active_account</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Set_Account_to_Active_EMEA</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>EMEA Inactive Customer</value>
        </criteriaItems>
        <criteriaItems>
            <field>Account.Oracle_Account_Status__c</field>
            <operation>equals</operation>
            <value>A,Active</value>
        </criteriaItems>
        <description>Sets accoutn to Active record type if it has been activated in Oracle</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Set Account to Inactive EMEA</fullName>
        <actions>
            <name>EMEA_Set_Inactive_account</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Set_Account_to_Inactive_EMEA</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>EMEA Non-Customer,EMEA Customer</value>
        </criteriaItems>
        <criteriaItems>
            <field>Account.Oracle_Account_Status__c</field>
            <operation>equals</operation>
            <value>I,Inactive</value>
        </criteriaItems>
        <description>Sets accoutn to Inactive record type if it has been inactivated in Oracle</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>VAUS</fullName>
        <actions>
            <name>Record_Type_to_VAUS</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Converts Account Record Type to APAC</description>
        <formula>(Owner.Region__c = &quot;APAC&quot; &amp;&amp;
 RecordTypeId = &quot;012A00000019jTF&quot;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>accountSetUpInOracle</fullName>
        <actions>
            <name>sendNotificationOfAccountSetUp</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Account.OwnerId</field>
            <operation>notEqual</operation>
            <value>Norbert Nieleck</value>
        </criteriaItems>
        <criteriaItems>
            <field>Account.Org__c</field>
            <operation>notContain</operation>
            <value>ALF</value>
        </criteriaItems>
        <description>Triggers when an account is first set up in Oracle.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>pastDueFollowUp</fullName>
        <actions>
            <name>Follow_up_On_Past_Due_Invoice</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.Account_Past_Due__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <description>creates a task for the account owner to followup on a past due account</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>set category</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Account.Name</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>setCustomerRecordType</fullName>
        <actions>
            <name>setRecordTypeToCustomer</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>setTypeToCustomer</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>Non-Customer</value>
        </criteriaItems>
        <description>If the Oracle ID is entered, set the account record type and type to customer.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>setNonCustomerRecordType</fullName>
        <actions>
            <name>setToProspect</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>updateRecTypeNonCustomer</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Account.AccountNumber</field>
            <operation>equals</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Account.RecordTypeId</field>
            <operation>equals</operation>
            <value>Customer</value>
        </criteriaItems>
        <description>This rule is to handle the exception where a non-customer is set up as a customer. In this case, the record-type will be set back upon save.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <tasks>
        <fullName>Follow_up_On_Past_Due_Invoice</fullName>
        <assignedToType>owner</assignedToType>
        <description>Account is past due, please follow-up.</description>
        <dueDateOffset>3</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Follow-up On Past Due Invoice</subject>
    </tasks>
</Workflow>
