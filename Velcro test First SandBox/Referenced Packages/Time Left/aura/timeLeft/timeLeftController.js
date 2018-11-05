({

	click : function(cmp, event, helper){
       var button = event.getSource();
            if(cmp._timerId){
			  button.set("v.label", "Start Countdown");
			  helper.stopTimer(cmp);
            } else {
		    button.set("v.label", "Stop");
		    helper.startTimer(cmp);
            }
	}

})