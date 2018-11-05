/**
 * Sum Annual_Potential_APAC__c to Total_Potential_APAC__c(removed)
 * Sum Total_Price_APAC__c to Total_Value_APAC__c
 * CreatedBy:JohnnyLi
 * CreatedDate:2018-8-2
 */
public without sharing class APAC_SampleLineHandler {
    /**
     * After Insert, After Update,After Delete
     */
	public static void sumToSampleRequest(List<Sample_Line__c> lines){
		Set<Id> reqIds = new Set<Id>();
		Set<String> ownerRegions = new Set<String>();
		//support only one Currency
		String lineCurrency;
		for(Sample_Line__c line:lines){
			if(line.Sample_Request__c==null)continue;
			if(line.Account_Owner_Region_APAC__c==null)continue;
			System.debug(line.Account_Owner_Region_APAC__c);
			//Only Executes For APAC
			if(!Label.APAC_Region.contains(line.Account_Owner_Region_APAC__c))continue;
			reqIds.add(line.Sample_Request__c);
			lineCurrency=line.CurrencyIsoCode;
		}
		System.debug('lineCurrency='+lineCurrency);
		System.debug('reqIds.size()='+reqIds.size());
		if(lineCurrency==null)return;
		if(reqIds.size()<=0)return;
		Map<Id,Sample_Request__c> requestMap = new Map<Id,Sample_Request__c>([Select id,Total_Potential_APAC__c,Total_Value_APAC__c
		                                    from Sample_Request__c
		                                    where id in :reqIds]);
		List<AggregateResult> lines2 = [Select Sample_Request__c,
		                               //sum(Annual_Potential_APAC__c) Total_Potential,
		                               sum(Total_Price_APAC__c) Total_Value
		                               //sum(Annual_QTY_UOM_APAC__c) Total_Qty
		               				from Sample_Line__c Group By Sample_Request__c
		               				Having Sample_Request__c in:reqIds];
		System.debug('lines2='+lines2);
		//Query Conversion Rate
		Double conversionRate = [SELECT conversionrate FROM currencytype WHERE isocode =: lineCurrency LIMIT 1].conversionRate;
		System.debug('conversionRate='+conversionRate);
		//Map<Id,Decimal> Total_PotentialMap = new Map<Id,Decimal>();
		Map<Id,Decimal> Total_ValueMap = new Map<Id,Decimal>();
		//Map<Id,Decimal> Total_QtyMap = new Map<Id,Decimal>();
		for(AggregateResult result:lines2){
			//if(result.get('Total_Potential')!=null)
			//Total_PotentialMap.put((Id)result.get('Sample_Request__c'),((Decimal)result.get('Total_Potential'))*conversionRate);
			if(result.get('Total_Value')!=null)
			Total_ValueMap.put((Id)result.get('Sample_Request__c'),((Decimal)result.get('Total_Value'))*conversionRate);
			//if(result.get('Total_Qty')!=null)
		    //Total_QtyMap.put((Id)result.get('Sample_Request__c'),(Decimal)result.get('Total_Qty'));
		}
		for(Id reqId:requestMap.keySet()){
			//if(Total_PotentialMap.get(reqId)!=null)
				//requestMap.get(reqId).Total_Potential_APAC__c=Total_PotentialMap.get(reqId);
			//else requestMap.get(reqId).Total_Potential_APAC__c=0;
			
			if(Total_ValueMap.get(reqId)!=null)
				requestMap.get(reqId).Total_Value_APAC__c=Total_ValueMap.get(reqId);
			else requestMap.get(reqId).Total_Value_APAC__c=0;
			
			/*if(Total_QtyMap.get(reqId)!=null)
				requestMap.get(reqId).Total_Annual_QTY_UOM_APAC__c=Total_QtyMap.get(reqId);
			else requestMap.get(reqId).Total_Annual_QTY_UOM_APAC__c=0;*/
		}
		update requestMap.values();
		
	}
}