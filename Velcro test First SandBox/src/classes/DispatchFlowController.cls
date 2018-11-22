/**
 * 2018-10-30   
 * Apex Controller to support customizing the 'finishlocation' url of flow
 */
public class DispatchFlowController {
	
     	            
   // class constructor 
   public DispatchFlowController(ApexPages.StandardController stdController) {
   	    // don't need to add code here.  
  	   }
	
	// access to the Flow invoked by the VF page
	public Flow.Interview.EMEA_New_Opp_Flow theFlow{get;set;}
	
	public PageReference getNewDispatchRecord(){
		if(theFlow == null)
			return null;
		else 
		{    return new PageReference('/' + theFlow.OppId);  // redirect to newly created record page (oppId)
	    }
	}
}