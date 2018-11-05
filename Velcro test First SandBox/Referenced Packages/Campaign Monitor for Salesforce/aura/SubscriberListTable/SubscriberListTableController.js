({
    onInit: function(cmp, event, helper) {
        helper.doGetLists(cmp, event, helper);
        helper.doGetLicenceDetails(cmp, event, helper);
    },
    sortBylistName: function(cmp, event, helper) {
        helper.sortBy(cmp, "listName");
    },
    sortByClientName: function(cmp, event, helper) {
        helper.sortBy(cmp, "clientName");
    },
    sortByListType: function(cmp, event, helper) {
        helper.sortBy(cmp, "listType");
    },
    sortByUnsubscribeSetting: function(cmp, event, helper) {
        helper.sortBy(cmp, "unsubscribeSetting");
    },
    onRefreshLists: function(cmp, event, helper) {
        helper.doRefreshLists(cmp, event, helper);
    },
    onRenderPage: function(cmp, event, helper) {
        helper.renderPage(cmp);
    },

    onCreateList: function(cmp, event, helper) {

        var eventToComponent = $A.get("e.force:navigateToComponent");
        eventToComponent.setParams({
            componentDef: "wbsendit:SubscriberList",
            componentAttributes: {
                action: "NEW",
                navigation: "subscriber listhome",
                licenceDetail: JSON.parse(cmp.get('v.licenceDetail')),
            }
        });
        eventToComponent.fire();
    },
    onSelectList: function(cmp, event, helper) {
        debugger
        cmp.set('v.listId', event.target.id);
        cmp.set('v.listName', event.target.text);

        var eventToComponent = $A.get("e.force:navigateToComponent");
        eventToComponent.setParams({
            componentDef: "wbsendit:SubscriberListHome",
            componentAttributes: {
                action: "VIEW_DETAIL",
                listId: cmp.get('v.listId'),
                listName: cmp.get('v.listName'),
                backLocation: 'SUBSCRIBER_LIST',
                licenceDetail: JSON.parse(cmp.get('v.licenceDetail')),
            }
        });
        eventToComponent.fire();
    },
    onListMenu: function(cmp, event, helper) {

        var selectedMenuItemValue = event.getParam("value");
        var currentList = cmp.get("v.currentList");
        cmp.set("v.listId", currentList[selectedMenuItemValue.split(":")[1]].listId);
        cmp.set("v.listName", currentList[selectedMenuItemValue.split(":")[1]].listName);

        var eventToComponent = $A.get("e.force:navigateToComponent");

        if (selectedMenuItemValue.split(":")[0] === 'editItem') {
            cmp.set('v.action', 'EDIT_LIST_DETAIL');
            eventToComponent.setParams({
                componentDef: "wbsendit:SubscriberListHome",
                componentAttributes: {
                    action: cmp.get('v.action'),
                    listId: cmp.get('v.listId'),
                    listName: cmp.get('v.listName'),
                    licenceDetail: JSON.parse(cmp.get('v.licenceDetail')),
                }
            });

        } else {
            cmp.set('v.action', 'DELETE_LIST');
            eventToComponent.setParams({
                componentDef: "wbsendit:SubscriberList",
                componentAttributes: {
                    action: cmp.get('v.action'),
                    listId: cmp.get('v.listId'),
                    listName: cmp.get('v.listName'),
                    licenceDetail: JSON.parse(cmp.get('v.licenceDetail')),
                }
            });
        }

        eventToComponent.fire();
    },
})