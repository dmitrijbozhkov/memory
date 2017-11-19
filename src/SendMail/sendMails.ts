/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

type linkList = [ string ][];

function sendData(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    return {
        "emails": sheet.getRange("A2:A").getValues().filter(String),
        "subject": sheet.getRange("C2:C2").getValue(),
        "template": sheet.getRange("D2:D2").getValue(),
        "files": sheet.getRange("E2:E").getValues().filter(String)
    };
}

function getTemplate(url: string) {
    let id = getIdFromUrl(url);
    let htmlUrl = `https://docs.google.com/feeds/download/documents/export/Export?id=${id}&exportFormat=html`;
    let param = {
      method      : "get",
      headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
      muteHttpExceptions: true,
    };
    return UrlFetchApp.fetch(htmlUrl, param as any).getContentText();
}

function getFiles(files: linkList) {
    return files.map((link) => {
        return DriveApp.getFileById(getIdFromUrl(link[0]));
    });
}

function setSendAmount(sheet: GoogleAppsScript.Spreadsheet.Sheet, mailNum: number) {
    let cell = sheet.getRange(mailNum + 1, 2);
    let val = cell.getValue();
    if (val === parseInt(val as string, 10)) {
        cell.setValue((val as number) + 1);
    } else {
        cell.setValue(1);
    }
}

function sendMails() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data = sendData(sheet);
    let template = "";
    if (docUrl(data.template as string)) {
        template = getTemplate(data.template as string);
    } else {
        template = data.template as string;
    }
    let files = getFiles(data.files as any);
    let numCount = 1;
    (data.emails as linkList).forEach((email) => {
        if (docUrl(template)) {
            MailApp.sendEmail(email[0], data.subject as string, "", {
                "htmlBody": template,
                "attachments": files
            });
        } else {
            MailApp.sendEmail(email[0], data.subject as string, template, {
                "attachments": files
            });
        }
        setSendAmount(sheet, numCount);
        numCount += 1;
    });
}

function docUrl(str: string) {
    return str.match(/^https\:\/\/docs\.google\.com\/document\/d\/.+/i);
}