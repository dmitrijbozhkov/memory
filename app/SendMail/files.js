/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function pickTemplate() {
    var html = HtmlService.createHtmlOutputFromFile("TemplatePicker.html")
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, "Выберите шаблон");
}
function pickFiles() {
    var html = HtmlService.createHtmlOutputFromFile("FilePicker.html")
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, "Выберите файл");
}
function setTemplate(url) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange("D2:D2").setValue(url);
}
function addSheetFile(url) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var last = sheet.getRange("E2:E").getValues().filter(String).length + 2;
    sheet.getRange(last, 5).setValue(url);
}
function getIdFromUrl(url) {
    return url.match(/[-\w]{25,}/);
}
function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
}
