/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function getDictionaries() {
    var sheet = getDictSheet();
    var iter = iterateCell(sheet, 3, 1);
    var dicts = [];
    var currDict;
    while (true) {
        currDict = iter.value().getValue();
        if (!currDict) {
            return dicts;
        }
        dicts.push(currDict);
        iter.next(1, 0);
    }
}
function findDictionary(name) {
    var sheet = getDictSheet();
    var dictCell = findCell(name)(iterateCell(sheet, 3, 1));
    return sheet.getRange(dictCell.getRow(), 2).getValue();
}
function findSubject(name) {
    var sheet = getDictSheet();
    var subjCell = findCell(name)(iterateCell(sheet, 3, 5));
    return {
        dictId: sheet.getRange(subjCell.getRow(), 4).getValue(),
        id: sheet.getRange(subjCell.getRow(), 3).getValue()
    };
}
function findLanguage(name) {
    var sheet = getDictSheet();
    var langCell = findCell(name)(iterateCell(sheet, 3, 7));
    return sheet.getRange(langCell.getRow(), 6).getValue();
}
