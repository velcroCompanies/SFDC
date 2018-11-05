({
    doInit: function(component, event, helper) {
        
        var rows = component.get("v.rows");
        if(rows < 5 && rows > 0){
            var partnerRows =[];
            for(var i=0;i<rows;i++){
                partnerRows.push(i);
            } 
            component.set("v.partnerRows",partnerRows); 
        }
        
        helper.getPartnerRoles(component);
    },
    closeModal: function(component, event, helper) {
       helper.closeModal(component);
    },
    clickSavePartners: function(component, event, helper){
       
        var rows = component.get("v.partnerRows").length;
        var partners = [];
        for(var i=0;i<rows;i++){            
            var account = document.getElementById("accnt-lkup-"+i).title;
            if(account!=""){ //check if account is set
                var select = document.getElementById("select-pr-"+i);
            	var role = select.options[select.selectedIndex].text;
                var radio = document.getElementById("radio-pr-"+i);
                var isPrimary = false;
                if(radio && radio.checked){
                  isPrimary = true;  
                }
                
                var partner = {"accountId":account, "partnerRoleName":role, "isPrimary": isPrimary};
                partners.push(partner);
            }
        }
        // save
        helper.savePartners(component,event,partners);
    }
})