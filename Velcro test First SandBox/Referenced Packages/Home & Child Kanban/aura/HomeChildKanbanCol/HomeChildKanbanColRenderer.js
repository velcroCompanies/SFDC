({	
    afterRender: function (component, helper) {
        this.superAfterRender();
        component.set('v.firstTimeRendered', true);
    },
})