/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function addDictionary(name) {
    var sheet = getSheet();
    if (sheet.getSheetByName(name)) {
        throw new Error("Dictionary already exists");
    }
    else {
        var dict = sheet.insertSheet(name);
        populateDictionary(name, dict);
    }
}
function populateDictionaryRanges(sheet) {
    return {
        headers: sheet.getRange("A4:1"),
        nameCell: sheet.getRange("A1"),
        subjectCell: sheet.getRange("A2")
    };
}
function populateDictionary(name, sheet) {
    var ranges = populateDictionaryRanges(sheet);
    ranges.headers.setFontSize(14);
    ranges.nameCell.setBackground("#d9d2e9");
    ranges.subjectCell.setBackground("#f4cccc");
    ranges.nameCell.setValue(name);
}
function addLanguage(name) {
}
function populateLanguage() {
}
