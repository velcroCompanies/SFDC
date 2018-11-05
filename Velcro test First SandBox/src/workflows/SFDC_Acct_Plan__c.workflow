<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Alert_KAM_that_the_BPLan_was_reviewed_and_Approved</fullName>
        <ccEmails>jhowells@velcro.com</ccEmails>
        <description>Alert KAM that the BPLan was reviewed and Approved</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Business_Plan_Template/KAM_Notified</template>
    </alerts>
    <fieldUpdates>
        <fullName>Move_to_draft</fullName>
        <field>Plan_Status__c</field>
        <literalValue>Draft</literalValue>
        <name>Move to draft</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Received</fullName>
        <field>Plan_Status__c</field>
        <literalValue>Received</literalValue>
        <name>Received</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Status</fullName>
        <field>Plan_Status__c</field>
        <literalValue>Draft</literalValue>
        <name>Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
</Workflow>
