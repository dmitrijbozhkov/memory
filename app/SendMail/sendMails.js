/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function sendData(sheet) {
    return {
        "emails": sheet.getRange("A2:A").getValues().filter(String),
        "subject": sheet.getRange("C2:C2").getValue(),
        "template": sheet.getRange("D2:D2").getValue(),
        "files": sheet.getRange("E2:E").getValues().filter(String)
    };
}
function getTemplate(url) {
    var id = getIdFromUrl(url);
    var htmlUrl = "https://docs.google.com/feeds/download/documents/export/Export?id=" + id + "&exportFormat=html";
    var param = {
        method: "get",
        headers: { "Authorization": "Bearer " + ScriptApp.getOAuthToken() },
        muteHttpExceptions: true,
    };
    return UrlFetchApp.fetch(htmlUrl, param).getContentText();
}
function getFiles(files) {
    return files.map(function (link) {
        return DriveApp.getFileById(getIdFromUrl(link[0]));
    });
}
function setSendAmount(sheet, mailNum) {
    var cell = sheet.getRange(mailNum + 1, 2);
    var val = cell.getValue();
    if (val === parseInt(val, 10)) {
        cell.setValue(val + 1);
    }
    else {
        cell.setValue(1);
    }
}
function sendMails() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sendData(sheet);
    var template = "";
    if (docUrl(data.template)) {
        template = getTemplate(data.template);
    }
    else {
        template = data.template;
    }
    var files = getFiles(data.files);
    var numCount = 1;
    data.emails.forEach(function (email) {
        if (docUrl(template)) {
            MailApp.sendEmail(email[0], data.subject, "", {
                "htmlBody": template,
                "attachments": files
            });
        }
        else {
            MailApp.sendEmail(email[0], data.subject, template, {
                "attachments": files
            });
        }
        setSendAmount(sheet, numCount);
        numCount += 1;
    });
}
function docUrl(str) {
    return str.match(/^https\:\/\/docs\.google\.com\/document\/d\/.+/i);
}
