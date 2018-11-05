<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>EMEA_Alert_Quote_10_days_after_creation</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>EMEA Alert Quote 10 days after creation</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>Quotes/EMEA_Quote_status_update_10days</template>
    </alerts>
    <alerts>
        <fullName>EMEA_Quote_Approved_Alert</fullName>
        <description>EMEA Quote Approved Alert</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Quotes/EMEA_Quote_Approved</template>
    </alerts>
    <alerts>
        <fullName>EMEA_Quote_Rejected_Alert</fullName>
        <description>EMEA Quote Rejected Alert</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Quotes/EMEA_Quote_Rejected</template>
    </alerts>
    <alerts>
        <fullName>EMEA_Quote_Submited_Alert</fullName>
        <description>EMEA Quote Submited Alert</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Quotes/EMEA_Quote_submitted</template>
    </alerts>
    <alerts>
        <fullName>New_Quote_Request</fullName>
        <ccEmails>Pricingamericas@velcro.com</ccEmails>
        <description>New Quote Request</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>sfadmin@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/Quote_Request</template>
    </alerts>
    <alerts>
        <fullName>New_Quote_RequestLATAM</fullName>
        <description>New Quote Request LATAM</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>alanramirez@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>dtrueba@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>jegarcia@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/Quote_Request</template>
    </alerts>
    <alerts>
        <fullName>Notify_Account_Owner_Quote_Ready</fullName>
        <description>Notify Account Owner Quote Ready</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <recipient>Customer Relations Specialist</recipient>
            <type>accountTeam</type>
        </recipients>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/Quote_Ready</template>
    </alerts>
    <alerts>
        <fullName>Quote_Rejected</fullName>
        <ccEmails>jhowells@velcro.com</ccEmails>
        <description>Quote Rejected</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/Quote_Rejected</template>
    </alerts>
    <alerts>
        <fullName>Quote_in_Draft_status_after_5_days</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>Quote in Draft status after 5 days</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <recipients>
            <type>creator</type>
        </recipients>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Quotes/EMEA_Quote_Draft_reminder</template>
    </alerts>
    <fieldUpdates>
        <fullName>Change_quote_record_type</fullName>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Quote</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Change quote record type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Date_Quote_Provided</fullName>
        <field>Quote_Provided_Date__c</field>
        <formula>NOW()</formula>
        <name>Date Quote Provided</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Quote_Approved</fullName>
        <field>Approved__c</field>
        <literalValue>1</literalValue>
        <name>Quote Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Quote_Expire_60</fullName>
        <description>Sets Expire date to +60 of Provided Date</description>
        <field>Quote_Expiration_Date__c</field>
        <formula>DATEVALUE(Quote_Provided_Date__c + 60)</formula>
        <name>Quote Expire 60</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Quote_Expire_Date</fullName>
        <description>Updates 60 +</description>
        <field>Quote_Expiration_Date__c</field>
        <formula>Quote_Provided_Date__c + 90</formula>
        <name>Quote Expire Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Quote_Request_Date_Time_Update</fullName>
        <field>Quote_Requested_Date__c</field>
        <formula>NOW()</formula>
        <name>Quote Request Date Time Update</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Status_Provided</fullName>
        <field>Status</field>
        <literalValue>Quote Provided</literalValue>
        <name>Status Provided</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Upate_Quote_REcordtype</fullName>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Quote_with_Approval</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Upate Quote REcordtype</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>updateQuoteToQuoteProvided</fullName>
        <description>updates the status of the quote to quote provided to when the owner is notified of the quote update.</description>
        <field>Status</field>
        <literalValue>Quote Provided</literalValue>
        <name>updateQuoteToQuoteProvided</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>updateQuoteToRequested</fullName>
        <description>updates the Quote Status to Quote Requested</description>
        <field>Status</field>
        <literalValue>Quote Requested</literalValue>
        <name>updateQuoteToRequested</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>EMEA Quote Rejected</fullName>
        <actions>
            <name>EMEA_Quote_Rejected_Alert</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>EMEA Quote check status 10 days</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Opportunity.Owner_Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>notEqual</operation>
            <value>Accepted,Denied,Expired</value>
        </criteriaItems>
        <description>Check the status of the quote 10 days after creation if not Accepted or rejected.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>EMEA_Alert_Quote_10_days_after_creation</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Quote.CreatedDate</offsetFromField>
            <timeLength>10</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Quote Draft reminder</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Draft</value>
        </criteriaItems>
        <description>Sends reminder to update status if Draft status is still set after 5 days.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <actions>
                <name>Quote_in_Draft_status_after_5_days</name>
                <type>Alert</type>
            </actions>
            <offsetFromField>Quote.CreatedDate</offsetFromField>
            <timeLength>5</timeLength>
            <workflowTimeTriggerUnit>Days</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>Quote Expiration Set 60</fullName>
        <actions>
            <name>Quote_Expire_60</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Quote_Provided_Date__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Updates Quote Expiration Date to 60 days from Provided date</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Quote change recortd type</fullName>
        <actions>
            <name>Upate_Quote_REcordtype</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Change recordtype of quote if it is not approved and user has &apos;Need Quote Approval&apos; permission assigned</description>
        <formula>AND  ( 
$Permission.Quote_Approval_needed,
BEGINS( RecordTypeId,&apos;012A0000001UaHo&apos;),
NOT(Approved__c)
)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Quote rejected</fullName>
        <actions>
            <name>Quote_Rejected</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Rejected</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>notContain</operation>
            <value>EMEA</value>
        </criteriaItems>
        <description>Send email to Quote creator and Opp owner when Quote status is Rejected</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>QuoteReadyNotification</fullName>
        <actions>
            <name>Notify_Account_Owner_Quote_Ready</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>updateQuoteToQuoteProvided</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 OR 2</booleanFilter>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Quote Ready</value>
        </criteriaItems>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Quote Provided</value>
        </criteriaItems>
        <description>notifies the account owner that a quote has been attached.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>SendQuoteRequestLATAM</fullName>
        <actions>
            <name>New_Quote_RequestLATAM</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Request Quote</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>LATAM</value>
        </criteriaItems>
        <description>sends a quote request to the pricing team LATAM</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>SendQuoteRequestUSA</fullName>
        <actions>
            <name>New_Quote_Request</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Status</field>
            <operation>equals</operation>
            <value>Request Quote</value>
        </criteriaItems>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>AMER</value>
        </criteriaItems>
        <description>sends a quote request to the pricing team in USA</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Update Quote Provided Date</fullName>
        <actions>
            <name>Date_Quote_Provided</name>
            <type>FieldUpdate</type>
        </actions>
        <actions>
            <name>Status_Provided</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>ISPICKVAL( Status , &quot;Quote Ready&quot;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update Quote Requested Date</fullName>
        <actions>
            <name>Quote_Request_Date_Time_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>ISPICKVAL(Status, &quot;Request Quote&quot;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update as Expired</fullName>
        <active>true</active>
        <criteriaItems>
            <field>Quote.Quote_Provided_Date__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Changes status to Expired</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <offsetFromField>Quote.ExpirationDate</offsetFromField>
            <timeLength>1</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
</Workflow>
