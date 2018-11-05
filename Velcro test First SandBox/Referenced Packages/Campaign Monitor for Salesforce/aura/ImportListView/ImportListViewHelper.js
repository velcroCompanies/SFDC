({

    doGetObjectList : function(cmp, event, helper) {

        var objectList = [];

        var objectParam = '';
        if(cmp.get('v.importConfig.importTypeId')) {
            objectParam = cmp.get('v.importConfig.importTypeId');
        } else {
	        objectList.push({ class: "optionClass", label: "-- Select --", value: "none", selected: true });
        }

        var action = cmp.get("c.getAllObjects");
        action.setParams({
            objectParam : objectParam
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var allObjectMap = actionResult.getReturnValue();


                var selectedObject = '';
               	for (var i = 0; i < allObjectMap.length; i += 1 ) {
                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = allObjectMap[i].objectLabel;
                    optionTemplate.value = allObjectMap[i].objectName;
                    optionTemplate.selected = allObjectMap[i].selected;
                    if(allObjectMap[i].selected) {
                        selectedObject = allObjectMap[i].objectName;
                    }
                    objectList.push(optionTemplate);
                }

                // If there is no previously selected object, then select the current one.
                selectedObject = selectedObject ? selectedObject : 'none';
                cmp.set('v.selectedObject', selectedObject);

                cmp.set('v.objectList', objectList);

                // Now find all the list views related to this object
                helper.doGetListViews(cmp, event, helper, selectedObject);

            }
            else if (state === "ERROR") {
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
    doGetListViews : function(cmp, event, helper, paramName) {
        var listViewList = [];

        // If there is an existing list view, then select it
        var listViewId = '';
        if(cmp.get('v.importConfig.importTypeId')) {
        	listViewId = cmp.get('v.importConfig.importTypeId').split(':')[1]
        } else {
	        listViewList.push({ class: "optionClass", label: "--- Select ---", value: "none", selected: true });
            cmp.set('v.listViewList', listViewList);
        }

        var action = cmp.get("c.getListViews");
        action.setParams({
        	objectName : paramName
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();
            var haveSelected = false;
            if (state === "SUCCESS") {

                var listViewMap = actionResult.getReturnValue();

               	for (var i = 0; i < listViewMap.length; i += 1 ) {
                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = listViewMap[i].listViewLabel;
                    optionTemplate.value = listViewMap[i].listViewName;

                    // If we have a listview record, set the picklist value to the correct object name
                    if(listViewId === listViewMap[i].listViewName) {
                        optionTemplate.selected = true;
                        haveSelected = true;

				        var importConfig = cmp.get("v.importConfig");
				        importConfig.isNextDisabled = false;
                        importConfig.importTypeId = paramName + ':' + listViewMap[i].listViewName;
				        cmp.set("v.importConfig", importConfig);

                        helper.setSubTitle(cmp, event, helper, paramName, i, listViewMap[i].listViewLabel);

                    }
                    listViewList.push(optionTemplate);
                }

                if(listViewList.length === 0 && !haveSelected && listViewMap.length !== 0) {
                    helper.setSubTitle(cmp, event, helper, paramName, 0, listViewMap[0].listViewLabel);
                }

                cmp.set('v.listViewList', listViewList);

                // If there is an existing list view, then refetch the SOQL as it may have changed
                if(cmp.get('v.importConfig.importTypeId')) {
                    helper.doGetListViewSOQL(cmp, event, helper, cmp.get('v.importConfig.importTypeId'));
                } else {
                    helper.fireWizardEvent(cmp, event, helper);

                    // Turn off spinner
                    $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                    $A.util.removeClass(cmp.find('object-picklist-id'), "slds-hide");
                    $A.util.removeClass(cmp.find('listview-picklist-id'), "slds-hide");
                }

                // Enable picklist
                if(listViewMap.length > 0) {
                    cmp.set('v.listViewListDisabled', false);
                }

            }
            else if (state === "ERROR") {
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

    setSubTitle : function(cmp, event, helper, objectName, index, listViewLabel) {


        var objectList = cmp.get('v.objectList');
        var objectLabel = '';
        for (var j = 0; j < objectList.length; j += 1 ) {
            if(objectList[j].value === objectName) {
                objectLabel = objectList[j].label;
                break;
            }
        }

        var importConfig = cmp.get("v.importConfig");
        importConfig.isNextDisabled = false;
        importConfig.importSubTitleObject = '[' + objectLabel + '] ' + listViewLabel;
        cmp.set("v.importConfig", importConfig);
    },

    doGetListViewSOQL : function(cmp, event, helper, paramName) {

        // E.g. paramName = contact:1234567890
        var action = cmp.get("c.getListViewSOQL");
        action.setParams({
        	importTypeParam : paramName
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var listViewSOQL = actionResult.getReturnValue();

                var importConfig = cmp.get('v.importConfig');


                // Check if the list view is invalid (i.e. been deleted)
                if(listViewSOQL === '') {
                    importConfig.importTypeId = null;
                    importConfig.isNextDisabled = true;
                    importConfig.generalMsg = 'The list "' + importConfig.importTitle + '" List View is either private or is no longer available. Please select another List View.';
                    cmp.set('v.importConfig', importConfig);
                    helper.doGetObjectList(cmp, event, helper);
                } else {
                    importConfig.soql = listViewSOQL;


                    helper.fireWizardEvent(cmp, event, helper);

                    $A.util.addClass(cmp.find('working-id'), "slds-hide");

                    // Turn off spinner
                    $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                    $A.util.removeClass(cmp.find('object-picklist-id'), "slds-hide");
                    $A.util.removeClass(cmp.find('listview-picklist-id'), "slds-hide");
                }
            }
            else if (state === "ERROR") {
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
    fireWizardEvent : function(cmp, event, helper) {

        var compEvent = cmp.getEvent("ImportWizardEvent");
        compEvent.setParams({"importConfig": cmp.get('v.importConfig') });
        compEvent.fire();
    },
})