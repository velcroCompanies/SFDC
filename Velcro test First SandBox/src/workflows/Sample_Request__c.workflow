<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Approval_request_Samples_Canada</fullName>
        <description>Approval request Samples Canada</description>
        <protected>false</protected>
        <recipients>
            <recipient>rfontcuberta@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Development_Requests/Canada_Samples_Submited</template>
    </alerts>
    <alerts>
        <fullName>Canada_Samples</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>Canada  Samples submitted</description>
        <protected>false</protected>
        <recipients>
            <recipient>EMEA_Transportation_SBU_Manage</recipient>
            <type>roleSubordinates</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Development_Requests/Canada_Samples_Submited</template>
    </alerts>
    <alerts>
        <fullName>Canada_Samples_Approved</fullName>
        <ccEmails>sferron@velcro.com</ccEmails>
        <ccEmails>jobiols@velcro.com</ccEmails>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>Canada Samples Approved</description>
        <protected>false</protected>
        <recipients>
            <recipient>EMEA_Transportation_SBU_Manage</recipient>
            <type>roleSubordinates</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Development_Requests/Canada_Samples_Approved</template>
    </alerts>
    <alerts>
        <fullName>Canada_Samples_rejected</fullName>
        <ccEmails>sferron@velcro.com</ccEmails>
        <ccEmails>dayats@velcro.com</ccEmails>
        <ccEmails>jobiols@velcro.com</ccEmails>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>Canada Samples rejected</description>
        <protected>false</protected>
        <recipients>
            <recipient>EMEA_Transportation_SBU_Manage</recipient>
            <type>roleSubordinates</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Development_Requests/Canada_Samples_Rejected</template>
    </alerts>
    <alerts>
        <fullName>EMEA_sample_request_DRAFT_reminder</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>EMEA sample request DRAFT reminder</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <recipients>
            <field>Assigned__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Samples_Requests/EMEA_Samples_request_status_draft_reminder</template>
    </alerts>
    <alerts>
        <fullName>Sample_Request_status_changed</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>Sample Request status changed</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <recipients>
            <field>Assigned__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Samples_Requests/EMEA_Samples_request_status_update</template>
    </alerts>
    <fieldUpdates>
        <fullName>Canada_Samples_Recalled</fullName>
        <field>Status__c</field>
        <literalValue>Draft</literalValue>
        <name>Canada Samples Recalled</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Sample_request_approved</fullName>
        <field>Status__c</field>
        <literalValue>Approved</literalValue>
        <name>Sample request approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Sample_request_submitted</fullName>
        <field>Status__c</field>
        <literalValue>Submitted</literalValue>
        <name>Sample request submitted</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Samples_request_rejected</fullName>
        <field>Status__c</field>
        <literalValue>Rejected</literalValue>
        <name>Samples request rejected</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_recordtype_to_Canada</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Canada_Sample_Request</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Set recordtype to Canada</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Change record type to Canada</fullName>
        <actions>
            <name>Set_recordtype_to_Canada</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Sample_Request__c.Request_to_Country__c</field>
            <operation>equals</operation>
            <value>Canada</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <description>Change Sample request record type to Canada Samples recordtype</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>EMEA Samples request DRAFT reminder</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Sample_Request__c.Status__c</field>
            <operation>equals</operation>
            <value>Draft</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>EMEA_sample_request_DRAFT_reminder</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Sample_Request__c.CreatedDate</offsetFromField>
            <timeLength>2</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Sample Requests status changed</fullName>
        <actions>
            <name>Sample_Request_status_changed</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Sample Requests status changed</description>
        <formula>TEXT(PRIORVALUE(Status__c))&lt;&gt; TEXT(Status__c )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
