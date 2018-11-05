({
    doInit: function(cmp, event, helper) {
        debugger
        if (cmp.get('v.action') === 'DELETE_MEMBER') {
            helper.doDeleteSubscriber(cmp, event, helper);
        } else {
            helper.doGetMemberDetail(cmp, event, helper);
        }

    },
    onToggleEmailOptOut: function(cmp, event, helper) {
        if (cmp.get('v.memberdetail.isOptIn')) {
            cmp.set('v.memberdetail.isOptIn', false);
            $A.util.removeClass(cmp.find('b12-confirmation-id'), "slds-hide");
        } else {
            helper.doToggleEmailOptOut(cmp, event, helper);
        }
    },
    onToggleEmailOptOutActive: function(cmp, event, helper) {
        cmp.set('v.memberdetail.isOptIn', true);
        helper.doToggleEmailOptOut(cmp, event, helper);
        $A.util.addClass(cmp.find('b12-confirmation-id'), "slds-hide");
    },
    onToggleEmailOptOutCancel: function(cmp, event, helper) {
        $A.util.addClass(cmp.find('b12-confirmation-id'), "slds-hide");
    },
    collapseSectionAdvanced: function(cmp, event, helper) {
        var section = cmp.find('advanced-id');
        $A.util.toggleClass(section, 'slds-is-open');
        if (cmp.get('v.showAdvanced')) {
            cmp.set('v.showAdvanced', false);
        } else {
            cmp.set('v.showAdvanced', true);
        }
    },
    onOpenChangeOwnerModal: function(cmp, event, helper) {
        cmp.find('b12-change-owner-modal').open();
    },
    onChangeOwner: function(cmp, event, helper) {
        helper.doChangeOwner(cmp, event, helper);
    },
    onBack: function(cmp, event, helper) {
        helper.doNavigateBack(cmp, event, helper);
    },
})