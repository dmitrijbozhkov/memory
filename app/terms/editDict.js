/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function addDictionary(name) {
    var sheet = getSheet();
    if (sheet.getSheetByName(name)) {
        throw new Error("Dictionary already exists");
    }
    else {
        var dict = sheet.insertSheet(name);
        var headers = dict.getRange("A2:1");
        headers.setFontSize(14);
        headers.setBackground("#f4cccc");
        addDictionaryList(name, sheet);
    }
}
function addDictionaryList(name, sheet) {
    var list = sheet.getSheetByName("Main");
    var iterate = iterateCell(list, 1, 1);
    var cell;
    while (true) {
        cell = iterate.value();
        if (!cell.getValue()) {
            cell.setValue(name);
            break;
        }
        iterate.next(1, 0);
    }
}
function removeDictionary(name) {
    var sheet = getSheet();
    var dict = sheet.getSheetByName(name);
    if (!dict) {
        throw new Error("Dictionary already exists");
    }
    else {
        sheet.deleteSheet(dict);
        var main = sheet.getSheetByName("Main");
        var cell = findCell(name)(main, 1, 1);
        cell.setValue(null);
    }
}
