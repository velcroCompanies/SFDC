/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CreateSubscriberList {
    global CreateSubscriberList() {

    }
    @InvocableMethod(label='Create a new Subscriber List in Campaign Monitor')
    global static List<wbsendit.CreateSubscriberList.SubscriberListDetails> createSubscriberList(List<wbsendit.CreateSubscriberList.SubscriberListDetails> requests) {
        return null;
    }
global class SubscriberListDetails {
    @InvocableVariable(label='Client Id' description='The ID of the client' required=true)
    global String clientId;
    @InvocableVariable(label='Confirmed Opt In' description='Is confirmation required to opt in to this list' required=true)
    global Boolean confirmedOptIn;
    @InvocableVariable(label='Subscriber List Name' description='The name of the subscriber list' required=true)
    global String name;
    @InvocableVariable(label='Unsubscribe From All Lists' description='Unsubscribe from all lists or just this one' required=true)
    global Boolean unsubscribeAllLists;
    global SubscriberListDetails() {

    }
}
}
