<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Consumer_Case_Africa_Email_Alert</fullName>
        <ccEmails>jim.h061408@gmail.com</ccEmails>
        <description>Consumer Case Africa Email Alert</description>
        <protected>false</protected>
        <recipients>
            <recipient>ericci@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_AlertUK</fullName>
        <ccEmails>jim.h061408@gmail.com</ccEmails>
        <description>Consumer Case: Email Alert UK</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>rmilner@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_AndyV</fullName>
        <ccEmails>AValenzuela@velcro.com</ccEmails>
        <description>Consumer Case: Email Alert Andy V</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_EMEA</fullName>
        <description>Consumer Case Email Alert EMEA</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>ericci@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_Eastern_Europe</fullName>
        <description>Consumer Case Email Alert Eastern Europe</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>mgutzler@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_Evarts</fullName>
        <ccEmails>jim.h061408@gmail.com</ccEmails>
        <description>Consumer Case: Email Alert Evarts</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_FRANCE</fullName>
        <description>Consumer Case Email Alert FRANCE</description>
        <protected>false</protected>
        <recipients>
            <recipient>Sales_Operations_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>llebris@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>Consumer_Case_Email_Alert_SPAIN</fullName>
        <ccEmails>jim.h061408@gmail.com</ccEmails>
        <description>Consumer Case Email Alert SPAIN</description>
        <protected>false</protected>
        <recipients>
            <recipient>sherrera@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>cases/Consumer_Web_Inquiry</template>
    </alerts>
    <alerts>
        <fullName>New_SalesForce_ticket_email_alert</fullName>
        <description>New SalesForce ticket email alert</description>
        <protected>false</protected>
        <recipients>
            <recipient>fantunes@velcro.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Sales_Email_Templates/New_Salesforce_Ticket_Opened</template>
    </alerts>
    <fieldUpdates>
        <fullName>INT_Case_Closed</fullName>
        <description>not resolved...but to indicate it was passed on</description>
        <field>Status</field>
        <literalValue>Closed</literalValue>
        <name>INT Case Closed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>NA_Escalated</fullName>
        <description>Not true escalation - but to indicate it was passed on</description>
        <field>Status</field>
        <literalValue>Escalated</literalValue>
        <name>NA Escalated</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Africa Consumer Case Notification</fullName>
        <actions>
            <name>Consumer_Case_Africa_Email_Alert</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>((1 or 2 or 3) AND 4 and 5 and 6)</booleanFilter>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Angola,Benin,Botswana,Burkina Faso,Burundi,Cameroon,Cape Verde,Central African Republic,Chad,Comoros,Congo,Democratic Republic of the Congo,Republic of the Congo,Djibuti,Equatorial Guinea,Eritrea,Ethiopia,Gabon,Gambia,Ghana,Guinea,Guinea-Bissau</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Guinea Bissau,Ivory Coast,Cote D&apos;ivoire,Kenya,Lesotho,Liberia,Libya,Madagascar,Malawi,Mali,Mauritania,Mauritius,Mozambique,Namibia,Niger,Nigeria,Rwanda,Sao Tome and Principe,Senegal,Seychelles,Sierra Leone,Somalia,South Africa,Sudan,South Sudan,Swaziland</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Tanzania,Togo,Uganda,Zambia,Zimbabwe,Africa</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Andy V Notify New Cases</fullName>
        <actions>
            <name>Consumer_Case_Email_Alert_AndyV</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>NA_Escalated</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>1 AND 2 AND 3 AND 4 AND 5 AND 6 AND 7 AND 8 AND 9</booleanFilter>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>New Case</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notContain</operation>
            <value>Teacher,Education,School,Teachers,schools</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Description</field>
            <operation>notContain</operation>
            <value>Teacher,Education,School,Teachers,schools</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Subject</field>
            <operation>notContain</operation>
            <value>Teacher,Education,School,Teachers,schools</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Subject</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>USA,U.S.A.,US,U.S.,United States,United States of America,Canada,Mexico</value>
        </criteriaItems>
        <description>Notifies Andy V on All New Consumer Case Creation except education requests</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Consumer Case Notification EMA1</fullName>
        <actions>
            <name>Consumer_Case_Email_Alert_EMEA</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>((1 or 2) and 3 and 4 and 5)</booleanFilter>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Egypt,Iran,Iraq,Saudi Arabia,Yemen,Syria,United Arab Emirates,UAE,Israel,Jordan,Lebanon,Oman,Kuwait,Qatar,Bahrain,Afghanistan,Greece,Cyprus,India,Portugal,Italy,Turkey</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Denmark,Norway,Sweden,Finland,Iceland,Faroe Islands</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Consumer Case Notification Eastern Europe</fullName>
        <actions>
            <name>Consumer_Case_Email_Alert_Eastern_Europe</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>1 AND 2 AND 3 AND 4</booleanFilter>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Moldova,Macedonia,Luxembourg,Liechtenstein,Lithuania,Belgium,Netherlands,Belarus,Bulgaria,Czech Republic,Hungary,Moldova,Poland,Romania,Russia,Slovakia,Ukraine,Germany,Austria,Switzerland</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Consumer Case Notification French</fullName>
        <actions>
            <name>Consumer_Case_Email_Alert_FRANCE</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>France,Algeria,Tunisia,Morocco</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Consumer Case Notification Spain</fullName>
        <actions>
            <name>Consumer_Case_Email_Alert_SPAIN</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>Spain</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Consumer Case Notification UK</fullName>
        <actions>
            <name>Consumer_Case_Email_AlertUK</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>INT_Case_Closed</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <criteriaItems>
            <field>Case.ContactFormCountry__c</field>
            <operation>equals</operation>
            <value>UK,United Kingdom,U.K.,England,Britain,Scotland,Ireland</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormComments__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormLastName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Case.ContactFormFirstName__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Fires an Email to the Country Manager when a Consumer case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Under Usd 500</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Case.Under_USD_500_00__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <tasks>
        <fullName>New_Ticket</fullName>
        <assignedTo>sfadmin@velcro.com</assignedTo>
        <assignedToType>user</assignedToType>
        <dueDateOffset>5</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <offsetFromField>Case.CreatedDate</offsetFromField>
        <priority>Normal</priority>
        <protected>false</protected>
        <status>In Progress</status>
        <subject>New Ticket</subject>
    </tasks>
</Workflow>
