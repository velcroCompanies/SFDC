/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class DeleteContactFromSubscriberList {
    global DeleteContactFromSubscriberList() {

    }
    @InvocableMethod(label='Delete a Contact from a Subscriber List')
    global static List<wbsendit.DeleteContactFromSubscriberList.DeleteContactRequest> addContacts(List<wbsendit.DeleteContactFromSubscriberList.DeleteContactRequest> requests) {
        return null;
    }
global class DeleteContactRequest {
    @InvocableVariable(label='Contact' description='The Contact to be deleted' required=false)
    global Contact record;
    @InvocableVariable(label='Subscriber List Id' description='E.g. "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1"' required=false)
    global String subscriberListId;
    global DeleteContactRequest() {

    }
}
}
