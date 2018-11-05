({
    onInit: function (cmp, event, helper) {

        helper.turnOnSpinner(cmp);

        cmp.set('v.deletedFields', []);
        cmp.set('v.deleteCMFields', false);

        helper.doGetListDetails(cmp, event, helper);
    },
    onEditMappings: function (cmp, event, helper) {
        cmp.set('v.showEdit', true);
    },
    onCancel: function (cmp, event, helper) {
        helper.turnOnSpinner(cmp);
        cmp.set('v.showEdit', false);
        helper.doGetListDetails(cmp, event, helper);
    },
    onCloneMapping: function (cmp, event, helper) {

        $A.util.removeClass(cmp.find('clone-spinner-id'), "slds-hide");
        $A.util.addClass(cmp.find('clone-id'), "slds-hide");

        helper.doOpenCloneList(cmp, event, helper);
        cmp.find('b12-clone-modal').open();
    },
    onMappingRowMenu: function (cmp, event, helper) {

        var selectedMenuItemValue = event.getParam("value");

        var mappedRowIndex = selectedMenuItemValue.split(":")[1];

        if (selectedMenuItemValue.split(":")[0] === 'editItem') {
            helper.openMapRowModal(cmp, event, helper, mappedRowIndex);
        }
        if (selectedMenuItemValue.split(":")[0] === 'deleteItem') {
            cmp.find('b12-delete-field-confirm').open();
            cmp.set('v.deletedFieldId', mappedRowIndex);
        }
        if (selectedMenuItemValue.split(":")[0] === 'clearItem') {
            helper.doClearMapping(cmp, event, helper, mappedRowIndex);
        }

    },
    onDeleteMapping: function (cmp, event, helper) {
        cmp.find('b12-delete-field-confirm').close();
        helper.doDeleteMapping(cmp, event, helper, cmp.get('v.deletedFieldId'));
    },
    onEnableSalesforceId: function (cmp, event, helper) {

        var buttonstate = cmp.get('v.enableSalesforceId');
        cmp.set('v.enableSalesforceId', !buttonstate);

        var mappings = cmp.get("v.mappings");
        if (!buttonstate) {
            var salesforceIdMapping = JSON.parse('{ "cmDataType": "Text", "cmField": "[SalesforceId]", "cmLabel": "Salesforce Id", "contactField": "Id", "contactLabel": "Contact Id", "contactRequired": false, "direction": "sf2cm", "directionLabel": "Salesforce to Campaign Monitor", "leadField": "Id", "leadLabel": "Lead Id", "leadRequired": false, "parentObjectContactField": "", "parentObjectContactLabel": "", "parentObjectContactName": "", "parentObjectLeadField": "", "parentObjectLeadLabel": "", "parentObjectLeadName": "", "reservedField": false }');
            mappings.push(salesforceIdMapping);

            // Remove the SalesforceId from the delete list (if it exists)
            var delFields = cmp.get('v.deletedFields');
            for (var i = 0; i < delFields.length; i++) {
                var field = delFields[i];
                if (field === "[SalesforceId]") {
                    delFields.splice(i, 1);
                    cmp.set('v.deletedFields', delFields);
                    break;
                }
            }
        } else {
            for (var i = 0; i < mappings.length; i++) {
                var map = mappings[i];
                var delFields = cmp.get('v.deletedFields');
                if (map.cmField === "[SalesforceId]") {
                    mappings.splice(i, 1); // Delete the mapping row
                    delFields.push("[SalesforceId]");
                    cmp.set('v.deletedFields', delFields);
                    break;
                }
            }
        }
        cmp.set("v.mappings", mappings);

    },
    onRetrospectiveSyncConfirm: function (cmp, event, helper) {
        helper.turnOnSpinner(cmp);
        cmp.find('b12-retro-confirm').close();
        helper.doRetrospectiveSync(cmp, event, helper);
    },
    onRetrospectiveSync: function (cmp, event, helper) {
        cmp.find('b12-retro-confirm').open();
    },
    onBack: function (cmp, event, helper) {
        helper.doNavigateBack(cmp, event, helper);
    },
    openCloneModal: function (cmp, event, helper) {
        cmp.find('b12-clone-modal').open();
    },
    radioSelectObject: function (cmp, event, helper) {

        // When adding a new row, default to Contact, all fields, SF to CM
        var objectType = event.target.id == 'selectedObjectLead' ? 'Lead' : 'Contact';
        cmp.set("v.createFieldPrimaryObjectLabel", objectType);

        // Hide the parent breadcrumb
        helper.toggleParentBreadcrumb(cmp, false, '');

        // Get salesforce fields and populate the list
        helper.getSFFields(cmp, event, helper, objectType, '', 'sf2cm');
    },
    selectRootBreadcrumb: function (cmp, event, helper) {

        var selectedObjectContact = cmp.find("selectedObjectContact");

        var objectType = 'Contact';
        if (selectedObjectContact.getElement().checked) {
            cmp.set("v.createFieldPrimaryObjectLabel", 'Contact');
        } else {
            objectType = 'Lead';
            cmp.set("v.createFieldPrimaryObjectLabel", 'Lead');
        }
        helper.toggleParentBreadcrumb(cmp, false, '');

        // Get salesforce fields and populate the list
        helper.getSFFields(cmp, event, helper, objectType, '', 'sf2cm');
    },
    selectField: function (cmp, event, helper) {

        // Get the current Salesforce Fields object for the selected list item
        var selectedItem = cmp.get('v.salesforceFields')[event.target.selectedIndex];
        var parentObject = cmp.get("v.breadCrumbParentLabel");
        cmp.set('v.selectedField', selectedItem);

        // If the user selects a parent field E.g. Contact.Account and it's only
        // one level deep (i.e. not 'Contact.Account.D-U-N-S Number')
        if (selectedItem.fieldType == 'REFERENCE' && parentObject == '') {

            helper.toggleParentBreadcrumb(cmp, true, selectedItem.fieldText);

            cmp.set('v.newSelectedField', selectedItem);

            // Check if it is a reference field, if it is, then reload the pick list.
            helper.getSFFields(cmp, event, helper, selectedItem.parentName, '', 'sf2cm');
        }
    },
    addRow: function (cmp, event, helper) {

        cmp.set('v.createFieldPrimaryObjectLabel', 'Contact');
        cmp.set('v.breadCrumbParentLabel', '');

        cmp.find('b12-add-field-modal').open();

        // Populate fields
        helper.getSFFields(cmp, event, helper, 'CONTACT', '', 'sf2cm');
    },
    saveCreateField: function (cmp, event, helper) {

        helper.doAddRow(cmp, event, helper);
        cmp.find('b12-add-field-modal').close();
    },
    clickRootBreadCrumb: function (cmp, event, helper) {

        var mappedRow = cmp.get('v.mappedRow');

        var objectType = event.target.getAttribute('data-object');
        if (objectType == 'contact') {
            mappedRow.parentObjectContactLabel = '';
            mappedRow.parentObjectContactName = '';
            mappedRow.parentObjectContactField = '';
            mappedRow.contactField = '';
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFContactFields(cmp, event, helper, mappedRow);
        } else {
            mappedRow.parentObjectLeadLabel = '';
            mappedRow.parentObjectLeadName = '';
            mappedRow.parentObjectLeadField = '';
            mappedRow.leadField = '';
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFLeadFields(cmp, event, helper, mappedRow);
        }
    },
    // Switch direction with the edit mapping modal
    onSwitchMapDirection: function (cmp, event, helper) {

        // Find selected row and field details
        var mappedRow = cmp.get('v.mappedRow');
        mappedRow.direction = event.getParam("value");
        mappedRow.directionLabel = mappedRow.direction == 'sf2cm' ? 'Salesforce to Campaign Monitor' : 'Campaign Monitor to Salesforce';
        cmp.set('v.mappedRow', mappedRow);

        // Toggle default field visibility based on sync direction
        var defaultValueInput = cmp.find('b12-default-value-lead');
        helper.toggleDefaultVisibility(cmp, mappedRow, 'b12-default-lead');
        helper.toggleDefaultVisibility(cmp, mappedRow, 'b12-default-contact');


        // Reset SF picklist
        helper.resetSalesforceFieldList(cmp, helper, mappedRow, 'contact');
        helper.resetSalesforceFieldList(cmp, helper, mappedRow, 'lead');

    },
    selectLeadField: function (cmp, event, helper) {

        // Get the current Salesforce Fields object for the selected list item
        var selectedItem = cmp.get('v.salesforceLeadFields')[event.target.selectedIndex];
        var mappedRow = cmp.get('v.mappedRow');

        if (!selectedItem.fieldName) {
            mappedRow.defaultLeadValue = '';
        }

        if (selectedItem.fieldType == 'REFERENCE' && mappedRow.parentObjectLeadLabel == '') {
            // Reset breadcrumb and refresh SF list with new parent
            mappedRow.parentObjectLeadLabel = selectedItem.fieldText;
            mappedRow.parentObjectLeadName = selectedItem.parentName;
            mappedRow.parentObjectLeadRelation = selectedItem.fieldRelation;
            mappedRow.leadField = '';
            mappedRow.leadLabel = '';
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFLeadFields(cmp, event, helper, mappedRow);
        } else if (mappedRow.parentObjectLeadLabel != '') {
            mappedRow.leadField = mappedRow.parentObjectLeadRelation + '.' + selectedItem.fieldName;
            mappedRow.leadLabel = mappedRow.parentObjectLeadLabel + ': ' + selectedItem.fieldText;
            mappedRow.parentObjectLeadField = selectedItem.fieldName;
            cmp.set('v.mappedRow', mappedRow);
        } else {
            mappedRow.leadField = selectedItem.fieldName;
            mappedRow.leadLabel = selectedItem.fieldText;
            cmp.set('v.mappedRow', mappedRow);
        }
    },
    selectContactField: function (cmp, event, helper) {

        // Get the current Salesforce Fields object for the selected list item
        var selectedItem = cmp.get('v.salesforceContactFields')[event.target.selectedIndex];
        var mappedRow = cmp.get('v.mappedRow');
        if (!mappedRow) {
            mappedRow = {};
        }

        if (!selectedItem.fieldName) {
            mappedRow.defaultContactValue = '';
        }

        if (selectedItem.fieldType == 'REFERENCE' && mappedRow.parentObjectContactLabel == '') {
            // Reset breadcrumb and refresh SF list with new parent
            mappedRow.parentObjectContactLabel = selectedItem.fieldText;
            mappedRow.parentObjectContactName = selectedItem.parentName;
            mappedRow.parentObjectContactRelation = selectedItem.fieldRelation;
            mappedRow.contactField = '';
            mappedRow.contactLabel = '';
            cmp.set('v.mappedRow', mappedRow);
            helper.getSFContactFields(cmp, event, helper, mappedRow);
        } else if (mappedRow.parentObjectContactLabel != '') {
            mappedRow.contactField = mappedRow.parentObjectContactRelation + '.' + selectedItem.fieldName;
            mappedRow.contactLabel = mappedRow.parentObjectContactLabel + ': ' + selectedItem.fieldText;
            mappedRow.parentObjectContactField = selectedItem.fieldName;
            cmp.set('v.mappedRow', mappedRow);
        } else {
            mappedRow.contactField = selectedItem.fieldName;
            mappedRow.contactLabel = selectedItem.fieldText;
            cmp.set('v.mappedRow', mappedRow);
        }
    },

    saveMap: function (cmp, event, helper) {

        var mappedRow = cmp.get('v.mappedRow');

        var defaultLeadInput = cmp.find('b12-default-lead-value');
        var defaultContactInput = cmp.find('b12-default-contact-value');
        var cmFieldInput = cmp.find('b12-cm-field-value');

        // Check we have a CM field
        if (mappedRow.cmLabel == '') {
            cmFieldInput.set("v.errors", [{ message: "Campaign Monitor Field is Required" }]);
        } else {
            cmFieldInput.set("v.errors", null);
        }

        if (mappedRow.direction == 'cm2sf') {
            // Validate Lead default values
            var leadListIndex = document.getElementById('b12-select-lead-id').selectedIndex;
            var selectedLeadItem = cmp.get('v.salesforceLeadFields')[leadListIndex];
            helper.validateMapping(cmp, mappedRow.cmDataType, mappedRow.defaultLeadValue, defaultLeadInput, selectedLeadItem);

            // Validate Lead default values
            var contactListIndex = document.getElementById('b12-select-contact-id').selectedIndex;
            var selectedContactItem = cmp.get('v.salesforceContactFields')[contactListIndex];
            helper.validateMapping(cmp, mappedRow.cmDataType, mappedRow.defaultContactValue, defaultContactInput, selectedContactItem);
        } else {
            mappedRow.direction = 'sf2cm';
        }

        if ($A.util.isEmpty(defaultLeadInput.get("v.errors")) && $A.util.isEmpty(defaultContactInput.get("v.errors")) && $A.util.isEmpty(cmFieldInput.get("v.errors"))) {

            var mappedRowIndex = cmp.get('v.mappedRowIndex');
            var mappings = cmp.get('v.mappings');

            // Assign mapped row
            mappings[mappedRowIndex] = mappedRow;

            cmp.set("v.mappings", mappings);

            cmp.find('b12-map-field-modal').close();
        }

    },
    onSaveMappings: function (cmp, event, helper) {
        cmp.find('b12-save-confirm').open();
    },
    onSaveMappinsConfirmed: function (cmp, event, helper) {

        helper.turnOnSpinner(cmp);
        cmp.set('v.showEdit', false);
        cmp.find('b12-save-confirm').close();
        helper.doSaveMappings(cmp, event, helper, '', true);
    },
    onMultiSelectChange: function (cmp, event, helper) {

        var selectCmp = cmp.find("b12-other-lists-id");
        cmp.set('v.otherSubscriberLists', selectCmp.get("v.value"));
        cmp.set('v.disableCloneOkayButton', false);

    },
    storeMappingsToMultipleLists: function (cmp, event, helper) {

        helper.doSaveMappings(cmp, event, helper, cmp.get('v.otherSubscriberLists'), cmp.find('clone-delete-id').get('v.checked'));
        cmp.find('b12-clone-modal').close();
    },

})