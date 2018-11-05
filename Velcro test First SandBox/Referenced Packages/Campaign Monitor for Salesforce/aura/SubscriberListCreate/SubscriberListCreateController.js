({
    doInit: function (cmp, event, helper) {
        helper.turnOnSpinner(cmp);
        helper.doGetListDetail(cmp, event, helper);
    },
    onMapFields: function (cmp, event, helper) {

        helper.turnOnSpinner(cmp);

        // Send event to subscriber home to navigate to mappings page
        var compEvent = cmp.getEvent("subscriberListHomeEvent");
        compEvent.setParams({
            "action": 'SUBSCRIBER_LIST_MAPPING',
            "id": cmp.get("v.listId")
        });
        compEvent.fire();
    },
    onEditList: function (cmp, event, helper) {
        cmp.set('v.disabled', false);
        cmp.set('v.showEdit', true);
    },
    onSaveCreateRule: function (cmp, event, helper) {
        cmp.set('v.disabled', true);
        cmp.set('v.showEdit', false);

        helper.turnOnSpinner(cmp);

        helper.doUpdateList(cmp, event, helper);
    },
    onBack: function (cmp, event, helper) {
        helper.doNavigateBack(cmp, event, helper);
    },
    onCancel: function (cmp, event, helper) {
        cmp.set('v.disabled', true);
        cmp.set('v.showEdit', false);
    },
})