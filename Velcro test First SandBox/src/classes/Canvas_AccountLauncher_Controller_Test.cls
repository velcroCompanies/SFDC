/*
    Test class for Canvas Account wrapper
    Prepared by: J. McCarvill - jmccarvill@harvestsolutions.net
    2/16/2015

*/

@isTest
public with sharing class Canvas_AccountLauncher_Controller_Test {

    public static testMethod void CanvasTest() {

        //create a test account
        Account pAccount = new Account();
        pAccount.Name='Test Account';
        pAccount.SBU__C='Transportation';
        insert(pAccount);


        //Use the PageReference Apex class to instantiate a test page for this controller
        PageReference pageRef = Page.Canvas_AccountLauncher;

        //In this case, the Visualforce page is the starting point of this test method. 
        Test.setCurrentPage(pageRef);

        //Instantiate and construct the controller class.
        ApexPages.StandardController stdController = new ApexPages.StandardController(pAccount);
        Canvas_AccountLauncher_Controller controller = new Canvas_AccountLauncher_Controller(stdController);
        
        
    }

}