<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Notify_KAM</fullName>
        <ccEmails>jhowells@velcro.com</ccEmails>
        <description>Notify KAM</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Monthly_Reports/Received</template>
    </alerts>
    <fieldUpdates>
        <fullName>Back_to_Draft</fullName>
        <field>Status__c</field>
        <literalValue>Draft</literalValue>
        <name>Back to Draft</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Received</fullName>
        <field>Status__c</field>
        <literalValue>Received</literalValue>
        <name>Received</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
</Workflow>
