/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function getDictionaries() {
    let sheet = getDictSheet();
    let iter = iterateCell(sheet, 3, 1);
    let dicts = [];
    let currDict;
    while (true) {
        currDict = iter.value().getValue();
        if (!currDict) {
            return dicts;
        }
        dicts.push(currDict);
        iter.next(1, 0);
    }
}

function findDictionary(name: string) {
    let sheet = getDictSheet();
    let dictCell = findCell(name)(iterateCell(sheet, 3, 1));
    return sheet.getRange(dictCell.getRow(), 2).getValue();
}

function findSubject(name: string) {
    let sheet = getDictSheet();
    let subjCell = findCell(name)(iterateCell(sheet, 3, 5));
    return {
        dictId: sheet.getRange(subjCell.getRow(), 4).getValue(),
        id: sheet.getRange(subjCell.getRow(), 3).getValue()
    };
}

function findLanguage(name: string) {
    let sheet = getDictSheet();
    let langCell = findCell(name)(iterateCell(sheet, 3, 7));
    return sheet.getRange(langCell.getRow(), 6).getValue();
}