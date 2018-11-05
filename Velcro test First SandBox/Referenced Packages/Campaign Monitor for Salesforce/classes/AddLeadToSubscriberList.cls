/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AddLeadToSubscriberList {
    global AddLeadToSubscriberList() {

    }
    @InvocableMethod(label='Add Lead to a Subscriber List')
    global static List<wbsendit.AddLeadToSubscriberList.AddLeadRequest> addLeads(List<wbsendit.AddLeadToSubscriberList.AddLeadRequest> requests) {
        return null;
    }
global class AddLeadRequest {
    @InvocableVariable(label='Lead' description='The Lead to be added' required=false)
    global Lead record;
    @InvocableVariable(label='Resubscribe' description='Resubscribe if currently unsubscribed?' required=false)
    global Boolean resubscribe;
    @InvocableVariable(label='Subscriber List Id' description='E.g. "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"' required=false)
    global String subscriberListId;
    global AddLeadRequest() {

    }
}
}
