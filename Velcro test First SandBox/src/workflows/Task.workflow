<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>EMEA_alert_when_task_is_completed</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>EMEA alert when task is completed</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>EMEA_Sales/EMEA_task_completed</template>
    </alerts>
    <rules>
        <fullName>EMEA alert when task completed</fullName>
        <actions>
            <name>EMEA_alert_when_task_is_completed</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Task.Status</field>
            <operation>equals</operation>
            <value>Completed</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <criteriaItems>
            <field>Task.Alert_when_completed__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <description>Sends an alert when the &quot;Alert when completd&quot; checkbox is set to true to the task creator.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
