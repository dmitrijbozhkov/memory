/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
var SHEET_ID = "1u5W1DZ0XJBU_IGhYyDbS1nNIqzhtdpupLXqGy77qC5g";
function getSheet() {
    return SpreadsheetApp.openById(SHEET_ID);
}
function doGet(event) {
    return HtmlService.createTemplateFromFile("main").evaluate();
}
function doPost(event) {
    return ContentService.createTextOutput("pepe");
}
function navigate(path) {
    var template;
    switch (path) {
        case "dict":
            template = "dictionaries";
            break;
        case "learn":
            template = "learn";
            break;
        case "stat":
            template = "statistics";
            break;
    }
    return HtmlService.createTemplateFromFile(template).evaluate().getContent();
}
