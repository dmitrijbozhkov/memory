/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

interface IReqEvent {
    queryString: string;
    parameter: { [key: string]: string };
    parameters: { [key: string]: string[] };
    contentLength: number;
    postData: {
        length: number;
        type: GoogleAppsScript.Content.MimeType;
        contents: any;
    };
}

const SHEET_ID = "1u5W1DZ0XJBU_IGhYyDbS1nNIqzhtdpupLXqGy77qC5g";

function getDictSheet(): GoogleAppsScript.Spreadsheet.Sheet {
    return SpreadsheetApp.openById(SHEET_ID).getSheetByName("Dictionaries");
}

function getActivitySheet(): GoogleAppsScript.Spreadsheet.Sheet {
    return SpreadsheetApp.openById(SHEET_ID).getSheetByName("Activity");
}

function doGet(event: IReqEvent): GoogleAppsScript.HTML.HtmlOutput {
    return HtmlService.createTemplateFromFile("main").evaluate();
}

function doPost(event: IReqEvent): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput("pepe");
}

function navigate(path: string) {
    let template;
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