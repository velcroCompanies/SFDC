global with sharing class LeadsNearbyMe {

public Lead leads{get; set;}
public Account accounts{get; set;}


@RemoteAction
   global static List<Lead> getNearbyLeads(String lat, String lon, String dist ) {

        if(lat == null || lon == null || lat.equals('') || lon.equals('')) {
            lat = '40.416775';
            lon = '-3.703790';
            //madrid 
        }

        String queryString =
            'SELECT Id, Name, Longitude, Latitude, ' +
            'Street, City,State,Country, PostalCode ' +
            'FROM Lead ' +
            'WHERE DISTANCE( Address, GEOLOCATION('+ lat+ ' ,'+ lon +'),\'km\')< '+ dist +' '+
            'LIMIT 500';
        return(database.Query(queryString));
    }


@RemoteAction
   global static List<Account> getNearbyAccounts(String lat, String lon, String dist ) {

        if(lat == null || lon == null || lat.equals('') || lon.equals('')) {
            lat = '40.416775';
            lon = '-3.703790';
            //madrid 
        }

        String queryString =
            'SELECT Id, Name, BillingLongitude, BillingLatitude, Phone ,BillingStreet, BillingCity ,Actual_YTD_Gross_Sales__c,Gross_Budget__c   ' +
            'FROM Account ' +
            'WHERE DISTANCE( BillingAddress, GEOLOCATION('+ lat+ ' ,'+ lon +'),\'km\')< '+ dist +' '+
            'LIMIT 500';
        return(database.Query(queryString));
    }
}