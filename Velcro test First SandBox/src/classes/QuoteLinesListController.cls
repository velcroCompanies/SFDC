public with sharing class QuoteLinesListController 

{
 public List<QuoteLinesWrapper> wrappers {get; set;}
 public static Integer toDelIdent {get; set;}
 public static Integer addCount {get; set;}
 private Integer nextIdent=0;
 public String parentId;
  private final Quote quo;
 
 public QuoteLinesListController(ApexPages.StandardController stdController)
 {
  
  this.quo= (Quote)stdController.getRecord();
  
  parentId = System.currentPagereference().getParameters().get('Quoteid');	 
  parentId= quo.Id;
  wrappers=new List<QuoteLinesWrapper>();
  QuoteLinesExisting();
  
  for (Integer idx=0; idx<1; idx++)
  {
  // wrappers.add(new QuoteLinesWrapper(nextIdent++,parentId));
  }
 }

 public void SetDelPos(Integer pos)
 {
 	 toDelIdent=pos;
 }  
 public void SetaddCount (Integer addc)
 {
 	 addCount=addc;
 }  
 
 
 public void delWrapper()
 {
  Integer toDelPos=-1;
  for (Integer idx=0; idx<wrappers.size(); idx++)
  {
   if (wrappers[idx].ident==toDelIdent)
   {
    toDelPos=idx;
   }
  }
   
  if (-1!=toDelPos)
  {
   delete wrappers[toDelpos].quol;	
   wrappers.remove(toDelPos);
  }
 }
  
 public void addRows()
 {
  	 
  for (Integer idx=0; idx<addCount; idx++)
  {
   wrappers.add(new QuoteLinesWrapper(nextIdent++,parentId));
  }
 }
  
 public PageReference save()
 {
  List<Quote_Line__c> quols=new List<Quote_Line__c>();
  for (QuoteLinesWrapper wrap : wrappers)
  {
   quols.add(wrap.quol);
  }
   
  upsert quols;
   
  // return new PageReference('/' + parentId);
  return null;
   
 }
  
 public void QuoteLinesExisting() {
  	List<Quote_Line__c> existingQuoteLines= [SELECT Id,Description__c,Price__c,Product_Code__c,Minimun_Order_Quantity__c,Units_of_measure__c,Presented__c,Lead_Time__c, quote__c from Quote_line__c WHERE quote__c = :parentId ORDER BY Name];	
  	for (Quote_Line__c quo :existingQuoteLines ) {
  	   	wrappers.add(new QuoteLinesWrapper(nextIdent++, quo));
  	   }
  	}   
  
  
 public with sharing class QuoteLinesWrapper
 {
  public Quote_Line__c quol    {get; private set;}
  public Integer ident {get; private set;}
   
  public QuoteLinesWrapper(Integer inIdent, Quote_Line__c quoteLine )
   {
   ident=inIdent;
   quol=quoteLine;
   }
 
  public QuoteLinesWrapper(Integer inIdent, String parentId )
  {
   ident=inIdent;
   quol=new Quote_Line__c();
   quol.Quote__c= parentId;
   }
  
  
 
 	}
}