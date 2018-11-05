/********************************************************/
/*** Roger Fontcuberta				 					*/
/*** 24/05/2018 										*/
/*** Get tasks related to a Contact					  	*/
/** las modified:  04/06/2018							*/
/********************************************************/
public with sharing class ExtTaskList 

{
 public String parentId;

 private final Contact cont;
 private String ConId='';
 
 public ExtTaskList(ApexPages.StandardController stdController)
 {
    this.cont = (Contact)stdController.getRecord();
    ID contactId= System.currentPagereference().getParameters().get('Id');	
    
    if (cont!=null) { conId = cont.Id; }
    else { conId=contactId; }
    
 }
  
 public List<Task> getTaskListing() {
  	 List<Task> taskList = [select Id,OwnerId,whoId,whatId,Subject,ActivityDate,Priority,Status,LastModifiedDate   From Task  where Id IN (SELECT TaskId FROM TaskRelation WHERE RelationId =:conId) ];
  	 return taskList;
    }
 }