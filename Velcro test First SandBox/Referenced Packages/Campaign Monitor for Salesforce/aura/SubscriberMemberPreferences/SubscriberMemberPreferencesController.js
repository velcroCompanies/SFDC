({
	doInit: function(cmp, event, helper) {
		helper.doGetMemberDetail(cmp, event, helper);
	},
	onBack: function(cmp, event, helper) {
		helper.doNavigateBack(cmp, event, helper);
	},
})