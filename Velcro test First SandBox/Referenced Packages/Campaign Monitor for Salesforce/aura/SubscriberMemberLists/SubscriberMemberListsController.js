({
	doInit: function(cmp, event, helper) {
		helper.doGetMemberLists(cmp, event, helper);
	},
	onBack: function(cmp, event, helper) {
		helper.doNavigateBack(cmp, event, helper);
	},
})