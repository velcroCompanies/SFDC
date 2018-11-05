/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AddContactToSubscriberList {
    global AddContactToSubscriberList() {

    }
    @InvocableMethod(label='Add Contact to a Subscriber List')
    global static List<wbsendit.AddContactToSubscriberList.AddContactRequest> addContacts(List<wbsendit.AddContactToSubscriberList.AddContactRequest> requests) {
        return null;
    }
global class AddContactRequest {
    @InvocableVariable(label='Contact' description='The Contact to be added' required=false)
    global Contact record;
    @InvocableVariable(label='Resubscribe' description='Resubscribe if currently unsubscribed?' required=false)
    global Boolean resubscribe;
    @InvocableVariable(label='Subscriber List Id' description='E.g. "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"' required=false)
    global String subscriberListId;
    global AddContactRequest() {

    }
}
}
