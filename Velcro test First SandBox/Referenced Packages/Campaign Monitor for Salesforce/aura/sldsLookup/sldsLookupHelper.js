({
    itemSelected: function(cmp, event, helper) {
        var target = event.target;
        var SelIndex = helper.getIndexFrmParent(target, helper, "data-selectedIndex");
        if (SelIndex) {
            var serverResult = cmp.get("v.server_result");
            var selItem = serverResult[SelIndex];
            if (selItem.val) {
                cmp.set("v.selItem", selItem);
                cmp.set("v.last_ServerResult", serverResult);
            }
            cmp.set("v.server_result", null);
        }
    },
    serverCall: function(cmp, event, helper) {
        var target = event.target;
        var searchText = target.value;
        var last_SearchText = cmp.get("v.last_SearchText");

        //Escape button pressed
        if (event.keyCode === 27 || !searchText.trim()) {
            helper.clearSelection(cmp, event, helper);
            // }else if(searchText.trim() != last_SearchText  && /\s+$/.test(searchText) ){
        } else if (event.keyCode === 38 || !searchText.trim()) {
            // Select the next item up
        } else if (event.keyCode === 40 || !searchText.trim()) {
            // Select the next item down
        } else if (searchText.trim() !== last_SearchText) {
            //Save server call, if last text not changed
            //Search only when space character entered

            var objectName = cmp.get("v.objectName");
            var field_API_text = cmp.get("v.field_API_text");
            var field_API_val = cmp.get("v.field_API_val");
            var field_API_search = cmp.get("v.field_API_search");
            var limit = cmp.get("v.limit");

            var action = cmp.get('c.searchDB');
            action.setStorable();

            action.setParams({
                objectName: objectName,
                fld_API_Text: field_API_text,
                fld_API_Val: field_API_val,
                lim: limit,
                fld_API_Search: field_API_search,
                searchText: searchText
            });

            action.setCallback(this, function(a) {
                this.handleResponse(a, cmp, helper);
            });

            cmp.set("v.last_SearchText", searchText.trim());
            $A.enqueueAction(action);
        } else if (searchText && last_SearchText && searchText.trim() === last_SearchText.trim()) {
            cmp.set("v.server_result", cmp.get("v.last_ServerResult"));
        }
    },
    handleResponse: function(res, cmp, helper) {
        if (res.getState() === 'SUCCESS') {
            var retObj = JSON.parse(res.getReturnValue());
            if (retObj.length <= 0) {
                var noResult = JSON.parse('[{"text":"No Results Found"}]');
                cmp.set("v.server_result", noResult);
                cmp.set("v.last_ServerResult", noResult);
            } else {
                cmp.set("v.server_result", retObj);
                cmp.set("v.last_ServerResult", retObj);
            }
        } else if (res.getState() === 'ERROR') {
            var errors = res.getError();
            if (errors) {
                if (errors[0] && errors[0].message) {
                    console.log(errors[0].message); // eslint-disable-line
                }
            }
        }
    },
    getIndexFrmParent: function(target, helper, attributeToFind) {
        //User can click on any child element, so traverse till intended parent found
        var SelIndex = target.getAttribute(attributeToFind);
        while (!SelIndex) {
            target = target.parentNode;
            SelIndex = helper.getIndexFrmParent(target, helper, attributeToFind);
        }
        return SelIndex;
    },
    clearSelection: function(cmp, event, helper) {
        cmp.set("v.selItem", null);
        cmp.set("v.server_result", null);
    }
})