({
    
    startTimer : function(cmp) {
        var self=this;  
        var targetTime = cmp.find("targetTime").get('v.value');
        
        if(targetTime == null || targetTime == ""){          
            cmp.find("timealert").set("v.value","Please give valid input for your event time");
            cmp.find("timeLeft").set("v.value", "");
            cmp.find("button").set("v.label","Start Countdown");
            cmp._timerId = null;  
            return;
        }
        
        cmp.find("timealert").set("v.value","");
        

        cmp._timerId = window.setTimeout(function() {
                var target_date = new Date(targetTime).getTime();               var days, hours, minutes, seconds;
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;
                if(seconds_left<0){
                    cmp.find("timealert").set("v.value","Please input time in future for your event");
                    cmp.find("timeLeft").set("v.value", "");
                    cmp.find("button").set("v.label","Start Countdown");
                    cmp._timerId = null;  
                    return;
                }
                days = parseInt(seconds_left / 86400);seconds_left = seconds_left % 86400;
                hours = parseInt(seconds_left / 3600);seconds_left = seconds_left % 3600;
                minutes = parseInt(seconds_left / 60);seconds = parseInt(seconds_left % 60);                   
                var timeRemain = cmp.find("timeLeft");
                timeRemain.set("v.value", days + " Days, " + hours + " Hours, "+ minutes + " Mins, " + seconds + " Secs");
                if(days == 0 && hours == 0 && minutes==0 && seconds== 0){
                    cmp.find("timealert").set("v.value","No more time left for your event");    
                    return; 
                }     
                self.startTimer(cmp);
           },1000);             
        
    },       
    
    stopTimer : function(cmp) {
        window.clearTimeout(cmp._timerId);
        cmp._timerId = null;
        var timeRemain = cmp.find("timeLeft");
        timeRemain.set("v.value", "");
        cmp.find("timealert").set("v.value","");
    }
    
})