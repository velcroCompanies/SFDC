({
	doInitRule: function(cmp, event, helper) {
		helper.doGetRuleListDetails(cmp, event, helper);
	},
	onListMenuSelectItem : function(cmp, event, helper) {
		helper.doListMenuSelectItem(cmp, event, helper,  event.getParam("value"));
	},

	doSelectImportType: function(cmp, event, helper) {
		console.log('doSelectImportType');
	},
	onBack: function(cmp, event, helper) {
		helper.doNavigateBack(cmp, event, helper);
	},
	onEditRule: function(cmp, event, helper) {
		cmp.set('v.showEdit', true);
	},
	onSaveRule: function(cmp, event, helper) {
        // Check if we can save
        if(!cmp.get('v.isRuleLogicValid') ) {
            helper.showNotification(cmp, event, helper, 'The rule logic is invalid and cannot be saved.', 'warning');
            return;
		}
		cmp.set('v.showEdit', false);

        if(!cmp.get('v.isRuleActive') ) {
			cmp.find('b12-save-confirm').open();
			return;
		} else {
			// Just save
			helper.doSaveRuleConfirm(cmp, event, helper);
		}
	},
	onSaveRuleEnable: function(cmp, event, helper) {
		cmp.set('v.isRuleActive', true);
		cmp.find('b12-save-confirm').close();
		helper.doSaveRuleConfirm(cmp, event, helper);
	},
	onSaveRuleDisable: function(cmp, event, helper) {
		cmp.set('v.isRuleActive', false);
		cmp.find('b12-save-confirm').close();
		helper.doSaveRuleConfirm(cmp, event, helper);
	},
	onCancel: function(cmp, event, helper) {
		cmp.set('v.showEdit', false);
		var ruleAction = cmp.get('v.ruleaction') + cmp.get('v.ruleobject');
		helper.doListMenuSelectItem(cmp, event, helper,  ruleAction);
	},
	onRetrospectiveRunConfirm: function(cmp, event, helper) {
		cmp.find('b12-retro-confirm').open();
	},
	onRetrospectiveRun: function(cmp, event, helper) {
		cmp.find('b12-retro-confirm').close();
		helper.doRetrospectiveRun(cmp, event, helper, false);
	},
	onPreviewRules: function(cmp, event, helper) {
		helper.doGetSampleData(cmp, event, helper, false);
	},
    onSearch: function( cmp, event, helper ) {
        cmp.set( 'v.emailFilter', cmp.find( 'search' ).get( 'v.value' ) );
        cmp.set( 'v.isLoading', true );
        helper.doGetSampleData(cmp, event, helper, false);
    },
    onClearSearch: function( cmp, event, helper ) {
        cmp.set( 'v.emailFilter', cmp.find( 'search' ).get( 'v.value' ) );
        if( !cmp.find( 'search' ).get( 'v.value' )) {
            cmp.set( 'v.isLoading', true );
            helper.doGetSampleData(cmp, event, helper, false);
        }
	},
	onOpenPickList: function(cmp, event, helper) {

		// Save the criteria location
		var selectedCriteriaIndex = parseInt(event.getSource().get('v.name').match(/[0-9]+$/)[0]) - 1; // Extract "5" from "rule-field-5"
		cmp.set('v.selectedCriteriaIndex', selectedCriteriaIndex);

		var fieldObjectIndex = cmp.get('v.rules')[selectedCriteriaIndex].selectedField;
		var fieldObject = cmp.get('v.allFields')[fieldObjectIndex];
		var existingValues = cmp.get('v.rules')[selectedCriteriaIndex].value;
		var fieldName = fieldObject.fieldName.split('.')[fieldObject.fieldName.split('.').length-1];

		helper.doGetPicklistValues(cmp, event, helper, fieldObject.primaryObjectName, fieldName, existingValues);
	},
	onSelectField: function(cmp, event, helper) {

		helper.doSelectField(cmp, event, helper);

	},
	onSelectDateFormat: function(cmp, event, helper) {

		cmp.set('v.numberFormatValueVisible', false);
		cmp.set('v.dateFormatValueVisible', false);
		cmp.set('v.dateFormatPlaceholder', '');
		cmp.set('v.dateFilter', '');

		// yyyy-mm-ddT00:00:00.000Z
		var dateFormat = cmp.get('v.selectedDateFormat');
		var dynamic = dateFormat.includes("_N_");
		if(dateFormat === 'DATE') {
			cmp.set('v.dateFormatPlaceholder', 'yyyy-mm-dd');
			cmp.set('v.dateFormatValueVisible', true);
			cmp.set('v.dateFormatPattern', '[0-9]{4}-[0-9]{2}-[0-9]{2}');
			cmp.set('v.dateFormatPlaceholderMsg', 'Invalid date. Try something like 2018-12-30');
		} else if(dateFormat === 'DATETIME') {
			cmp.set('v.dateFormatPlaceholder', 'yyyy-mm-ddT00:00');
			cmp.set('v.dateFormatValueVisible', true);
			cmp.set('v.dateFormatPattern', '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.0Z]+');
			cmp.set('v.dateFormatPlaceholderMsg', 'Invalid date time. Try something like 2018-02-25T06:48:41.000Z');
		} else if(dynamic){
			cmp.set('v.numberFormatPlaceholder', 'E.g. 12');
			cmp.set('v.numberFormatValueVisible', true);
			cmp.set('v.dateFormatPlaceholder', '');
			cmp.set('v.dateFormatValueVisible', true);
			cmp.set('v.dateFormatPattern', '(LAST|NEXT)[ ][0-9]+[ ][A-Za-z]+');
			cmp.set('v.dateFormatPlaceholderMsg', 'Invalid date time. Try something like LAST 7 DAYS');
		} else {
			cmp.set('v.dateFilter', dateFormat);
			cmp.set('v.dateFormatPattern', '');
		}

	},
	onSelectDateFormatChange: function(cmp, event, helper) {

		var dateFormat = cmp.get('v.selectedDateFormat');
		cmp.set('v.dateFilter', dateFormat.replace('_N_', ' ' + cmp.get('v.dateFormatValue').trim() + ' '));
	},
	onOpenDateFilter: function(cmp, event, helper) {

		// Save the criteria location
		var selectedCriteriaIndex = parseInt(event.getSource().get('v.name').match(/[0-9]+$/)[0]) - 1; // Extract "5" from "rule-field-5"
		cmp.set('v.selectedCriteriaIndex', selectedCriteriaIndex);

		// Reset the date model
		cmp.set('v.numberFormatValueVisible', false);
		cmp.set('v.dateFormatValueVisible', false);
		cmp.set('v.dateFormatValue' ,'');
		cmp.set('v.dateFilter', '');
		cmp.set('v.selectedDateFormat', '');

		// Open date model
		cmp.find('b12-date-modal').open();
	},
	onOkDateFilter: function(cmp, event, helper) {
		if(!cmp.find('b12-date-field').get('v.validity').valid && cmp.get('v.dateFormatPattern')) {
			helper.showNotification(cmp, event, helper, 'The date format is invalid.', 'warning');
			return;
		}

        var selectedCriteriaIndex = cmp.get('v.selectedCriteriaIndex');
        cmp.get('v.rules')[selectedCriteriaIndex].value = cmp.get('v.dateFilter');

		// Update the main rules object so the table refreshes/updates
		cmp.set('v.rules', cmp.get('v.rules'));
		cmp.find('b12-date-modal').close();
	},
	onSavePicklist: function(cmp, event, helper) {

		var selected = cmp.get('v.selectedClients');
		var selectedValues = [];
		selected.forEach(function(entry) {
			var selectedValue = entry.value;

			// Check for commas and enclose in quotes
			if(selectedValue.indexOf(',') > -1) {
				selectedValue = '"' + selectedValue + '"';
			}
			selectedValues.push(selectedValue);
		});

		var selectedCriteriaIndex = cmp.get('v.selectedCriteriaIndex');
		cmp.get('v.rules')[selectedCriteriaIndex].value = selectedValues.join();

		cmp.set('v.rules', cmp.get('v.rules'));
		cmp.find('b12-picklist-modal').close();
	},
	onChangeEvalulation: function(cmp, event, helper) {
	},

})