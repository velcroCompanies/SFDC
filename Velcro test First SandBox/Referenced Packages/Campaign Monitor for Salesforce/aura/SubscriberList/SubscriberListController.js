({
	doInit: function(cmp, event, helper) {
		helper.doGetListDetail(cmp, event, helper);
	},
	onCreateList: function(cmp, event, helper) {
		helper.doCreateList(cmp, event, helper);
	},
	onEditList: function(cmp, event, helper) {
		cmp.set('v.disabled', false);
		cmp.set('v.showEdit', true);
	},
	onDeleteList: function(cmp, event, helper) {
		helper.doDeleteList(cmp, event, helper);
	},
	onUpdateList: function(cmp, event, helper) {
		cmp.set('v.disabled', true);
		cmp.set('v.showEdit', false);

		helper.doUpdateList(cmp, event, helper);
	},
	onSelectClient: function(cmp, event, helper) {

		// Store the client name so it can be displayed on the unsubscriber settings label
		var clientId = cmp.find("client-picklist-container-id").get("v.value");
		var clientList = cmp.get('v.listdetail.clientList');
		for (var i = 0; i < clientList.length; i += 1 ) {
			if(clientList[i].clientId === clientId) {
				cmp.set('v.clientName', clientList[i].clientName);
				break;
			}
		}
	},
	onChangeOwner: function(cmp, event, helper) {
		helper.doChangeOwner(cmp, event, helper);
	},
	onBack: function(cmp, event, helper) {
		helper.doNavigateBack(cmp, event, helper);
	},
	onCancel: function(cmp, event, helper) {
		cmp.set('v.disabled', true);
		cmp.set('v.showEdit', false);
	},
	onSelectedListType: function(cmp, event, helper) {

		cmp.set('v.listdetail.listType',event.getSource().get('v.value'));
	},
	onUnsubscribedType: function(cmp, event, helper) {
		cmp.set('v.listdetail.unsubscribeSetting',event.getSource().get('v.value'));
	},

    collapseSectionAdvanced: function(cmp, event, helper) {

        var section = cmp.find('advanced-id');
        $A.util.toggleClass(section, 'slds-is-open');

        if(cmp.get('v.showAdvanced')) {
        	cmp.set('v.showAdvanced', false);
        } else {
        	cmp.set('v.showAdvanced', true);
        }
    },
    collapseSectionSettings: function(cmp, event, helper) {

        var section = cmp.find('settings-id');
        $A.util.toggleClass(section, 'slds-is-open');

        if(cmp.get('v.showSettings')) {
        	cmp.set('v.showSettings', false);
        } else {
        	cmp.set('v.showSettings', true);
        }
    },
    onOpenChangeOwnerModal : function(cmp, event, helper) {
		cmp.find('b12-change-owner-modal').open();
    },
    onOpenDeleteListModal : function(cmp, event, helper) {
		cmp.find('b12-delete-list-modal').open();
    },

})