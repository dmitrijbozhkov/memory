/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function addDictionary(name: string) {
    let sheet = getSheet();
    if (sheet.getSheetByName(name)) {
        throw new Error("Dictionary already exists");
    } else {
        let dict = sheet.insertSheet(name);
        populateDictionary(name, dict);
    }
}

function populateDictionaryRanges(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    return {
        headers: sheet.getRange("A4:1"),
        nameCell: sheet.getRange("A1"),
        subjectCell: sheet.getRange("A2")
    };
}

function populateDictionary(name: string, sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    let ranges = populateDictionaryRanges(sheet);
    ranges.headers.setFontSize(14);
    ranges.nameCell.setBackground("#d9d2e9");
    ranges.subjectCell.setBackground("#f4cccc");
    ranges.nameCell.setValue(name);
}

function addLanguage(name: string) {
}

function populateLanguage() {
}
