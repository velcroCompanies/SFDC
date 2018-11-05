({
	onInit : function(cmp, event, helper) {
		helper.doInitJobs(cmp, event, helper);
    },
	onSetupPagelayouts : function(cmp, event, helper) {
		helper.doSetupPagelayouts(cmp, event, helper);
    },
	onRemovePagelayouts : function(cmp, event, helper) {
		helper.doRemovePagelayouts(cmp, event, helper);
    },
	onViewApexJobs : function(cmp, event, helper) {
		helper.navigateToPage(helper, '/apexpages/setup/listAsyncApexJobs.apexp');
    },
	onDeleteMessages : function(cmp, event, helper) {
		helper.doDeleteMessages(cmp, event, helper, '');
    },
	onResetData : function(cmp, event, helper) {

		var resetType = '';
		if(cmp.find('reset-config').get('v.checked')) {
			resetType = 'CONFIG';
		}

		if(cmp.find('reset-subscriber').get('v.checked')) {
			resetType = 'SUBSCRIBER';
		}

		if(cmp.find('reset-email').get('v.checked')) {
			resetType = 'EMAIL';
		}

		if((cmp.find('reset-subscriber').get('v.checked') && cmp.find('reset-email').get('v.checked'))
			|| (cmp.find('reset-subscriber').get('v.checked') && cmp.find('reset-email').get('v.checked')
				&& cmp.find('reset-config').get('v.checked'))) {
			resetType = 'ALL';
		}

		// reset the checkboxes
		cmp.find('reset-config').set('v.checked', false);
		cmp.find('reset-subscriber').set('v.checked', false);
		cmp.find('reset-email').set('v.checked', false);

		if(resetType) {
			helper.doResetData(cmp, event, helper, resetType);
		}

		helper.successNotification(cmp, event, helper, 'Refreshing data from Campaign Monitor into Salesforce.');

    },
	onCheckJobs : function(cmp, event, helper) {
		helper.doCheckJobs(cmp, event, helper);
	},
	onResetChecked : function(cmp, event, helper) {

		var checked = true;
		if(cmp.find('reset-config').get('v.checked')
			||cmp.find('reset-subscriber').get('v.checked')
			||cmp.find('reset-email').get('v.checked')) {
			checked = false;
		}

		// Enable / disable reset button
		cmp.set('v.disableResetButton', checked);

	},
    onOpenMessageDetailModal : function(cmp, event, helper) {

    	var selectedMenuItemValue = event.getParam("value");
		var messageLog = cmp.get("v.messageLog");

		if(selectedMenuItemValue % 1 === 0) {

			helper.doDeleteMessages(cmp, event, helper, messageLog[selectedMenuItemValue].name);
			messageLog.splice(selectedMenuItemValue, 1);
			cmp.set("v.messageLog", messageLog);

		} else {
    		cmp.set("v.messageLogDetail", messageLog[selectedMenuItemValue.split(":")[1]]);
    		cmp.find('b12-message-detail-modal').open();
		}

    },
	onCloseMessageDetailModel : function(cmp, event, helper) {
        cmp.find('b12-message-detail-modal').close();
	},

})