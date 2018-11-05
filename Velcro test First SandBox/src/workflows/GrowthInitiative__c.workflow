<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Growth_Amount_Update</fullName>
        <field>Growth_Amount__c</field>
        <formula>CASE( text(CurrencyIsoCode) , &quot;USD&quot;, Opportunity_Amount__c , &quot;CAD&quot;, Opportunity_Amount__c / value(&quot;.943400&quot;),&quot;BRL&quot;, Opportunity_Amount__c / value(&quot;0.434800&quot;),&quot;MXN&quot;, Opportunity_Amount__c / value(&quot;0.078700&quot;),0)</formula>
        <name>Growth Amount Update</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Dollar Amount for roll up</fullName>
        <actions>
            <name>Growth_Amount_Update</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>GrowthInitiative__c.Opportunity_Amount__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Risk Dollar Amount for roll up</fullName>
        <active>false</active>
        <criteriaItems>
            <field>GrowthInitiative__c.Opportunity_Amount__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
