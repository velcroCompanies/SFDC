({
    doInit: function(cmp, event, helper) {
        helper.doGetListDetails(cmp, event, helper);

        cmp.set('v.memberColumns', [{
                label: 'Name',
                fieldName: 'memberName',
                type: 'text',
                cellAttributes: {
                    iconName: { fieldName: 'trendIcon' },
                    iconPosition: 'left'
                },
            },
            { label: 'Email Address', fieldName: 'email', type: 'email' },
            { label: 'Subscribed', fieldName: 'subscribedDate', type: 'date' }
        ]);

    },
    onSegmentChange: function(cmp, event, helper) {
        cmp.set('v.loadedSegmentMembers', false);
        helper.doGetSegmentMembers(cmp, event, helper);
    },
    onSearch: function(cmp, event, helper) {
        // cmp.set('v.searchFilter', cmp.find('search').get('v.value'));
        cmp.set('v.isLoading', true);
        helper.doFindSegmentMember(cmp, event, helper);
    },
    onClearSearch: function(cmp, event, helper) {

        if (!cmp.find('search').get('v.value')) {
            helper.setSubHeader(cmp, cmp.get("v.allLists"));

            $A.util.addClass(cmp.find('b12-subheader-sort'), "slds-show");
            $A.util.removeClass(cmp.find('b12-subheader-sort'), "slds-hide");

            $A.util.addClass(cmp.find('b12-subheader-filter'), "slds-hide");
            $A.util.removeClass(cmp.find('b12-subheader-filter'), "slds-show");

            $A.util.addClass(cmp.find('b12-footer'), "slds-show");
            $A.util.removeClass(cmp.find('b12-footer'), "slds-hide");
            cmp.set('v.isLoading', true);
            helper.renderPage(cmp);
        }
    },
    onSelectMember: function(cmp, event, helper) {
        helper.doSelectMember(cmp, event, helper, event.target.id);
    },
    renderPage: function(cmp, event, helper) {
        helper.renderPage(cmp);
    },
    onListMenu: function(cmp, event, helper) {

        var selectedMenuItemValue = event.getParam("value");

        var currentList = cmp.get("v.currentList");

        var Member = currentList[selectedMenuItemValue.split(":")[1]];
        var memberId = Member.id;

        if (selectedMenuItemValue.split(":")[0] === 'viewItem') {

            helper.doSelectMember(cmp, event, helper, memberId);
        }
    },
    onBack: function(cmp, event, helper) {
        helper.doNavigateBack(cmp, event, helper);
    },
})