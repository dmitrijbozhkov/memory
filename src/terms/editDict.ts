/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function addDictionary(name: string) {
    let sheet = getSheet();
    if (sheet.getSheetByName(name)) {
        throw new Error("Dictionary already exists");
    } else {
        let dict = sheet.insertSheet(name);
        let headers = dict.getRange("A2:1");
        headers.setFontSize(14);
        headers.setBackground("#f4cccc");
        addDictionaryList(name, sheet);
    }
}

function addDictionaryList(name: string, sheet: GoogleAppsScript.Spreadsheet.Spreadsheet) {
    let list = sheet.getSheetByName("Main");
    let iterate = iterateCell(list, 1, 1);
    let cell;
    while (true) {
        cell = iterate.value();
        if (!cell.getValue()) {
            cell.setValue(name);
            break;
        }
        iterate.next(1, 0);
    }
}

function removeDictionary(name: string) {
    let sheet = getSheet();
    let dict = sheet.getSheetByName(name);
    if (!dict) {
        throw new Error("Dictionary already exists");
    } else {
        sheet.deleteSheet(dict);
        let main = sheet.getSheetByName("Main");
        let cell = findCell(name)(main, 1, 1);
        cell.setValue(null);
    }
}