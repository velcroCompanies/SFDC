global with sharing class SVE_20180413173713_view extends SkyEditor2.SkyEditorPageBaseWithSharing {
	
	public Salesforce_Ticket__c record {get{return (Salesforce_Ticket__c)mainRecord;}}
	public with sharing class CanvasException extends Exception {}

	
	
	{
	setApiVersion(31.0);
	}
	public SVE_20180413173713_view(ApexPages.StandardController controller) {
		super(controller);


		SObjectField f;

		f = Salesforce_Ticket__c.fields.Employee_Email__c;
		f = Salesforce_Ticket__c.fields.Employee_First_Name__c;
		f = Salesforce_Ticket__c.fields.Employee_Last_Name__c;
		f = Salesforce_Ticket__c.fields.Timezone__c;

		List<RecordTypeInfo> recordTypes;
		try {
			mainSObjectType = Salesforce_Ticket__c.SObjectType;
			setPageReferenceFactory(new PageReferenceFactory());
			
			mainQuery = new SkyEditor2.Query('Salesforce_Ticket__c');
			mainQuery.addFieldAsOutput('Name');
			mainQuery.addFieldAsOutput('Employee_Email__c');
			mainQuery.addFieldAsOutput('Employee_First_Name__c');
			mainQuery.addFieldAsOutput('Employee_Last_Name__c');
			mainQuery.addFieldAsOutput('Timezone__c');
			mainQuery.addWhere('Id', mainRecord.Id, SkyEditor2.WhereOperator.Eq)
				.limitRecords(1);
			
			
			
			mode = SkyEditor2.LayoutMode.LayoutFree; 
			
			queryMap = new Map<String, SkyEditor2.Query>();
			SkyEditor2.Query query;
			
			
			p_showHeader = true;
			p_sidebar = true;
			sve_ClassName = 'SVE_20180413173713_view';
			init();
			
			if (record.Id == null) {
				
				saveOldValues();
				
			}

			
			
		}  catch (SkyEditor2.Errors.FieldNotFoundException e) {
			fieldNotFound(e);
		} catch (SkyEditor2.Errors.RecordNotFoundException e) {
			recordNotFound(e);
		} catch (SkyEditor2.ExtenderException e) {
			e.setMessagesToPage();
		}
	}
	

	@TestVisible
		private void sObjectNotFound(SkyEditor2.Errors.SObjectNotFoundException e) {
		SkyEditor2.Messages.addErrorMessage(e.getMessage());
		hidePageBody = true;
	}
	@TestVisible
		private void fieldNotFound(SkyEditor2.Errors.FieldNotFoundException e) {
		SkyEditor2.Messages.addErrorMessage(e.getMessage());
		hidePageBody = true;
	}
	@TestVisible
		private void recordNotFound(SkyEditor2.Errors.RecordNotFoundException e) {
		SkyEditor2.Messages.addErrorMessage(e.getMessage());
		hidePageBody = true;
	}

	with sharing class PageReferenceFactory implements SkyEditor2.PageReferenceFactory.Implementation {
		public PageReference newPageReference(String url) {
			return new PageReference(url);
		}
	}
}