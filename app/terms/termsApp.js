/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function doGet(event) {
    return HtmlService.createHtmlOutput("<h1>Super page</h1>");
}
function doPost(event) {
    return ContentService.createTextOutput("pepe");
}
