/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class UnsubscribeLeadsFromSubscriberList {
    global UnsubscribeLeadsFromSubscriberList() {

    }
    @InvocableMethod(label='Unsubscribe a Lead from a Subscriber List')
    global static List<wbsendit.UnsubscribeLeadsFromSubscriberList.UnsubscribeLeadRequest> addLeads(List<wbsendit.UnsubscribeLeadsFromSubscriberList.UnsubscribeLeadRequest> requests) {
        return null;
    }
global class UnsubscribeLeadRequest {
    @InvocableVariable(label='Lead' description='The Lead to be unsubscribed' required=false)
    global Lead record;
    @InvocableVariable(label='Subscriber List Id' description='E.g. "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"' required=false)
    global String subscriberListId;
    global UnsubscribeLeadRequest() {

    }
}
}
