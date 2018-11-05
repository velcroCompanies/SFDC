({
    doGetAllRules: function(cmp, event, helper) {

        var action = cmp.get("c.getRules");
        action.setParams({
            "sfListId": cmp.get('v.listId') || '',
            "ruleId": cmp.get('v.ruleId') || '',
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var ruledetails = actionResult.getReturnValue();
                cmp.set('v.ruledetails', ruledetails);

                if (cmp.get('v.ruleId')) {
                    for (var i = 0; i < ruledetails.length; i++) {
                        var ruledetail = ruledetails[i];
                        if (ruledetail.id && ruledetail.id.startsWith(cmp.get('v.ruleId'))) {
                            var ruleAction = ruledetail.action + ruledetail.ruleObject;

                            helper.doListMenuSelectItem(cmp, event, helper, ruleAction);
                            return;
                        }
                    }
                }

                // Get the first populated rule (empty ones are always later in the list)
                for (var j = 0; j < ruledetails.length; j++) {

                    var ruledetail = ruledetails[j];
                    // var ruleAction = cmp.get('v.ruleaction') + cmp.get('v.ruleobject');
                    var ruleAction = ruledetail.action + ruledetail.ruleObject;

                    helper.doListMenuSelectItem(cmp, event, helper, ruleAction);
                    return;
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
    doListMenuSelectItem: function(cmp, event, helper, ruleAction) {

        helper.turnOnSpinner(cmp);

        ruleAction = ruleAction.toLowerCase();

        var evaluationOptionsAdd = [
            { 'label': 'Only when a record is created', 'value': 'Only when a record is created' },
            { 'label': 'Only when a record is edited', 'value': 'Only when a record is edited' },
            { 'label': 'Every time a record is created or edited', 'value': 'Every time a record is created or edited' }
        ];
        var evaluationOptionsDel = [
            { 'label': 'Only when a record is edited', 'value': 'Only when a record is edited' },
        ];

        cmp.set('v.evalTooltipStyle', 'left: 103px; top: -78px');

        if (ruleAction === 'addcontact') {
            cmp.set('v.ruleaction', 'Add');
            cmp.set('v.ruleobject', 'Contact');
            cmp.set('v.ruleActionLabel', 'Add Contact Subscriber Rule');
            cmp.set('v.evaluationOptions', evaluationOptionsAdd);
        } else if (ruleAction === 'deletecontact') {
            cmp.set('v.ruleaction', 'Delete');
            cmp.set('v.ruleobject', 'Contact');
            cmp.set('v.ruleActionLabel', 'Delete Contact Subscriber Rule');
            cmp.set('v.evaluationOptions', evaluationOptionsDel);
            cmp.set('v.evalTooltipStyle', 'left: 103px; top: -38px');
        } else if (ruleAction === 'addlead') {
            cmp.set('v.ruleaction', 'Add');
            cmp.set('v.ruleobject', 'Lead');
            cmp.set('v.ruleActionLabel', 'Add Lead Subscriber Rule');
            cmp.set('v.evaluationOptions', evaluationOptionsAdd);
        } else if (ruleAction === 'deletelead') {
            cmp.set('v.ruleaction', 'Delete');
            cmp.set('v.ruleobject', 'Lead');
            cmp.set('v.ruleActionLabel', 'Delete Lead Subscriber Rule');
            cmp.set('v.evaluationOptions', evaluationOptionsDel);
            cmp.set('v.evalTooltipStyle', 'left: 103px; top: -38px');
        }

        var ruledetails = cmp.get('v.ruledetails');
        for (var i = 0; i < ruledetails.length; i++) {

            var ruledetail = ruledetails[i];

            cmp.set('v.isRuleActive', !ruledetail.disabled);

            var ruleAction = cmp.get('v.ruleaction') + cmp.get('v.ruleobject');
            if (ruledetail.action === cmp.get('v.ruleaction') && ruledetail.ruleObject === cmp.get('v.ruleobject')) {
                cmp.set('v.ruledetail', ruledetail);
                break;
            }

        }

        // Initialise the Criteria
        var criteria = ruledetail.criteria ? JSON.parse(ruledetail.criteria) : [];

        helper.doGetFields(cmp, event, helper, criteria);

    },
    doGetFields: function(cmp, event, helper, criteria) {

        var action = cmp.get("c.getFields");
        action.setParams({
            "sObjectType": cmp.get('v.ruleobject'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var allFields = actionResult.getReturnValue();
                cmp.set('v.allFields', allFields);

                var ops = {
                    boolean: ["equals", "notequalto"],
                    double: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
                    integer: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
                    string: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
                    datetime: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
                    date: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
                    picklist: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
                    multipicklist: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
                    none: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal", "startswith", "contains", "doesnotcontain"]
                };

                var opNames = { "equals": "equals", "notequalto": "not equal to", "lessthan": "less than", "lessorequal": "less or equal", "greaterthan": "greater than", "greaterorequal": "greater or equal", "startswith": "starts with", "contains": "contains", "doesnotcontain": "does not contain" };
                var typeMap = { "boolean": "boolean", "double": "number", "integer": "number", "picklist": "general", "multipicklist": "general", "string": "general", "date": "general", "datetime": "general" };

                // Loop through each criteria
                var rules = [];
                for (var i = 0; i < 5; i++) {

                    var rule = {};

                    // Add fields
                    var fieldList = [{ "class": "optionClass", "label": "-- None --", "value": "none", "selected": true }];

                    var storedRuleCriteria = criteria[i] ? criteria[i] : '';

                    for (var j = 0; j < allFields.length; j++) {
                        var fieldObject = allFields[j];

                        var selectedField = ((storedRuleCriteria) ? (storedRuleCriteria && storedRuleCriteria.fieldName === fieldObject.fieldName) : false);
                        if (selectedField) {
                            // rule.selectedField = fieldObject.fieldName;
                            rule.selectedField = j;
                        }

                        // add the field to the select list and set the selected list to true if there is a match
                        fieldList.push({ class: "optionClass", label: fieldObject.fieldLabel, value: j, selected: selectedField });
                    }
                    rule.fields = fieldList;

                    // Set default input box type
                    rule.inputType = 'general';
                    rule.isPicklist = false;
                    rule.isDate = false;

                    // Add operators
                    var operatorList = [{ "class": "optionClass", "label": "-- None --", "value": "none", "selected": true }];
                    if (storedRuleCriteria) {

                        var fieldTypeName = storedRuleCriteria.fieldTypeName.toLowerCase();
                        var operatorName = storedRuleCriteria.operatorName.toLowerCase();

                        // Loop through the appropriate operators for this field type (E.g. BOOLEAN = equals, notequalto)
                        var operatorObj = ops[fieldTypeName];
                        for (var k = 0; k < ops[fieldTypeName].length; k++) {
                            operatorList.push({ class: "optionClass", label: opNames[operatorObj[k]], value: operatorObj[k], selected: operatorObj[k] === operatorName });

                            if (operatorObj[k] === operatorName) {
                                rule.selectedOperation = operatorName;
                            }
                        }
                        rule.operators = operatorList;

                        // Enable components
                        rule.criteriaDisabled = false;
                        rule.isPicklist = storedRuleCriteria.isPickList;
                        rule.isDate = fieldTypeName === 'date' || fieldTypeName === 'datetime';

                        // Set input box type based on field type
                        rule.inputType = typeMap[fieldTypeName];

                        if (rule.inputType === 'boolean') {
                            rule.value = storedRuleCriteria.value.toLowerCase();
                        } else {
                            rule.value = storedRuleCriteria.value;
                        }

                    } else {
                        // Add them all / or disable the list until a field has been selected
                        for (var h = 0; h < ops['none'].length; h++) {
                            operatorList.push({ class: "optionClass", label: opNames[ops[h]], value: ops[h], selected: false });
                        }
                        rule.operators = operatorList;
                        rule.value = '';
                        rule.criteriaDisabled = true;
                    }
                    rule.ruleIndex = i + 1;

                    rules.push(rule);

                }
                cmp.set('v.rules', rules);


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
        });
        $A.enqueueAction(action);
    },

    doSelectField: function(cmp, event, helper) {
        debugger
        var selectedCriteriaIndex = parseInt(event.getSource().get('v.name').match(/[0-9]+$/)[0]) - 1; // Extract "5" from "rule-field-5"

        // If user has selected none, then clear out the values from the rule item down
        if (event.getSource().get('v.value') === 'none') {
            var operatorList = [{ "class": "optionClass", "label": "-- None --", "value": "none", "selected": true }];

            for (var i = selectedCriteriaIndex; i < cmp.get('v.rules').length; i++) {
                cmp.get('v.rules')[i].operators = operatorList;
                cmp.get('v.rules')[i].inputType = 'general';
                cmp.get('v.rules')[i].selectedField = 'none';
                cmp.get('v.rules')[i].isDate = false;
                cmp.get('v.rules')[i].isPicklist = false;
                cmp.get('v.rules')[i].value = '';
                if (i > selectedCriteriaIndex) {
                    cmp.get('v.rules')[i].criteriaDisabled = true;
                }
            }
            cmp.set('v.ruledetail.logic', '');
            cmp.set('v.rules', cmp.get('v.rules'));

            return;
        }

        var selectedFieldIndex = parseInt(event.getSource().get('v.value')); // 2 = City

        // Get details of the selected field
        var fieldObject = cmp.get('v.allFields')[selectedFieldIndex];

        // Get rule
        var rule = cmp.get('v.rules')[selectedCriteriaIndex];

        // Disabled / enabled the criteria fields
        cmp.get('v.rules')[selectedCriteriaIndex].criteriaDisabled = false;

        // set the selected field (otherwise it resets itself)
        cmp.get('v.rules')[selectedCriteriaIndex].selectedField = selectedFieldIndex;

        // set operator picklist
        var ops = {
            boolean: ["equals", "notequalto"],
            double: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
            integer: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
            string: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
            datetime: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
            date: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal"],
            picklist: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
            multipicklist: ["equals", "notequalto", "startswith", "contains", "doesnotcontain"],
            none: ["equals", "notequalto", "lessthan", "lessorequal", "greaterthan", "greaterorequal", "startswith", "contains", "doesnotcontain"]
        };

        var opNames = { "equals": "equals", "notequalto": "not equal to", "lessthan": "less than", "lessorequal": "less or equal", "greaterthan": "greater than", "greaterorequal": "greater or equal", "startswith": "starts with", "contains": "contains", "doesnotcontain": "does not contain" };
        var typeMap = { "boolean": "boolean", "double": "number", "integer": "number", "picklist": "general", "multipicklist": "general", "string": "general", "date": "general", "datetime": "general" };

        var fieldTypeName = fieldObject.fieldType.toLowerCase();
        var operatorObj = ops[fieldTypeName];

        var operatorList = [{ "class": "optionClass", "label": "-- None --", "value": "none", "selected": true }];
        for (var k = 0; k < ops[fieldTypeName].length; k++) {
            operatorList.push({ class: "optionClass", label: opNames[operatorObj[k]], value: operatorObj[k], selected: false });
        }

        // Set the appropriate operators for this field type
        cmp.get('v.rules')[selectedCriteriaIndex].operators = operatorList;

        // Set the type of input box to show (E.g. Boolean, String, Number)
        cmp.get('v.rules')[selectedCriteriaIndex].inputType = typeMap[fieldTypeName];

        // set whether we show the picklist or date box
        cmp.get('v.rules')[selectedCriteriaIndex].isPicklist = fieldTypeName === 'picklist' || fieldTypeName === 'multipicklist';
        cmp.get('v.rules')[selectedCriteriaIndex].isDate = fieldTypeName === 'date' || fieldTypeName === 'datetime';

        // Update the main rules object so the table refreshes/updates
        cmp.set('v.rules', cmp.get('v.rules'));

    },
    doGetPicklistValues: function(cmp, event, helper, objName, fieldName, existingValues) {

        var action = cmp.get("c.getPicklistValues");
        action.setParams({
            "objName": objName,
            "fieldName": fieldName
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {

                var picklist = actionResult.getReturnValue();

                var available = [];
                var selected = [];

                // Which ones are already selected? Split by comma
                var reg = new RegExp('(".*?"|[^",\s]+)(?=\s*,|\s*$)', 'g');
                var arr = existingValues.match(reg);
                arr = arr || [];

                // Replace '"One, Two"' with 'One, Two'
                arr = arr.map(arrValue => {
                    return arrValue.replace(new RegExp('"', 'g'), '');
                });

                for (var i = 0; i < picklist.length; i++) {

                    var item = { label: picklist[i], value: picklist[i], selected: false };
                    if (arr.indexOf(picklist[i]) > -1) {
                        selected.push(item);
                    } else {
                        available.push(item);
                    }

                }

                cmp.set('v.availableClients', available);
                cmp.set('v.selectedClients', selected);

                cmp.find('b12-picklist-modal').open();

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

    doGetRuleListDetails: function(cmp, event, helper) {

        var action = cmp.get("c.getSubscriberListDetail");
        action.setParams({
            "sfListId": cmp.get('v.listId'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var listdetail = actionResult.getReturnValue();
                cmp.set('v.listdetail', listdetail);

                // helper.doGetOperatorList(cmp, event, helper);

                helper.doGetAllRules(cmp, event, helper);

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
    doSaveRuleConfirm: function(cmp, event, helper) {

        helper.turnOnSpinner(cmp);
        helper.doCheckQueryAndSave(cmp, event, helper);
    },
    doCheckQueryAndSave: function(cmp, event, helper) {

        var ruledetail = cmp.get('v.ruledetail');

        var rules = cmp.get('v.rules');

        var criteria = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if (rule.selectedField === 'none')
                break;

            var ruleItem = {};

            var fieldObject = cmp.get('v.allFields')[rule.selectedField];
            ruleItem.fieldName = fieldObject.fieldName;
            ruleItem.fieldTypeName = fieldObject.fieldType;
            ruleItem.operatorName = rule.selectedOperation;

            if (fieldObject.fieldType === 'boolean' && rule.value === "") {
                rule.value = "true";
            }
            ruleItem.value = rule.value;
            ruleItem.isPickList = rule.isPicklist;

            criteria.push(ruleItem);
        }

        var action = cmp.get("c.isValidRuleLogic");

        action.setParams({
            "ruleObject": ruledetail.ruleObject,
            "ruleCriteria": JSON.stringify(criteria),
            "ruleLogic": ruledetail.logic || '',
            "emailFilter": cmp.get('v.emailFilter'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var queryResult = actionResult.getReturnValue();
                if (queryResult !== 'OK') {

                    if (criteria.length > 0 && ((ruledetail.logic.match(/[0-9]+/g) || []).length) !== criteria.length) {
                        helper.showNotification(cmp, event, helper, 'The rule logic does not match the number of rules. I.e. ' + ruledetail.logic, 'warning');
                    } else if ((-1 !== queryResult.indexOf('null'))) {
                        helper.showNotification(cmp, event, helper, 'The rule logic may not be correct.', 'warning');
                    } else {
                        helper.showNotification(cmp, event, helper, queryResult, 'warning');
                    }

                    cmp.set('v.showEdit', true);
                } else {
                    // We are okay to save
                    helper.doSaveRule(cmp, event, helper);
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
            cmp.set('v.isLoading', false);
        });
        $A.enqueueAction(action);
    },
    doSaveRule: function(cmp, event, helper) {
        var ruledetail = cmp.get('v.ruledetail');
        ruledetail.disabled = !cmp.get('v.isRuleActive');

        var rules = cmp.get('v.rules');

        var criteria = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if (rule.selectedField === 'none')
                break;

            var ruleItem = {};

            var fieldObject = cmp.get('v.allFields')[rule.selectedField];
            ruleItem.fieldName = fieldObject.fieldName;
            ruleItem.fieldTypeName = fieldObject.fieldType;
            ruleItem.operatorName = rule.selectedOperation;
            if (ruleItem.operatorName === 'none') {
                helper.turnOffSpinner(cmp);
                cmp.set('v.showEdit', true);
                helper.showNotification(cmp, event, helper, 'All rules must have a valid operator.', 'warning');
                return;
            }
            ruleItem.value = rule.value;
            ruleItem.isPickList = rule.isPicklist;

            criteria.push(ruleItem);
        }

        ruledetail.criteria = JSON.stringify(criteria);

        var action = cmp.get("c.saveRule");
        action.setParams({
            "ruledetailJson": JSON.stringify(ruledetail),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var saveResult = actionResult.getReturnValue();
                helper.showNotification(cmp, event, helper, 'Successfully saved rule.', 'success');
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
    doRetrospectiveRun: function(cmp, event, helper) {

        cmp.set('v.disableRefreshButton', true);

        var ruledetail = cmp.get('v.ruledetail');

        var rules = cmp.get('v.rules');

        var criteria = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if (rule.selectedField === 'none')
                break;

            var ruleItem = {};

            var fieldObject = cmp.get('v.allFields')[rule.selectedField];
            ruleItem.fieldName = fieldObject.fieldName;
            ruleItem.fieldTypeName = fieldObject.fieldType;

            ruleItem.operatorName = rule.selectedOperation;
            ruleItem.value = rule.value;
            ruleItem.isPickList = rule.isPicklist;

            criteria.push(ruleItem);
        }

        var action = cmp.get("c.retrospectiveRun");
        action.setParams({
            "cmListId": ruledetail.subscriberListId,
            "listName": ruledetail.subscriberListName,
            "ruleObject": ruledetail.ruleObject,
            "ruleCriteria": JSON.stringify(criteria),
            "ruleLogic": ruledetail.logic || '',
            "ruleAction": ruledetail.action,
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var jobId = actionResult.getReturnValue();

                cmp.set('v.jobId', jobId);
                helper.pollRetrospectiveRun(cmp, event, helper);
                helper.showNotification(cmp, event, helper, 'Refreshing Campaign Monitor based on rules below.', 'success');

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
    pollRetrospectiveRun: function(cmp, event, helper) {
        helper.checkRetrospectiveRun(cmp, event, helper);

        //execute checkRetrospectiveRun() again after 5 sec each
        var internalTimer = window.setInterval(
            $A.getCallback(function() {

                helper.checkRetrospectiveRun(cmp, event, helper);
                var progress = cmp.get('v.progress');
                if (progress === 100) {
                    clearInterval(cmp.get('v.timerId'));
                    cmp.set('v.disableRefreshButton', false);
                    helper.showNotification(cmp, event, helper, 'Retrospective run has completed', 'success');
                    cmp.set('v.progress', 0);
                }

            }), 2000
        );

        if (internalTimer) {
            cmp.set('v.timerId', internalTimer);
        }

    },
    checkRetrospectiveRun: function(cmp, event, helper, lastcheck) {

        var action = cmp.get("c.isRefreshRunning");
        action.setParams({
            "jobId": cmp.get('v.jobId'),
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var isJobRunning = actionResult.getReturnValue();
                cmp.set('v.progress', isJobRunning.pctComplete);

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
    doGetSampleData: function(cmp, event, helper, checkOnly) {

        var ruledetail = cmp.get('v.ruledetail');

        var rules = cmp.get('v.rules');

        var criteria = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if (rule.selectedField === 'none')
                break;

            var ruleItem = {};

            var fieldObject = cmp.get('v.allFields')[rule.selectedField];
            ruleItem.fieldName = fieldObject.fieldName;
            ruleItem.fieldTypeName = fieldObject.fieldType;

            ruleItem.operatorName = rule.selectedOperation;
            ruleItem.value = rule.value;
            ruleItem.isPickList = rule.isPicklist;

            criteria.push(ruleItem);
        }

        // Disable save button to avoid save when user clicks directly from logic field
        if (checkOnly) {
            cmp.set('v.isRuleLogicValid', false);
        }

        var action = cmp.get("c.getSampleRecordsForRule");
        if (checkOnly) {
            var action = cmp.get("c.isValidRuleLogic");
        }

        action.setParams({
            "ruleObject": ruledetail.ruleObject,
            "ruleCriteria": JSON.stringify(criteria),
            "ruleLogic": ruledetail.logic || '',
            "emailFilter": cmp.get('v.emailFilter'),
        });

        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            if (state === "SUCCESS") {
                var sampleList = actionResult.getReturnValue();

                if (checkOnly) {
                    if (sampleList !== 'OK') {
                        // Toast message saying logic is incorrect
                        helper.showNotification(cmp, event, helper, sampleList, 'warning');
                        cmp.set('v.isRuleLogicValid', false);
                    } else {
                        cmp.set('v.isRuleLogicValid', true);
                    }
                    return;
                }

                cmp.find('b12-sample-modal').open();
                $A.util.addClass(cmp.find('b12-sample-spinner-id'), "slds-hide");
                cmp.set('v.sampleList', sampleList);

                if (sampleList.length > 50) {
                    cmp.set('v.subHeader', '50+ items');
                } else {
                    cmp.set('v.subHeader', sampleList.length + ' items');
                }

                if (sampleList.length === 0) {
                    $A.util.removeClass(cmp.find('b12-no-data-id'), "slds-hide");
                } else {
                    $A.util.addClass(cmp.find('b12-no-data-id'), "slds-hide");
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
            cmp.set('v.isLoading', false);
        });
        $A.enqueueAction(action);
    },
    doNavigateBack: function(cmp, event, helper) {

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
    setEmptyRule: function(cmp) {

        var ruledetail = {};
        ruledetails.id = '';
        ruledetails.name = '';
        ruledetails.action = cmp.get('v.ruleaction');
        ruledetails.criteria = [];
        ruledetails.description = '';
        ruledetails.evaluationTime = 'Only when a record is created';
        // ruledetails.logic = '';
        ruledetails.ruleObject = cmp.get('v.ruleobject');
        ruledetails.resubscribe = false;
        ruledetails.subscriberListId = cmp.get('v.listId');;
        ruledetails.subscriberListName = '';
        ruledetails.subscriberList = '';

        cmp.set('v.ruledetail', ruledetail);
    },
    turnOffSpinner: function(cmp) {

        // document.getElementById("spinner-id").className = "slds-hide";
        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
        $A.util.removeClass(cmp.find('body-id'), "slds-hide");
    },
    turnOnSpinner: function(cmp) {

        // document.getElementById("spinner-id").className = "slds-hide";
        $A.util.removeClass(cmp.find('spinner-id'), "slds-hide");
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