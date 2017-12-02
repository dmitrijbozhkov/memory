/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
var SHEET_ID = "1u5W1DZ0XJBU_IGhYyDbS1nNIqzhtdpupLXqGy77qC5g";
function getSheet() {
    return SpreadsheetApp.openById(SHEET_ID);
}
function doGet(event) {
    return HtmlService.createHtmlOutput("<h1>Super page</h1>");
}
function doPost(event) {
    return ContentService.createTextOutput("pepe");
}
