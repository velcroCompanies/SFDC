/********************************************************/
/*** Roger Fontcuberta				 					*/
/*** 13/04/2018 										*/
/*** Get current doc. version and returns version+1  	*/
/** las modified:  04/06/2018							*/
/********************************************************/
public class ExtDocsQuote  {
       
        private final Quote quo;
        private String QId='';
                
        public ExtDocsQuote(ApexPages.StandardController stdController) {
        this.quo = (Quote)stdController.getRecord();
        QId= quo.Id;
        }
        
        public List<Quote_Line__c> getSortedQuoteLines() 
        {
        	List<Quote_Line__c> quoteLines= [SELECT Name, Description__c,Minimun_Order_Quantity__c,Price__c,Product_Code__c,Units_of_measure__c, Lead_Time__c, Presented__c FROM Quote_Line__c WHERE quote__c =:QId ORDER BY Name] ;
        	return quoteLines;
        }
        
        public String getQuoteVersion()
        {
        String filename='1';
        Integer version=1;
        String result='1';
        
        try {
        QuoteDocument qdoc = [SELECT Id, Name FROM QuoteDocument WHERE QuoteId =:QId ORDER BY CreatedDate DESC LIMIT 1];
         if (qdoc != null)
         {
        /* get filename and obtain the version number just before the extension and prior to the 'V' char */
       
        fileName= qdoc.Name;
        fileName= fileName.removeEnd('.pdf');
        fileName= fileName.substring(fileName.lastIndexOf('V')+1);  /*** get last version of doc**/
        version=  Integer.valueOf(fileName)+1;    /** increase by one **/
        result= String.valueOf(version);    /** set to result **/
         }
        } 
        catch ( exception e )  /** if no quotes exist, will return 1 **/
          {  result='1';
           } 
       
        return result;  
        }
 }