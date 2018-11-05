({

    submit: function(component, event, helper) {

        // show the spinner
        component.set('v.loading', !component.get('v.loading'));
        // disable the button
        var submitBtn = event.getSource();
        submitBtn.set("v.disabled", true);
        // check for a valid date
        var dueDateAsString = null;
        if (component.get("v.dueDate") != null) {
            dueDateAsString = $A.localizationService.formatDate(component.get("v.dueDate"), "yyyy-MM-ddTHH:mm:ss");
        }

        var action = component.get("c.assign");
        action.setParams({
            "trailmixId": component.get("v.recordId"),
            "users": component.get("v.selectedUsers"),
            "dueDateAsString": dueDateAsString
        });
        action.setCallback(this, function(response) {
            var resultsToast = $A.get("e.force:showToast");
            var state = response.getState();
            if (component.isValid() && state == "SUCCESS") {
                var results = response.getReturnValue();
                if (results.success == 'true') {
                    resultsToast.setParams({
                        "type": "success",
                        "title": "Success",
                        "message": results.message
                    });
                } else {
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": results.message + ". Please check the Debug Logs for more info."
                    });
                }
                resultsToast.fire();
                helper.navigateTo(component, component.get("v.recordId"));
            } else {
                var errors = response.getError();
                var message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                resultsToast.setParams({
                    "type": "error",
                    "title": "Error",
                    "message": "Yikes! This is bad! Error: " + message
                });
                console.log('Yikes! This is bad! Error: ' + message);
                resultsToast.fire();
                helper.navigateTo(component, component.get("v.recordId"));
            }
        });
        $A.enqueueAction(action);

    },

    removeUser: function(component, event, helper) {
        // remove from pills        
        var users = component.get("v.selectedUsers");
        for (var i = 0; i < users.length; i++) {
            if (users[i].Id == event.getSource().get("v.name")) {
                users.splice(i, 1);
                component.set("v.selectedUsers", users);
                break;
            }
        }
    },

    addUser: function(component, event, helper) {

        var selectedList = component.get("v.selectedUsers");
        var searchResults = component.get("v.searchResults");

        // check to see if user is already in the list
        for (var i = 0; i < selectedList.length; i++) {
            if (selectedList[i].Id == event.getSource().get("v.name")) {
                // if so, stop processing the function
                return;
            }
        }

        // disable the button
        var btn = event.getSource();
        btn.set("v.disabled", "true");
        // add the selected item to the list
        // search for the id in the array and remove that element
        for (var i = 0; i < searchResults.length; i++) {
            if (searchResults[i].Id == event.getSource().get("v.name")) {
                selectedList.push(component.get("v.searchResults")[i]);
                break;
            }
        }
        component.set("v.selectedUsers", selectedList);

    },

    search: function(component, event, helper) {

        var action = component.get('c.searchUsers');
        action.setParams({
            "keyword": component.get("v.keyword"),
        });
        action.setCallback(this, function(actionResult) {
            component.set('v.searchResults', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);

    },

    showSearch: function(component, event, helper) {
        component.set("v.showSearchUI", true);
        component.set("v.showDateUI", false);
    },

    showDate: function(component, event, helper) {
        component.set("v.showSearchUI", false);
        component.set("v.showDateUI", true);
    },

    cancel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },

})