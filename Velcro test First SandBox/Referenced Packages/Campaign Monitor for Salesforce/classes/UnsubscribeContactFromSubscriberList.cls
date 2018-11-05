/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class UnsubscribeContactFromSubscriberList {
    global UnsubscribeContactFromSubscriberList() {

    }
    @InvocableMethod(label='Unsubscribe a Contact from a Subscriber List')
    global static List<wbsendit.UnsubscribeContactFromSubscriberList.UnsubscribeContactRequest> addContacts(List<wbsendit.UnsubscribeContactFromSubscriberList.UnsubscribeContactRequest> requests) {
        return null;
    }
global class UnsubscribeContactRequest {
    @InvocableVariable(label='Contact' description='The Contact to be unsubscribed' required=false)
    global Contact record;
    @InvocableVariable(label='Subscriber List Id' description='E.g. "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"' required=false)
    global String subscriberListId;
    global UnsubscribeContactRequest() {

    }
}
}
