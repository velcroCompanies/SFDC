({
    onInit: function(cmp, event, helper) {

        cmp.set('v.columns', [
            { label: 'Salesforce User', fieldName: 'sfDetail', type: 'text' },
            { label: 'Campaign Monitor User', fieldName: 'cmEmailAddress', type: 'text', cellAttributes: { alignment: 'left' } },
            { label: 'Salesforce Permissions', fieldName: 'sfPermissionSets', type: 'text' },
        ]);

        helper.doGetTotalUsers(cmp, event, helper);
        helper.doGetUsers(cmp, event, helper, false);
        helper.doGetConnectedCMUser(cmp, event, helper);

    },
    handleRowAction: function(cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'link_cm':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
            case 'assign_permission':
                var rows = cmp.get('v.mydata');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                cmp.set('v.mydata', rows);
                break;
        }
    },
    getSelectedName: function(cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++) {
            // alert("You selected: " + selectedRows[i].opportunityName);
        }
    },
    updateSelectedText: function(cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.selectedRows', selectedRows);
        cmp.set('v.selectedRowsCount', selectedRows.length);
        cmp.set('v.disabledButtons', selectedRows.length === 0);
    },

    resetRows: function(cmp, event, helper) {
        cmp.set('v.data', []);
        helper.fetchData(cmp, cmp.get('v.initialRows'))
            .then($A.getCallback(function(data) {
                cmp.set('v.data', data);
            }));
    },

    loadMoreData: function(cmp, event, helper) {

        //Display a spinner to signal that data is being loaded
        event.getSource().set("v.isLoading", true);
        //Display "Loading" when more data is being loaded
        cmp.set('v.loadMoreStatus', 'Loading');

        helper.doGetUsers(cmp, event, helper, true);

    },
    onSearch: function(cmp, event, helper) {
        cmp.set('v.searchFilter', cmp.find('search').get('v.value'));
        cmp.set('v.data', []);
        cmp.set('v.enableInfiniteLoading', true);
        cmp.set('v.loadMoreStatus', '');
        helper.doGetTotalUsers(cmp, event, helper);
        helper.doGetUsers(cmp, event, helper, false);
    },
    onClearSearch: function(cmp, event, helper) {
        cmp.set('v.searchFilter', cmp.find('search').get('v.value'));
        if (!cmp.find('search').get('v.value')) {
            cmp.set('v.data', []);
            cmp.set('v.enableInfiniteLoading', true);
            cmp.set('v.loadMoreStatus', '');
            helper.doGetTotalUsers(cmp, event, helper);
            helper.doGetUsers(cmp, event, helper, false);
        }
    },
    onOpenLinkCMUser: function(cmp, event, helper) {

        var selectedRows = cmp.get('v.selectedRows');

        helper.doGetCMClients(cmp, event, helper);

        // Reset values
        $A.util.removeClass(cmp.find('b12-select-users'), "slds-hide");
        $A.util.addClass(cmp.find('b12-create-user'), "slds-hide");
        $A.util.addClass(cmp.find('b12-warning-id'), "slds-hide");
        $A.util.removeClass(cmp.find('b12-info-id'), "slds-hide");
        cmp.set('v.createLinkUserLabel', 'Link User');
        cmp.set('v.createLinkUserHeaderLabel', 'Link Campaign Monitor User');
        cmp.set('v.createUserOptionValue', '8415');
        cmp.set('v.selectedClient', 'admin');

        // Open link CM user model
        cmp.find('b12-link-user').open();
    },
    onSelectClient: function(cmp, event, helper) {

        // Check if the selection is for admins
        if (cmp.get('v.selectedClient') === 'admin') {
            helper.doGetCMAdminUsers(cmp, event, helper);
        } else {
            helper.doGetCMClientUsers(cmp, event, helper);
        }
    },
    onCreateUser: function(cmp, event, helper) {
        $A.util.addClass(cmp.find('b12-select-users'), "slds-hide");
        $A.util.removeClass(cmp.find('b12-create-user'), "slds-hide");
        cmp.set('v.createLinkUserLabel', 'Create User');
        cmp.set('v.createLinkUserHeaderLabel', 'Create Campaign Monitor User');

    },
    onChangePermission: function(cmp, event, helper) {

        var changeValue = event.getParam("value");
        if (changeValue === '62463') {
            $A.util.addClass(cmp.find('b12-info-id'), "slds-hide");
            $A.util.removeClass(cmp.find('b12-warning-id'), "slds-hide");
        } else {
            $A.util.addClass(cmp.find('b12-warning-id'), "slds-hide");
            $A.util.removeClass(cmp.find('b12-info-id'), "slds-hide");
        }
    },
    onLinkCMUser: function(cmp, event, helper) {

        if (cmp.get('v.createLinkUserLabel') === 'Link User') {
            // Link CM user to SF user
            helper.doLinkUsers(cmp, event, helper);
        } else {
            var allValid = cmp.find('b12-create-user-field').reduce(function(validSoFar, inputCmp) {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
            if (allValid) {
                // alert('All form entries look valid. Ready to submit!');
                helper.doCreateUser(cmp, event, helper);
            } else {
                alert('Please update the invalid form entries and try again.');
            }
        }
    },
    onOpenAssignPermissions: function(cmp, event, helper) {
        $A.util.addClass(cmp.find('b12-admin-permission-id'), "slds-hide");
        $A.util.removeClass(cmp.find('b12-user-permission-id'), "slds-hide");
        cmp.set('v.assignmentOptionValue', 'sendIT_User_Access');
        cmp.find('b12-assign-permission-modal').open();
    },
    onAssignPermissions: function(cmp, event, helper) {
        helper.doAssignPermissions(cmp, event, helper);
    },
    onChangeAssignPermission: function(cmp, event, helper) {

        var changeValue = event.getParam("value");
        if (changeValue === 'sendIT_Full_Access') {
            $A.util.addClass(cmp.find('b12-user-permission-id'), "slds-hide");
            $A.util.removeClass(cmp.find('b12-admin-permission-id'), "slds-hide");
        } else if (changeValue === 'sendIT_User_Access') {
            $A.util.addClass(cmp.find('b12-admin-permission-id'), "slds-hide");
            $A.util.removeClass(cmp.find('b12-user-permission-id'), "slds-hide");
        } else {
            $A.util.addClass(cmp.find('b12-admin-permission-id'), "slds-hide");
            $A.util.addClass(cmp.find('b12-user-permission-id'), "slds-hide");
        }
    },
})