({
    doGetListDetails: function (cmp, event, helper) {

        var action = cmp.get("c.getSubscriberListDetail");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var listdetail = actionResult.getReturnValue();
                cmp.set('v.listdetail', listdetail);

                helper.doGetMappedFields(cmp, event, helper);

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
    doGetMappedFields: function (cmp, event, helper) {

        var includeRequiredFields = cmp.get('v.listdetail.createRule') !== 'ACTION_DO_NOTHING';
        cmp.set('v.showCreateOption', includeRequiredFields);

        var action = cmp.get("c.getCustomMappings");
        action.setParams({
            "subscriberListId": cmp.get('v.listdetail.cmListId') || '',
            "includeRequiredFields": includeRequiredFields
        });

        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var defaultMappings = JSON.parse('[ { "cmDataType": "Text", "cmField": "", "cmLabel": "Email", "contactField": "Email", "contactLabel": "Email", "contactRequired": false, "direction": "sf2cm", "directionLabel": "Salesforce to Campaign Monitor", "leadField": "Email", "leadLabel": "Email", "leadRequired": false, "parentObjectContactField": "", "parentObjectContactLabel": "", "parentObjectContactName": "", "parentObjectLeadField": "", "parentObjectLeadLabel": "", "parentObjectLeadName": "", "reservedField": true }, { "cmDataType": "Text", "cmField": "", "cmLabel": "Full Name", "contactField": "Name", "contactLabel": "Name", "contactRequired": false, "direction": "sf2cm", "directionLabel": "Salesforce to Campaign Monitor", "leadField": "Name", "leadLabel": "Name", "leadRequired": false, "parentObjectContactField": "", "parentObjectContactLabel": "", "parentObjectContactName": "", "parentObjectLeadField": "", "parentObjectLeadLabel": "", "parentObjectLeadName": "", "reservedField": true } ]');
                cmp.set("v.mappings", defaultMappings);
                var mappings = cmp.get("v.mappings");

                var storedMappings = actionResult.getReturnValue();

                for (var i = 0; i < storedMappings.length; i++) {
                    mappings.push(storedMappings[i]);
                    if (storedMappings[i].cmField === "[SalesforceId]") {
                        cmp.set('v.enableSalesforceId', true);
                    }

                    if (((storedMappings[i].contactRequired || storedMappings[i].leadRequired)) && cmp.get('v.listdetail.createRule') !== 'ACTION_DO_NOTHING') {
                        cmp.set('v.showRequired', true);
                    }
                }
                cmp.set("v.mappings", mappings);

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    doSaveMappings: function (cmp, event, helper, otherSubscriberLists, deleteCMFields) {

        var action = cmp.get("c.saveMappings");
        action.setParams({
            subscriberListId: cmp.get('v.listdetail.cmListId'),
            otherLists: otherSubscriberLists || '',
            mappingArrayJson: JSON.stringify(cmp.get('v.mappings')),
            deletedFieldsJson: JSON.stringify(cmp.get("v.deletedFields")),
            saveAndRun: true,
            deleteCMFields: deleteCMFields
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                helper.showNotification(cmp, event, helper, 'Successfully saved mappings.', 'success');

            } else if (state === "ERROR") {
                var errors = actionResult.getError();

                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                        helper.showNotification(cmp, event, helper, 'Problem saving mappings. ' + errors[0].message, 'error');
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    getSFFields: function (cmp, event, helper, objectType, cmDataType, direction) {

        var action = cmp.get("c.getSalesforceFields");
        action.setParams({
            objectType: objectType,
            cmDataType: cmDataType,
            action: 'add',
            direction: direction
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {
            console.log(actionResult.getReturnValue());

            var state = actionResult.getState();
            console.log(state);
            if (state === "SUCCESS") {
                var salesforceFields = cmp.get("v.salesforceFields");
                cmp.set("v.salesforceFields", actionResult.getReturnValue());

                if (objectType.toUpperCase() == 'CONTACT') {
                    cmp.set('v.salesforceContactFields', actionResult.getReturnValue());
                }

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }

        });
        $A.enqueueAction(action);
    },

    doNavigateBack: function (cmp, event, helper) {

        var backLocation = cmp.get('v.backLocation');
        if (!backLocation) {
            // If back location not set, then we are coming from outside the ListHome
            // We are also in a VF Page so we can use the back button
            window.history.back();
        }

        // If we are in native Lightning, always go back to the subscriber list home
        var eventToObjectHome = $A.get("e.force:navigateToObjectHome");
        if (eventToObjectHome) {
            eventToObjectHome.setParams({
                scope: "wbsendit__Subscriber_List__c"
            });
            eventToObjectHome.fire();
        } else {
            window.location.href = cmp.get('v.listdetail.listViewHomeURL');
        }
    },
    turnOffSpinner: function (cmp) {
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    turnOnSpinner: function (cmp) {
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('body-id'), "slds-hide");
    },

    showNotification: function (cmp, event, helper, msg, msgSeverity) {
        var notificationEvent = $A.get("e.wbsendit:sldsNotificationEvent");
        notificationEvent.setParams({
            msg: msg,
            msgSeverity: msgSeverity
        }).fire();
    },

    // Open the Edit Mapping Modal
    openMapRowModal: function (cmp, event, helper, mappedRowIndex) {

        // Find selected row and field details
        cmp.set('v.mappedRowIndex', mappedRowIndex);

        // Clone the mapped row so that the user can cancel
        var mappedRow = JSON.parse(JSON.stringify(cmp.get('v.mappings')[mappedRowIndex]));

        if (mappedRow.cmField === '[ReservedConsentToTrack]') {
            mappedRow.direction = 'sf2cm';
        }

        cmp.set('v.mappedRow', mappedRow);

        // Toggle default field visibility based on sync direction
        var defaultValueInput = cmp.find('b12-default-lead');
        helper.toggleDefaultVisibility(cmp, mappedRow, 'b12-default-lead');
        helper.toggleDefaultVisibility(cmp, mappedRow, 'b12-default-contact');

        // Populate Salesforce lookup fields
        helper.getSFLeadFields(cmp, event, helper, mappedRow);
        helper.getSFContactFields(cmp, event, helper, mappedRow);

        // Open Modal
        cmp.find('b12-map-field-modal').open();

    },
    doDeleteMapping: function (cmp, event, helper, mappedRowIndex) {

        // Find selected row and field details
        var delFields = cmp.get('v.deletedFields');

        var mappings = cmp.get('v.mappings');
        var mapping = mappings[mappedRowIndex];

        delFields.push(mapping.cmField);
        cmp.set('v.deletedFields', delFields);

        mappings.splice(mappedRowIndex, 1);
        cmp.set('v.mappings', mappings);
    },
    doClearMapping: function (cmp, event, helper, mappedRowIndex) {

        var mappings = cmp.get('v.mappings');

        mappings[mappedRowIndex].contactField = '';
        mappings[mappedRowIndex].contactLabel = '';
        mappings[mappedRowIndex].defaultContactValue = '';

        mappings[mappedRowIndex].leadField = '';
        mappings[mappedRowIndex].leadLabel = '';
        mappings[mappedRowIndex].defaultLeadValue = '';

        mappings[mappedRowIndex].direction = 'sf2cm';
        mappings[mappedRowIndex].directionLabel = 'Salesforce to Campaign Monitor';
        mappings[mappedRowIndex].createOnly = false;

        cmp.set('v.mappings', mappings);
    },
    doRetrospectiveSync: function (cmp, event, helper) {

        var action = cmp.get("c.refreshMappings");
        action.setParams({
            subscriberListId: cmp.get('v.listdetail.cmListId')
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();
            console.log(state);
            if (state === "SUCCESS") {
                helper.showNotification(cmp, event, helper, 'Started restrospective sync in the background', 'success');
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            helper.turnOffSpinner(cmp);
        });
        $A.enqueueAction(action);
    },
    doOpenCloneList: function (cmp, event, helper) {

        // Get all visible lists
        var action = cmp.get("c.getSubscriberLists");

        //Set up the callback
        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {
                var lists = actionResult.getReturnValue();

                // Show all lists other than the current one used for mapping
                var listId = cmp.get('v.listdetail.cmListId');
                var filteredList = [];
                for (var list in lists) {
                    if (lists[list].listId != listId) {
                        filteredList.push(lists[list]);
                    }
                }
                // Store all subscriber lists
                cmp.set("v.subscriberLists", filteredList);
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            $A.util.addClass(cmp.find('clone-spinner-id'), "slds-hide");
            $A.util.removeClass(cmp.find('clone-id'), "slds-hide");
        });
        $A.enqueueAction(action);
    },
    getSFLeadFields: function (cmp, event, helper, mappedRow) {

        var objectType = mappedRow.parentObjectLeadName == '' ? 'LEAD' : mappedRow.parentObjectLeadName;

        var action = cmp.get("c.getSalesforceFields");
        action.setParams({
            objectType: objectType,
            cmDataType: mappedRow.cmDataType,
            action: 'add',
            direction: mappedRow.direction
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {
            console.log(actionResult.getReturnValue());

            var state = actionResult.getState();
            console.log(state);
            if (state === "SUCCESS") {
                var salesforceFields = cmp.get("v.salesforceLeadFields");
                cmp.set("v.salesforceLeadFields", actionResult.getReturnValue());

            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }

        });
        $A.enqueueAction(action);
    },
    getSFContactFields: function (cmp, event, helper, mappedRow) {

        var objectType = mappedRow.parentObjectContactName == '' ? 'CONTACT' : mappedRow.parentObjectContactName;

        var action = cmp.get("c.getSalesforceFields");
        action.setParams({
            objectType: objectType,
            cmDataType: mappedRow.cmDataType,
            action: 'add',
            direction: mappedRow.direction
        });

        //Set up the callback
        action.setCallback(this, function (actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var salesforceFields = cmp.get("v.salesforceContactFields");
                cmp.set("v.salesforceContactFields", actionResult.getReturnValue());
            } else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    doAddRow: function (cmp, event, helper) {

        var selectedField = cmp.get('v.selectedField');
        var newSelectedField = cmp.get('v.newSelectedField');
        if (!newSelectedField) {
            newSelectedField = selectedField;
        }
        var baseObject = cmp.get("v.createFieldPrimaryObjectLabel");

        if (selectedField) {

            // Empty mapping row
            var newMappingRow = JSON.parse('{"cmDataType": "Text", "cmField": "", "cmLabel": "", "contactField": "", "contactLabel": "", "contactRequired": false, "direction": "sf2cm", "directionLabel": "Salesforce to Campaign Monitor", "leadField": "", "leadLabel": "", "leadRequired": false, "parentObjectContactField": "", "parentObjectContactLabel": "", "parentObjectContactName": "", "parentObjectLeadField": "", "parentObjectLeadLabel": "", "parentObjectLeadName": "", "reservedField": false }');

            var fieldName = selectedField.fieldName;
            var fieldLabel = selectedField.fieldText;
            if (newSelectedField.fieldRelation) {
                fieldName = newSelectedField.fieldRelation + '.' + selectedField.fieldName;
                fieldLabel = newSelectedField.fieldText + ': ' + selectedField.fieldText;
            }

            if (baseObject.toUpperCase() == 'CONTACT') {
                newMappingRow.contactField = fieldName;
                newMappingRow.contactLabel = fieldLabel;
                newMappingRow.contactRequired = false;
                newMappingRow.parentObjectContactField = selectedField.fieldName;
                newMappingRow.parentObjectContactLabel = newSelectedField.fieldText;
                newMappingRow.parentObjectContactName = newSelectedField.parentName;
                newMappingRow.parentObjectContactRelation = newSelectedField.fieldRelation;

            } else {
                newMappingRow.leadField = fieldName;
                newMappingRow.leadLabel = fieldLabel;
                newMappingRow.leadRequired = false;
                newMappingRow.parentObjectLeadField = selectedField.fieldName;
                newMappingRow.parentObjectLeadLabel = newSelectedField.fieldText;
                newMappingRow.parentObjectLeadName = newSelectedField.parentName;
                newMappingRow.parentObjectLeadRelation = newSelectedField.fieldRelation;
            }
            newMappingRow.cmField = '[' + selectedField.fieldText.replace(/\s/g, '') + ']';
            newMappingRow.cmLabel = selectedField.fieldText;
            newMappingRow.cmDataType = selectedField.cmDataType;
            newMappingRow.createOnly = false;
            newMappingRow.directionLabel = 'Salesforce to Campaign Monitor';
            var mappings = cmp.get("v.mappings");
            mappings.push(newMappingRow);
            cmp.set("v.mappings", mappings);
        }
    },
    toggleParentBreadcrumb: function (cmp, turnon, label) {

        var parentBreadcrumb = cmp.find('parentBreadcrumb');
        if (turnon) {
            $A.util.addClass(parentBreadcrumb, 'slds-show');
            $A.util.removeClass(parentBreadcrumb, 'slds-hide');
            cmp.set("v.breadCrumbParentLabel", label);
        } else {
            $A.util.addClass(parentBreadcrumb, 'slds-hide');
            $A.util.removeClass(parentBreadcrumb, 'slds-show');
            cmp.set("v.breadCrumbParentLabel", '');
        }
    },
    toggleDefaultVisibility: function (cmp, mappedRow, id) {

        var defaultValueInput = cmp.find(id);
        if (mappedRow.direction == 'cm2sf') {
            $A.util.addClass(defaultValueInput, 'slds-show');
            $A.util.removeClass(defaultValueInput, 'slds-hide');
        } else {
            $A.util.addClass(defaultValueInput, 'slds-hide');
            $A.util.removeClass(defaultValueInput, 'slds-show');
        }
    },
    resetSalesforceFieldList: function (cmp, helper, mappedRow, objectType) {

        if (objectType == 'contact') {
            mappedRow.parentObjectContactLabel = '';
            mappedRow.parentObjectContactName = '';
            mappedRow.parentObjectContactField = '';
            mappedRow.contactField = '';
            mappedRow.contactLabel = '';
            mappedRow.defaultContactValue = '';
            mappedRow.createOnly = false;
            mappedRow.contactRequired = false;
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFContactFields(cmp, event, helper, mappedRow);
        } else {
            mappedRow.parentObjectLeadLabel = '';
            mappedRow.parentObjectLeadName = '';
            mappedRow.parentObjectLeadField = '';
            mappedRow.leadField = '';
            mappedRow.leadLabel = '';
            mappedRow.defaultLeadValue = '';
            mappedRow.createOnly = false;
            mappedRow.leadRequired = false;
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFLeadFields(cmp, event, helper, mappedRow);
        }
    },
    validateMapping: function (cmp, cmDataType, value, defaultInput, selectedItem) {

        if (selectedItem.fieldName == '' || !value) {
            return;
        }

        if (selectedItem.fieldLength && selectedItem.fieldLength > 0) {
            if (value.length > selectedItem.fieldLength) {
                defaultInput.set("v.errors", [{ message: "Value is too long" }]);
            }
        }

        if (cmDataType == "Number") {
            var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
            if (!numericReg.test(value)) {
                defaultInput.set("v.errors", [{ message: "Invalid number" }]);
            } else {
                defaultInput.set("v.errors", null);
            }
        } else if (cmDataType == "ID") {
            var idReg = /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/;
            if (!idReg.test(value)) {
                defaultInput.set("v.errors", [{ message: "Invalid Saleforce ID" }]);
            } else {
                defaultInput.set("v.errors", null);
            }
        } else if (cmDataType == "Date") {
            var dateReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}(\s{1}[0-2]{1}[0-9]{1}:[0-9]{2}:[0-9]{2})?$/;
            if (!dateReg.test(value)) {
                defaultInput.set("v.errors", [{ message: "Invalid Date (yyyy-mm-dd)" }]);
            } else {
                defaultInput.set("v.errors", null);
            }
        }
    },

})