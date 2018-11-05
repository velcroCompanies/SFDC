({

    doInit: function(component, event, helper) {

        var action = component.get('c.getAssignedUsers');
        action.setParams({
            "trailmixId": component.get("v.recordId")
        });
        action.setCallback(this, function(actionResult) {
            console.log(actionResult.getReturnValue());
            component.set('v.currentUsers', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);

    },

    submit: function(component, event, helper) {

        // show the spinner
        component.set('v.loading', !component.get('v.loading'));
        // disable the button
        var submitBtn = event.getSource();
        submitBtn.set("v.disabled", true);

        var action = component.get("c.unassign");
        action.setParams({
            "userTrailmixes": component.get("v.selectedUsers")
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

    addUser: function(component, event, helper) {

        var selectedList = component.get("v.selectedUsers");
        var currentUsers = component.get("v.currentUsers");

        // disable the button
        var btn = event.getSource();
        btn.set("v.disabled", "true");
        // add the selected item to the list
        // search for the id in the array and remove that element
        for (var i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i].Id == event.getSource().get("v.name")) {
                selectedList.push(currentUsers[i]);
                break;
            }
        }
        component.set("v.selectedUsers", selectedList);

    },

    cancel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },

})