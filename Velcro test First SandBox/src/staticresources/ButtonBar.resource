function NewQuote(accId){
var url = '/apex/createoppnquote__CreateOpportunityQuote?id='+accId;
var openSubTab = function OpenPrimaryTab(result) {
sforce.console.openPrimaryTab(null, url, true, 'Create Opportunity & Quote', null);
}

if (sforce.console.isInConsole())
sforce.console.getFocusedPrimaryTabId(openSubTab);
else {
 //alert(url);
 window.parent.location.href = url;
}
}

function NewOpportunity(accId){
var url= '/006/e?retURL=/'+accId+'&RecordType=012A00000019lmh&ent=Opportunity&accid='+accId+'&AccountId='+accId;
var openSubTab = function OpenPrimaryTab(result) {
sforce.console.openPrimaryTab(null, url, true, 'New Opportunity', null);
}

if (sforce.console.isInConsole())
sforce.console.getFocusedPrimaryTabId(openSubTab);
else {
 //alert(url);
 window.parent.location.href = url;
}
}
function NewSampleRequest(accId,accName,userName,userId){

var url='/a0T/e?CF00NA000000BShjL='+accName+'&CF00NA000000BShjL_lkid='+accId+'&CF00NA000000CHhV1='+userName+'&CF00NA000000CHhV1_lkid='+userId+'&retURL=/'+accId; 
var openSubTab = function OpenPrimaryTab(result) {
sforce.console.openPrimaryTab(null, url, true, 'Sample Request', null);
}

if (sforce.console.isInConsole())
sforce.console.getFocusedPrimaryTabId(openSubTab);
else {
 //alert(url);
 window.parent.location.href = url;
}
}