global with sharing class LocationsNearbyMe {

public Lead leads{get; set;}
public Account accounts{get; set;}


@RemoteAction
   global static List<Lead> getNearbyLeads(String lat, String lon, String dist,String zipcodes, String budget, String userfilter ) {

        if(lat == null || lon == null || lat.equals('') || lon.equals('')) {
            lat = '40.416775';
            lon = '-3.703790';
            //madrid 
        }
        String filter=' ';
        if (userfilter!='ALL') filter ='AND Owner.Id = \''+ userfilter+'\' ';
  
        String queryString =
            'SELECT Id, Name, Longitude, Latitude, ' +
            'Street, City,State,Country, PostalCode ' +
            'FROM Lead ' +
            'WHERE PostalCode like \'%'+zipcodes+'%\' ' +
             filter +
            'AND DISTANCE( Address, GEOLOCATION('+ lat+ ' ,'+ lon +'),\'km\')< '+ dist +' '+
            'LIMIT 2000';
        return(database.Query(queryString));
    }


@RemoteAction
   global static List<Account> getNearbyAccounts(String lat, String lon, String dist,String zipcodes, String budget,String userfilter ) {

        if(lat == null || lon == null || lat.equals('') || lon.equals('')) {
            lat = '40.416775';
            lon = '-3.703790';
            //madrid 
        }
        Integer ValBudget = 0;
        String filter=' ';
        if (userfilter!='ALL') filter ='AND Owner.Id = \''+ userfilter+'\' ';
        
        if (budget!=null)  { 
              if (budget.isNumeric()) { 
                  ValBudget = Integer.ValueOf(budget);
              }
         }
         
        String queryString =
             'SELECT Id, Name, BillingLongitude, BillingLatitude, Phone ,BillingStreet, BillingCity ,Actual_YTD_Gross_Sales__c,Gross_Budget__c   ' +
            'FROM Account ' +
            'WHERE BillingPostalCode like \'%'+zipcodes+'%\' ' +
             filter +
            ' AND Adjusted_Gross_Sales_Budget__c >=' + ValBudget+' '+
            ' AND DISTANCE( BillingAddress, GEOLOCATION('+ lat+ ' ,'+ lon +'),\'km\')< '+ dist +' '+
            ' LIMIT 2000';
        return(database.Query(queryString));
    }
    

   

}