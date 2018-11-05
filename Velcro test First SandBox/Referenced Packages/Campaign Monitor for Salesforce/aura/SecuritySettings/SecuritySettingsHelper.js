({

    doGetTotalUsers: function(cmp, event, helper) {

        cmp.set('v.searchFilter', cmp.find('search').get('v.value'));

        var action = cmp.get("c.getTotalUsers");
        action.setParams({
            searchFilter: cmp.get('v.searchFilter') || '',
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var totalRows = actionResult.getReturnValue();

                cmp.set('v.totalNumberOfRows', totalRows);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doGetUsers: function(cmp, event, helper, more) {

        helper.turnOnSpinner(cmp);

        cmp.set('v.searchFilter', cmp.find('search').get('v.value'));

        var lastSfEmail = '';
        if (cmp.get('v.data').length > 0) {
            lastSfEmail = cmp.get('v.data')[(cmp.get('v.data').length) - 1].sfEmail;
        }

        console.log('Username: ' + lastSfEmail);

        var action = cmp.get("c.getUsers");
        action.setParams({
            searchFilter: cmp.get('v.searchFilter') || '',
            lastSfEmail: lastSfEmail || '',
            rowsToLoad: cmp.get('v.rowsToLoad'),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var data = actionResult.getReturnValue();

                if (!more) { // This is the initial load
                    cmp.set('v.data', data);
                } else if (cmp.get('v.data').length >= cmp.get('v.totalNumberOfRows')) {
                    cmp.set('v.enableInfiniteLoading', false);
                    cmp.set('v.loadMoreStatus', 'Showing All Active Users');
                } else if (more) {
                    var currentData = cmp.get('v.data');
                    //Appends new data to the end of the table
                    var newData = currentData.concat(data);
                    cmp.set('v.data', newData);
                    cmp.set('v.loadMoreStatus', '');
                }
                cmp.set('v.subHeader', cmp.get('v.data').length + ' items');
                event.getSource().set("v.isLoading", false);

                helper.turnOffSpinner(cmp);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    doGetConnectedCMUser: function(cmp, event, helper) {

        var action = cmp.get("c.getConnectedCMUser");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var connectedUser = actionResult.getReturnValue();
                cmp.set('v.connectedCMUser', connectedUser);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doGetCMClients: function(cmp, event, helper) {

        var action = cmp.get("c.getClientList");

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();

                var clientList = [];
                clientList.push({ clientId: "admin", clientName: "All Clients" });
                clientList = clientList.concat(data);

                cmp.set('v.clientList', clientList);

                // Initialise with Admin users
                helper.doGetCMAdminUsers(cmp, event, helper);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doGetCMClientUsers: function(cmp, event, helper) {

        var action = cmp.get("c.getClientUsers");
        action.setParams({
            clientId: cmp.get('v.selectedClient') || '',
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();

                var users = [];
                if (data.length === 0) {
                    users.push({ emailAddress: "none", displayName: "-- No Users for this Client --" });
                    cmp.set('v.clientUsersDisabled', true);
                } else {
                    users.push({ emailAddress: "none", displayName: "-- Select User --" });
                    users = users.concat(actionResult.getReturnValue());
                    cmp.set('v.clientUsersDisabled', false);
                }
                cmp.set('v.selectedUser', 'none');
                cmp.set('v.clientUsers', users);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doGetCMAdminUsers: function(cmp, event, helper) {

        var action = cmp.get("c.getAdminUsers");
        action.setParams({});

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();

                var users = [];
                if (data.length === 0) {
                    users.push({ emailAddress: "none", displayName: "-- No Users for this Client --" });
                    cmp.set('v.clientUsersDisabled', true);
                } else {
                    users.push({ emailAddress: "none", displayName: "-- Select User --" });
                    users = users.concat(data);
                    cmp.set('v.clientUsersDisabled', false);
                }
                cmp.set('v.selectedUser', 'none');
                cmp.set('v.clientUsers', users);

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doCreateUser: function(cmp, event, helper) {

        var action = cmp.get("c.createCMUser");
        action.setParams({
            clientId: cmp.get('v.selectedClient') || '',
            email: cmp.get('v.createUserEmail'),
            name: cmp.get('v.createUserName'),
            accessLevel: cmp.get('v.createUserOptionValue'),
            password: cmp.get('v.createUserPassword'),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();

                if (data.cmResponse) {
                    cmp.set('v.createUserMessage', data.cmResponse.message);
                } else {
                    cmp.set('v.createUserMessage', '');

                    var users = cmp.get('v.clientUsers');
                    users = users.concat({ emailAddress: data.emailAddress, displayName: cmp.get('v.createUserName') + ' (' + data.emailAddress + ')', selected: true });
                    cmp.set('v.clientUsers', users);
                    cmp.set('v.selectedUser', data.emailAddress);


                    $A.util.removeClass(cmp.find('b12-select-users'), "slds-hide");
                    $A.util.addClass(cmp.find('b12-create-user'), "slds-hide");
                    cmp.set('v.createLinkUserLabel', 'Link User');
                    cmp.set('v.createLinkUserHeaderLabel', 'Link Campaign Monitor User');
                }

            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
        });
        $A.enqueueAction(action);
    },
    doLinkUsers: function(cmp, event, helper) {

        cmp.find('b12-link-user').close();
        helper.turnOnSpinner(cmp);

        var selectedUser = cmp.get('v.selectedUser');
        if (selectedUser === 'none') {
            selectedUser = '';
        }
        var action = cmp.get("c.linkCMUser");
        action.setParams({
            usersJSON: JSON.stringify(cmp.get('v.selectedRows')),
            cmUser: selectedUser
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();
                var linkErrors = [];

                var userData = cmp.get('v.data');
                for (var i = 0; i < userData.length; i++) {
                    var userDetail = userData[i];

                    for (var j = 0; j < data.length; j++) {
                        if (userDetail.sfUserName === data[j].sfUserName) {
                            if (data[j].cmResponse) {
                                linkErrors.push(data[j].cmResponse);
                            } else if (cmp.get('v.selectedUser') === 'none') {
                                userData[i].cmEmailAddress = '';
                            } else {
                                userData[i].cmEmailAddress = cmp.get('v.selectedUser');
                            }

                        }
                    }
                }
                cmp.set('v.data', userData);
                cmp.set('v.selectedUser','none');

                cmp.set('v.linkErrors', linkErrors);
                if (linkErrors.length > 0) {
                    cmp.find('b12-link-user-errors').open();
                }


            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    doAssignPermissions: function(cmp, event, helper) {
        cmp.find('b12-assign-permission-modal').close();
        helper.turnOnSpinner(cmp);

        var action = cmp.get("c.assignPermissionSet");
        action.setParams({
            usersJSON: JSON.stringify(cmp.get('v.selectedRows')),
            permissionSet: cmp.get('v.assignmentOptionValue')
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var data = actionResult.getReturnValue();
                var linkErrors = [];

                var permissionSetLabel = cmp.get('v.assignmentOptionValue') === 'sendIT_User_Access' ? 'Campaign Monitor - User Access' : 'Campaign Monitor - Full Access';

                var userData = cmp.get('v.data');
                for (var i = 0; i < userData.length; i++) {
                    var userDetail = userData[i];

                    for (var j = 0; j < data.length; j++) {
                        if (userDetail.sfUserName === data[j].sfUserName) {
                            if (data[j].cmResponse) {
                                linkErrors.push(data[j].cmResponse);
                            } else if (cmp.get('v.assignmentOptionValue') === 'none') {
                                userData[i].sfPermissionSets = '';
                            } else {
                                userData[i].sfPermissionSets = permissionSetLabel;
                            }

                        }
                    }
                }
                cmp.set('v.data', userData);


                cmp.set('v.linkErrors', linkErrors);
                if (linkErrors.length > 0) {
                    cmp.find('b12-link-user-errors').open();
                }


            } else if (state === "ERROR") {

                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    turnOffSpinner: function(cmp) {

        $A.util.addClass(cmp.find('body-spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");

    },
    turnOnSpinner: function(cmp) {
        $A.util.removeClass(cmp.find('body-spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
    },
    showNotification: function(cmp, event, helper, msg, msgSeverity) {

        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg,
            msgSeverity: msgSeverity
        }).fire();
    },
})