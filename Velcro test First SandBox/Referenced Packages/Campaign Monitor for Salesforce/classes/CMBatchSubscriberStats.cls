/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CMBatchSubscriberStats implements Database.AllowsCallouts, Database.Batchable<wbsendit.SendItClass.CMListDetail>, Database.Stateful {
    global Integer maxSubscribers;
    global Integer totalActiveSubscribers;
    global Integer totalBounces;
    global Integer totalDeleted;
    global Integer totalUnsubscribes;
    global void execute(Database.BatchableContext info, List<wbsendit.SendItClass.CMListDetail> cmListDetail) {

    }
    global void finish(Database.BatchableContext info) {

    }
    global System.Iterable start(Database.BatchableContext info) {
        return null;
    }
}
