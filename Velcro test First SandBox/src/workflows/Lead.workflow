<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Americas_Web_Lead_Alert_ASsigned</fullName>
        <description>Americas Web Lead Alert - ASsigned</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>sfadmin@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/New_Lead_Assigned</template>
    </alerts>
    <alerts>
        <fullName>New_Australia_Lead_from_non_Aus_site</fullName>
        <ccEmails>rfontcuberta@velcro.com</ccEmails>
        <description>New Australia Lead from non-Aus site</description>
        <protected>false</protected>
        <recipients>
            <recipient>AUS_Customer_Service_Officer</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>AUS_Business_Development_Manager</recipient>
            <type>roleSubordinates</type>
        </recipients>
        <recipients>
            <recipient>xpoynton@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>Sales_Email_Templates/AUS_New_lead_assigned</template>
    </alerts>
    <alerts>
        <fullName>web_leads_CANADA_new_lead_submitted</fullName>
        <description>web leads: CANADA - new lead submitted</description>
        <protected>false</protected>
        <recipients>
            <recipient>smccollum@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/New_Lead_Assigned</template>
    </alerts>
    <alerts>
        <fullName>web_leads_FRANCE_new_lead_submitted</fullName>
        <description>web leads: FRANCE- new lead submitted</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/EMEA_New_lead_assigned</template>
    </alerts>
    <alerts>
        <fullName>web_leads_GERMANY_new_lead_submitted</fullName>
        <ccEmails>RFONTCUBERTA@velcro.com</ccEmails>
        <description>web leads: GERMANY- new lead submitted</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/New_Lead_Assigned</template>
    </alerts>
    <fieldUpdates>
        <fullName>Amer_Lead</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Americas</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Amer Lead</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>EMEA_Update</fullName>
        <field>RecordTypeId</field>
        <lookupValue>EMEA_Lead</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>EMEA Update</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Industrial</fullName>
        <description>Maps to SBU</description>
        <field>SBU__c</field>
        <literalValue>Industrial</literalValue>
        <name>SBU Update Industrial</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>LATAM_Lead</fullName>
        <field>RecordTypeId</field>
        <lookupValue>LATAM_Lead</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>LATAM Lead</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Medical_SBU_Update</fullName>
        <field>SBU__c</field>
        <literalValue>Medical</literalValue>
        <name>SBU Update Medical</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>SBU_Update_Construction</fullName>
        <description>Maps Industry to SBU</description>
        <field>SBU__c</field>
        <literalValue>Construction</literalValue>
        <name>SBU Update Construction</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>SBU_Update_Consumer</fullName>
        <field>SBU__c</field>
        <literalValue>Consumer</literalValue>
        <name>SBU Update Consumer</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>SBU_Update_PC</fullName>
        <description>Maps industry to SBU</description>
        <field>SBU__c</field>
        <literalValue>Personal Care</literalValue>
        <name>SBU Update PC</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>SBU_Update_Packaging</fullName>
        <description>map industry to SBU</description>
        <field>SBU__c</field>
        <literalValue>Packaging</literalValue>
        <name>SBU Update Packaging</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>SBU_Update_Transportation</fullName>
        <description>maps industry to sbu</description>
        <field>SBU__c</field>
        <literalValue>Transportation</literalValue>
        <name>SBU Update Transportation</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Web_Source_Update</fullName>
        <field>LeadSource</field>
        <literalValue>Web</literalValue>
        <name>Web Source Update</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>AMER Record Type</fullName>
        <actions>
            <name>Amer_Lead</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.Owner_Region__c</field>
            <operation>contains</operation>
            <value>AMER</value>
        </criteriaItems>
        <description>Update record type when assigned to AMER user</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Australia leads alert</fullName>
        <actions>
            <name>New_Australia_Lead_from_non_Aus_site</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2</booleanFilter>
        <criteriaItems>
            <field>Lead.OwnerId</field>
            <operation>equals</operation>
            <value>Australia &amp; NZ Leads</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>notEqual</operation>
            <value>W2Lau Contact Us</value>
        </criteriaItems>
        <description>Send mail when a lead for AUS is created used non-AUS Webform</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Canada Alert new web lead</fullName>
        <actions>
            <name>web_leads_CANADA_new_lead_submitted</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <booleanFilter>1</booleanFilter>
        <criteriaItems>
            <field>Lead.OwnerId</field>
            <operation>equals</operation>
            <value>Canadian Web Leads</value>
        </criteriaItems>
        <description>Sens alert when new lead is created for Canada thorugh the website</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>EMEA - France Alert new web lead</fullName>
        <actions>
            <name>web_leads_FRANCE_new_lead_submitted</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <booleanFilter>1</booleanFilter>
        <criteriaItems>
            <field>Lead.OwnerId</field>
            <operation>equals</operation>
            <value>France Web Leads</value>
        </criteriaItems>
        <description>Sens alert when new lead is created for France thorugh the website</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>EMEA - Germany Alert new web lead</fullName>
        <actions>
            <name>web_leads_GERMANY_new_lead_submitted</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <booleanFilter>1</booleanFilter>
        <criteriaItems>
            <field>Lead.OwnerId</field>
            <operation>equals</operation>
            <value>Germany Web Leads</value>
        </criteriaItems>
        <description>Sens alert when new lead is created for Germany  through the website</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>EMEA Record Type</fullName>
        <actions>
            <name>EMEA_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.Owner_Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <description>Update record type when assigned to EMEA user</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU</fullName>
        <actions>
            <name>Industrial</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Apparel,Electronics,Furnishing,Government,Industrial,Specialty,Distributors</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Construction</fullName>
        <actions>
            <name>SBU_Update_Construction</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Construction</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Consumer</fullName>
        <actions>
            <name>SBU_Update_Consumer</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Retailers</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Medical</fullName>
        <actions>
            <name>Medical_SBU_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Medical</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Packaging</fullName>
        <actions>
            <name>SBU_Update_Packaging</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Food &amp; Beverage,Packaging</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Personal Care</fullName>
        <actions>
            <name>SBU_Update_PC</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Personal Care</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Industry to SBU - Transportation</fullName>
        <actions>
            <name>SBU_Update_Transportation</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.LeadSource</field>
            <operation>equals</operation>
            <value>Web</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.Industry</field>
            <operation>equals</operation>
            <value>Transportation</value>
        </criteriaItems>
        <description>Maps Industry from Web Lead form to SBU</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>LATAM Record Type</fullName>
        <actions>
            <name>LATAM_Lead</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.Owner_Region__c</field>
            <operation>contains</operation>
            <value>LATAM</value>
        </criteriaItems>
        <description>Update record type when assigned to LATAM user</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Lead Assigned NOT SiteCore</fullName>
        <actions>
            <name>Americas_Web_Lead_Alert_ASsigned</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.CreatedById</field>
            <operation>equals</operation>
            <value>SitecoreApp,Beth Evarts</value>
        </criteriaItems>
        <criteriaItems>
            <field>Lead.OwnerId</field>
            <operation>notEqual</operation>
            <value>Americas Web Leads,SitecoreApp,James Howells</value>
        </criteriaItems>
        <description>Email Lead Owner when it is changed from SiteCore</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Web Lead Source Update</fullName>
        <actions>
            <name>Web_Source_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Lead.CreatedById</field>
            <operation>equals</operation>
            <value>SitecoreApp</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
