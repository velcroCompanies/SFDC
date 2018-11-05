/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class InvokeProjectClone {
    global InvokeProjectClone() {

    }
    @InvocableMethod(label='Clone a Project' description='Clones a Project')
    global static List<CCMI__Milestone_Project__c> cloneProjects(List<CCMI.InvokeProjectClone.InvocableProjectClone> invocables) {
        return null;
    }
global class InvocableProjectClone {
    @InvocableVariable(label='Project Id' description='Required. The Id of the Project to clone.' required=true)
    global Id projectId;
    @InvocableVariable(label='Project Name' description='Required. The Name to give the cloned Project' required=true)
    global String projectName;
    @InvocableVariable(label='Related Record Id' description='Not Required. Related record to associate the Project with' required=false)
    global Id relatedRecordId;
    @InvocableVariable(label='Desired Start Date' description='Required. The Start Date for the cloned Project' required=true)
    global Date startDate;
    global InvocableProjectClone() {

    }
}
}
