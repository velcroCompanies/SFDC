({

    doGetReportFolders : function(cmp, event, helper) {

        var reportFolderList = [];
        reportFolderList.push({ class: "optionClass", label: "Public", value: "public", selected: true });

        var reportParam = '';
        if(cmp.get('v.importConfig.importTypeId') != null) {
            reportParam = cmp.get('v.importConfig.importTypeId');
        }

        var action = cmp.get("c.getAllReportFolders");
        action.setParams({
            reportParam : reportParam
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var reportFolderMap = actionResult.getReturnValue();

                var selectedFolder = 'public';
               	for (var i = 0; i < reportFolderMap.length; i += 1 ) {

                    // Check if the user has permission to read reports
                    if(reportFolderMap[i].folderName === 'EXCEPTION01') {
                        cmp.set('v.error', 'Permissions Restriction');
                        cmp.set('v.errorBody', 'Import Wizard requires the System Permission "Run Reports"');
                        // cmp.find('b12-prompt-error').open();
                        $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                        $A.util.removeClass(cmp.find('error-id'), "slds-hide");

                        return;
                    }

                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = reportFolderMap[i].folderLabel;
                    optionTemplate.value = reportFolderMap[i].folderName;
                    optionTemplate.selected = reportFolderMap[i].selected;
                    if(reportFolderMap[i].selected) {
                        selectedFolder = reportFolderMap[i].folderName;
                    }
                    reportFolderList.push(optionTemplate);
                }
                cmp.set('v.reportFolders', reportFolderList);

                // Now find all the reports related to this report folder
                helper.doGetReports(cmp, event, helper, selectedFolder);

            }
            else if (state === "ERROR") {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message); // eslint-disable-line
                        cmp.set('v.error', errors[0].message);
                        cmp.find('b12-prompt-error').open();
                    }
                } else {
                    console.log("Unknown error"); // eslint-disable-line
                }
            }

        });
        $A.enqueueAction(action);
    },
    doGetReports : function(cmp, event, helper, folderName) {

        var reportList = [];
        reportList.push({ class: "optionClass", label: "--- Select ---", value: "none", selected: true });

        var action = cmp.get("c.getReports");
        action.setParams({
        	folderName : folderName
        });

        //Set up the callback
        action.setCallback(this, function(actionResult) {

            var state = actionResult.getState();

            if (state === "SUCCESS") {

                var reportMap = actionResult.getReturnValue();

               	for (var i = 0; i < reportMap.length; i += 1 ) {
                    var optionTemplate = {};
                    optionTemplate.class = 'optionClass';
                    optionTemplate.label = reportMap[i].reportLabel;
                    optionTemplate.value = reportMap[i].reportName;

                    // If we have a scheduled import record, set the picklist value to the correct report name
                    if(cmp.get('v.importConfig.importTypeId') === reportMap[i].reportName) {
                        optionTemplate.selected = true;

                        cmp.set('v.importConfig.isNextDisabled', false);
                        cmp.set('v.importConfig.importTypeId', reportMap[i].reportName);
                        cmp.set('v.importConfig.importSubTitleObject', reportMap[i].reportLabel);


                        helper.fireWizardEvent(cmp, event, helper);
                    }
                    reportList.push(optionTemplate);
                }
                cmp.set('v.reportList', reportList);

                // Turn off spinner
                $A.util.addClass(cmp.find('spinner-id'), "slds-hide");
                $A.util.removeClass(cmp.find('report-folder-id'), "slds-hide");
                $A.util.removeClass(cmp.find('report-id'), "slds-hide");

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