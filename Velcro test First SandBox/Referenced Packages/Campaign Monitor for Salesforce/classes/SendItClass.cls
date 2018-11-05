/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class SendItClass {
    global static String ACTIVE;
    global static String BOUNCED;
    global static String BOUNCES;
    global static List<String> CALL_CAMPAIGN_TYPES;
    global static List<String> CALL_TYPES;
    global static String CLICKS;
    global static String DELETED;
    global static String EMAIL_CLICKED;
    global static String EMAIL_OPENED;
    global static String EMAIL_PATTERN;
    global static String EMAIL_SENT;
    global static String FREQUENCY_DAILY;
    global static String FREQUENCY_HOURLY;
    global static String FREQUENCY_MONTHLY;
    global static String FREQUENCY_NEVER;
    global static String FREQUENCY_WEEKLY;
    global static String OPENS;
    global static String RECIPIENTS;
    global static String TOKEN;
    global static String UNCONFIRMED;
    global static String UNSUBSCRIBED;
    global static String UNSUBSCRIBES;
    global SendItClass() {

    }
global class ActiveSubscriber {
}
global class AddSubscribers {
}
global class CMApiKey {
    global String ApiKey {
        get;
        set;
    }
    global CMApiKey() {

    }
}
global class CMCampaign {
}
global class CMCampaignResponse {
}
global class CMCampaignSummary {
    global Integer Bouncedx {
        get;
        set;
    }
    global Integer Clicksx {
        get;
        set;
    }
    global Integer Forwards {
        get;
        set;
    }
    global Integer Likes {
        get;
        set;
    }
    global Integer Mentions {
        get;
        set;
    }
    global Integer Recipientsx {
        get;
        set;
    }
    global Integer SpamComplaints {
        get;
        set;
    }
    global Integer TotalOpened {
        get;
        set;
    }
    global Integer UniqueOpened {
        get;
        set;
    }
    global Integer Unsubscribedx {
        get;
        set;
    }
    global String WebVersionTextURL {
        get;
        set;
    }
    global String WebVersionURL {
        get;
        set;
    }
    global String WorldviewURL {
        get;
        set;
    }
    global CMCampaignSummary() {

    }
}
global class CMClientKey {
    global String clientID {
        get;
        set;
    }
    global Id id {
        get;
        set;
    }
    global String name {
        get;
        set;
    }
    global String primaryContactEmail {
        get;
        set;
    }
}
global class CMClientKeys {
    global String ClientID {
        get;
        set;
    }
    global String Name {
        get;
        set;
    }
    global CMClientKeys() {

    }
}
global class CMExternalSessionRequest {
    global String chrome {
        get;
        set;
    }
    global String clientID {
        get;
        set;
    }
    global String email {
        get;
        set;
    }
    global String integratorID {
        get;
        set;
    }
    global String url {
        get;
        set;
    }
}
global class CMExternalSessionResponse {
    global String sessionUrl {
        get;
        set;
    }
    global CMExternalSessionResponse() {

    }
}
global class CMListDetail {
    global CMListDetail() {

    }
}
global class CMLists {
    global String clientID {
        get;
        set;
    }
    global String clientName {
        get;
        set;
    }
    global String listID {
        get;
        set;
    }
    global String name {
        get;
        set;
    }
}
global class CMMembers {
    global List<Contact> contacts {
        get;
        set;
    }
    global String jsonBody {
        get;
        set;
    }
    global List<Lead> leads {
        get;
        set;
    }
    global String listId {
        get;
        set;
    }
    global String listName {
        get;
        set;
    }
    global CMMembers() {

    }
}
global class CMOAuthErrorResponse {
    global String error {
        get;
        set;
    }
    global String error_description {
        get;
        set;
    }
    global CMOAuthErrorResponse() {

    }
}
global class CMOAuthResponse {
    global String access_token {
        get;
        set;
    }
    global String expires_in {
        get;
        set;
    }
    global wbsendit.SendItClass.MsgResponse msgResponse {
        get;
        set;
    }
    global String refresh_token {
        get;
        set;
    }
}
global class CMPrimaryContact {
    global String emailAddress {
        get;
        set;
    }
    global CMPrimaryContact() {

    }
}
global class CMResponse {
}
global class Campaign {
}
global class CampaignBouncesResponse {
}
global class CampaignBouncesResults {
    global CampaignBouncesResults() {

    }
}
global class CampaignClicksResponse {
}
global class CampaignClicksResults {
    global CampaignClicksResults() {

    }
}
global class CampaignList {
    global String listID {
        get;
        set;
    }
    global String name {
        get;
        set;
    }
    global CampaignList() {

    }
}
global class CampaignOpensResponse {
}
global class CampaignOpensResults {
    global CampaignOpensResults() {

    }
}
global class CampaignRecipientsResponse {
}
global class CampaignRecipientsResults {
    global CampaignRecipientsResults() {

    }
}
global class CampaignSegment {
    global String listID {
        get;
        set;
    }
    global String segmentID {
        get;
        set;
    }
    global String title {
        get;
        set;
    }
    global CampaignSegment() {

    }
}
global class CampaignSegmentList {
    global List<wbsendit.SendItClass.CampaignList> lists {
        get;
        set;
    }
    global List<wbsendit.SendItClass.CampaignSegment> segments {
        get;
        set;
    }
    global CampaignSegmentList() {

    }
}
global class CampaignUnsubscribesResponse {
}
global class CampaignUnsubscribesResults {
    global CampaignUnsubscribesResults() {

    }
}
global class CreateList {
    global CreateList() {

    }
}
global class CustomFields {
}
global class FailureDetails {
}
global class ListDetails {
    global ListDetails() {

    }
}
global class MsgResponse {
    global MsgResponse(String code, String message, String body) {

    }
}
global class ResultData {
}
global class Results {
}
global class Rule {
    global String clause {
        get;
        set;
    }
    global String ruleType {
        get;
        set;
    }
    global Rule(String ruleType, String clause) {

    }
}
global class RuleGroup {
    global List<wbsendit.SendItClass.Rule> rules {
        get;
        set;
    }
    global RuleGroup(List<wbsendit.SendItClass.Rule> rules) {

    }
}
global class Segment {
    global String listID {
        get;
        set;
    }
    global List<wbsendit.SendItClass.RuleGroup> ruleGroups {
        get;
        set;
    }
    global String segmentID {
        get;
        set;
    }
    global String title {
        get;
        set;
    }
    global Segment(String title, List<wbsendit.SendItClass.RuleGroup> ruleGroups) {

    }
}
global class SubscriberResponse {
    global SubscriberResponse(String orgId, String licenseStatus, Date expirationDate, Decimal monthlyValueUSD, Decimal sendItValue, Decimal potentialValue, Decimal sendItSubscribers) {

    }
}
global class SubscriberState {
}
global class SubscriberStats {
    global SubscriberStats() {

    }
}
global class Subscribers {
}
global class SubsriberCustomFields {
}
}
