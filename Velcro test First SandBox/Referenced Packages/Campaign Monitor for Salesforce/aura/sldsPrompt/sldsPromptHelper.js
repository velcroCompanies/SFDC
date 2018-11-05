({
	toggleVisibility : function(component, showPrompt){

		var isVisible = component.get('v.isVisible');

		if(showPrompt !== isVisible){

	        var modal = component.find('sldsPrompt');
	        $A.util.toggleClass(modal, 'slds-fade-in-open');

	        var promptBackdrop = component.find('sldsPromptBackdrop');
	        $A.util.toggleClass(promptBackdrop, 'slds-backdrop--open');
			$A.util.toggleClass(promptBackdrop, 'slds-backdrop');

			var promptHeading = component.find('prompt-heading-id');
			$A.util.toggleClass(promptHeading, 'slds-fade-in-open');


			component.set('v.isVisible', showPrompt);
	    }
	}
})