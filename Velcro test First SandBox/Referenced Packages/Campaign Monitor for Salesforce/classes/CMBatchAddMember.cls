/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CMBatchAddMember implements Database.AllowsCallouts, Database.Batchable<SObject> {
    global CMBatchAddMember(Id campaignId, String listId, String listName) {

    }
    global CMBatchAddMember(Id campaignId, String listId, String listName, Boolean resubscribe) {

    }
    global CMBatchAddMember(Id campaignId, String listId, String listName, Boolean resubscribe, List<String> campaignStatuses) {

    }
    global void execute(Database.BatchableContext BC, List<CampaignMember> scope) {

    }
    global void finish(Database.BatchableContext BC) {

    }
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return null;
    }
}
