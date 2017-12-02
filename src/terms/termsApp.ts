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

function getSheet(): GoogleAppsScript.Spreadsheet.Spreadsheet {
    return SpreadsheetApp.openById(SHEET_ID);
}

function doGet(event: IReqEvent): GoogleAppsScript.HTML.HtmlOutput {
    return HtmlService.createHtmlOutput("<h1>Super page</h1>");
}

function doPost(event: IReqEvent): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput("pepe");
}