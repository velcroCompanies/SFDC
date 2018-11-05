({
    
    getUsername : function() {
        return new Promise(function(resolve, reject) {
            resolve('jeffdonthemic');
        });
    },  
    
    getReportId : function() {
        return new Promise(function(resolve, reject) {
            resolve('1234');
        });
    },   
    
    firstPromise : function() {
        return new Promise($A.getCallback(function(resolve, reject) {
          if (1==1) {
            resolve("Resolved");
          }
          else {
            reject("Rejected");
          }
        }));
    },     
})