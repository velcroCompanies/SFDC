<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Set_Belgium_Contact_language_to_Dutch</fullName>
        <description>Set belgium contact language to dutch based on adress rules</description>
        <field>Contact_language__c</field>
        <literalValue>Dutch</literalValue>
        <name>Set Belgium Contact language to Dutch</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Belgium_contact_language_to_French</fullName>
        <description>Sets belgiums contact language to french based on ZIP codes</description>
        <field>Contact_language__c</field>
        <literalValue>French</literalValue>
        <name>Set Belgium contact language to French</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Set Belgium Contact language to Dutch</fullName>
        <actions>
            <name>Set_Belgium_Contact_language_to_Dutch</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1  AND ((2 AND 3)  OR  (4 AND 5))  AND 6</booleanFilter>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>greaterOrEqual</operation>
            <value>1500</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>lessThan</operation>
            <value>4000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>greaterOrEqual</operation>
            <value>8000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>lessThan</operation>
            <value>10000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingCountry</field>
            <operation>equals</operation>
            <value>Belgium</value>
        </criteriaItems>
        <description>Sets Language to Dutch based on predefined rules.
If zip code : 1500-3999 OR 8000-9999  Set language of contact to Dutch.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Set Belgium Contact language to French</fullName>
        <actions>
            <name>Set_Belgium_contact_language_to_French</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1  AND ((2 AND 3)  OR  (4 AND 5))  AND 6</booleanFilter>
        <criteriaItems>
            <field>User.Region__c</field>
            <operation>equals</operation>
            <value>EMEA</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>greaterOrEqual</operation>
            <value>1000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>lessThan</operation>
            <value>1500</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>greaterOrEqual</operation>
            <value>4000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingPostalCode</field>
            <operation>lessThan</operation>
            <value>8000</value>
        </criteriaItems>
        <criteriaItems>
            <field>Contact.MailingCountry</field>
            <operation>equals</operation>
            <value>Belgium</value>
        </criteriaItems>
        <description>Sets Language to Franch based on predefined rules.
If zip code : 1000-1499 OR 4000-7999  Set language of contact to French.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
