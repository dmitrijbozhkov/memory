/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function pickTemplate() {
    let html = HtmlService.createHtmlOutputFromFile("TemplatePicker.html")
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, "Выберите шаблон");
}

function pickFiles() {
    let html = HtmlService.createHtmlOutputFromFile("FilePicker.html")
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, "Выберите файл");
}

function setTemplate(url: string) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange("D2:D2").setValue(url);
}

function addSheetFile(url: string) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let last = sheet.getRange("E2:E").getValues().filter(String).length + 2;
    sheet.getRange(last, 5).setValue(url);
}

function getIdFromUrl(url) {
    return url.match(/[-\w]{25,}/);
}

function getOAuthToken() {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  }