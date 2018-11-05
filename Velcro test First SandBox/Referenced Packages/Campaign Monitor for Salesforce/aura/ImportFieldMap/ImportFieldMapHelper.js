({
    doGetFields: function(cmp, event, helper) {

        // Get mappings fomr
        var action = cmp.get("c.getMappings");
        action.setParams({
            importType: cmp.get('v.importConfig.importType'),
            importTypeParam: cmp.get('v.importConfig.importTypeId'),
            listId: cmp.get('v.importConfig.listId'),
            scheduledId: cmp.get('v.importConfig.scheduledId')
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var mappings = actionResult.getReturnValue();

                // Set the theme
                helper.setTheme(cmp, mappings.theme);

                cmp.set('v.importConfig.isSegmentEnabled', mappings.isSegmentEnabled);
                helper.fireWizardEvent(cmp, event, helper);

                // This builds the Salesforce field map and table
                cmp.set("v.fieldMap", mappings);

                // Build the CM picklist list
                var cmFieldList = [];
                cmFieldList.push({ class: "optionClass", label: "Nothing (skip)", value: "none", selected: true });
                cmFieldList.push({ class: "optionClass", label: " ", value: "blank", selected: false, disabled: true });

                var hasSalesforceId = false;
                for (var i = 0; i < mappings.cmFields.length; i += 1) {
                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = mappings.cmFields[i].FieldName;
                    optionTemplate.value = mappings.cmFields[i].Key;
                    if (mappings.cmFields[i].Key === '[SalesforceId]') {
                        hasSalesforceId = true;
                    }
                    cmFieldList.push(optionTemplate);
                }
                if (!hasSalesforceId) {
                    cmFieldList.push({ class: "optionClass", label: "Salesforce Id", value: "[SalesforceId]", selected: false, disabled: false });
                }
                cmFieldList.push({ class: "optionClass", label: " ", value: "blank", selected: false, disabled: true });
                cmFieldList.push({ class: "optionClass", label: "New text field", value: "newFieldText", selected: false });
                cmFieldList.push({ class: "optionClass", label: "New numeric field", value: "newFieldNumeric", selected: false });
                cmFieldList.push({ class: "optionClass", label: "New date field", value: "newFieldDate", selected: false });

                var mappedEmail = false;

                // Loop through all the salesforce records and push the CM fields to it (and default any existing values)
                for (var j = 0; j < mappings.allFields.length; j += 1) {

                    var cmFieldListRef = mappings.allFields.length === 1 ? cmp.find('cm-field-list-id') : cmp.find('cm-field-list-id')[j];

                    // Clone the CM field list and assign it to the inputSelect picklist
                    cmFieldListRef.set("v.options", (JSON.parse(JSON.stringify(cmFieldList))));

                    // Attempt to auto match an email fields
                    if (mappings.allFields[j].sfLabel.match(/email$/i) && !mappedEmail) {
                        cmFieldListRef.set("v.value", 'EmailAddress');
                        cmp.set('v.importConfig.isNextDisabled', false);
                        mappedEmail = true;
                        helper.fireWizardEvent(cmp, event, helper);
                    }

                    // Default values
                    if (mappings.allFields[j].cmName) {
                        cmFieldListRef.set("v.value", mappings.allFields[j].cmName);
                    }
                }
                helper.validateMapping(cmp, event, helper);

                // Turn off spinner
                $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                $A.util.removeClass(cmp.find('table-wrapper-id'), "slds-hide");

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
    // User maps a field
    validateMapping: function(cmp, event, helper) {

        // Validate the selection, and if okay, enable the Next button
        // The email field needs to be populated, but only once
        var validSelection = 0;

        // Loop through each of the mapping rows in the table
        for (var i = 0; i < cmp.find("cm-field-list-id").length; i += 1) {

            var cmFieldListRef = cmp.find("cm-field-list-id").length === 1 ? cmp.find('cm-field-list-id') : cmp.find('cm-field-list-id')[i];


            // Set CM field in the mapping (if it's a real field)
            if (!(/(^none$|^blank$|^newField.*$)/.test(cmFieldListRef.get('v.value')))) { // eslint-disable-line
                cmp.get("v.fieldMap").allFields[i].cmName = cmFieldListRef.get('v.value');
            } else {
                cmp.get("v.fieldMap").allFields[i].cmName = '';
            }

            // Reset any warning
            $A.util.removeClass(cmp.find("selectFormElementId")[i], "slds-has-error");
            $A.util.addClass(cmp.find("error-message-id")[i], "slds-hide");

            if (cmFieldListRef.get('v.value') === 'EmailAddress') {

                // Display an error msg if the email field has been mapped more than once
                if (validSelection > 0) {
                    $A.util.addClass(cmp.find("selectFormElementId")[i], "slds-has-error");
                    $A.util.removeClass(cmp.find("error-message-id")[i], "slds-hide");
                }

                validSelection++;
            }

        }

        // Update dialog model Next button
        cmp.set('v.importConfig.isNextDisabled', !(validSelection === 1));
        cmp.set('v.showEmailWarning', (validSelection === 0));

        helper.fireWizardEvent(cmp, event, helper);

    },
    setTheme: function(cmp, theme) {

        if (theme === 'Theme3' || theme === 'Theme2') {
            cmp.set("v.isLEX", false);
        } else if (theme === 'Theme4d') {
            cmp.set("v.isLEX", true);
        } else if (theme === 'Theme4t') {
            cmp.set("v.isLEX", false);
        }
    },
    fireWizardEvent: function(cmp, event, helper) {

        // cmp.set('v.importConfig.fieldMap', cmp.get('v.fieldMap'));
        var importConfig = cmp.get('v.importConfig');
        importConfig.fieldMap = cmp.get('v.fieldMap');

        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({ "importConfig": importConfig });
        compEvent.fire();
    },

})