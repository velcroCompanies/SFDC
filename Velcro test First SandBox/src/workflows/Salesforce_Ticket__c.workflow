<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Salesforce_Ticket_Email_Alert</fullName>
        <description>Salesforce Ticket Email Alert</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <recipients>
            <recipient>fantunes@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>Sales_Email_Templates/New_Salesforce_Ticket_Opened</template>
    </alerts>
    <fieldUpdates>
        <fullName>Status_Update</fullName>
        <description>Updates the ticket status to In Progress</description>
        <field>Ticket_Status__c</field>
        <name>Status Update</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>NextValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Salesforce Ticket Created</fullName>
        <actions>
            <name>Salesforce_Ticket_Email_Alert</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Status_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>New_Salesforce_Ticket</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2</booleanFilter>
        <criteriaItems>
            <field>Salesforce_Ticket__c.CreatedDate</field>
            <operation>equals</operation>
            <value>TODAY</value>
        </criteriaItems>
        <criteriaItems>
            <field>Salesforce_Ticket__c.Ticket_Owner_Region__c</field>
            <operation>equals</operation>
            <value>NAM,LATAM</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <tasks>
        <fullName>New_Salesforce_Ticket</fullName>
        <assignedTo>fantunes@velcro.com</assignedTo>
        <assignedToType>user</assignedToType>
        <dueDateOffset>2</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Salesforce_Ticket__c.CreatedDate</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>In Progress</status>
        <subject>New Salesforce Ticket</subject>
    </tasks>
</Workflow>
