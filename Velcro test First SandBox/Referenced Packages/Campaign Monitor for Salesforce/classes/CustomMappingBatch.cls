/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CustomMappingBatch implements Database.AllowsCallouts, Database.Batchable<SObject>, Database.Stateful {
    global CustomMappingBatch(Set<String> cmLists) {

    }
    global CustomMappingBatch(String newJSON, String oldJSON, String objType) {

    }
    global CustomMappingBatch(Id contactId, Id leadId, String objType, String cmListId, String oldEmail, String newEmail) {

    }
    global void execute(Database.BatchableContext BC, List<SObject> scope) {

    }
    global void finish(Database.BatchableContext BC) {

    }
    global Database.QueryLocator start(Database.BatchableContext batchContext) {
        return null;
    }
}
