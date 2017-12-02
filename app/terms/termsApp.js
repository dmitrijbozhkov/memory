/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
var SHEET_ID = "1u5W1DZ0XJBU_IGhYyDbS1nNIqzhtdpupLXqGy77qC5g";
function getSheet() {
    return SpreadsheetApp.openById(SHEET_ID);
}
function doGet(event) {
    switch (event.parameter.menu) {
        case "lang":
            return HtmlService.createTemplateFromFile("languages").evaluate();
        case "dict":
            return HtmlService.createTemplateFromFile("dictionaries").evaluate();
        case "learn":
            return HtmlService.createTemplateFromFile("learn").evaluate();
        default:
            return HtmlService.createTemplateFromFile("main").evaluate();
    }
}
function doPost(event) {
    return ContentService.createTextOutput("pepe");
}
