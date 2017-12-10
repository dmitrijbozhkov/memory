/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function addDictionary(name: string) {
    let list = getDictSheet();
    let iterate = iterateCell(list, 3, 1);
    let id = freeId(iterateCell(list, 3, 2));
    untilEmptyRow(iterate, (cell) => {
        cell.setValue(name);
        list.getRange(cell.getRow(), 2).setValue(id);
    });
}

function addSubject(subjName: string, dictName: string) {
    let sheet = getDictSheet();
    let dict = findDictionary(dictName);
    let id = freeId(iterateCell(sheet, 3, 3));
    untilEmptyRow(iterateCell(sheet, 3, 5), (cell) => {
        cell.setValue(subjName);
        sheet.getRange(cell.getRow(), 3).setValue(id);
        sheet.getRange(cell.getRow(), 4).setValue(dict);
    });
}

function addLanguage(name: string) {
    let sheet = getDictSheet();
    let id = freeId(iterateCell(sheet, 3, 6));
    untilEmptyRow(iterateCell(sheet, 3, 7), (cell) => {
        cell.setValue(name);
        sheet.getRange(cell.getRow(), 6).setValue(id);
    });
}

function addNewTerm(term: string, exp: string, subj: string, lang: string) {
    let sheet = getDictSheet();
    let id = freeId(iterateCell(sheet, 3, 8));
    let subject = findSubject(subj);
    let language = findLanguage(lang);
    untilEmptyRow(iterateCell(sheet, 3, 11), (cell) => {
        cell.setValue(term);
        sheet.getRange(cell.getRow(), 12).setValue(exp);
        sheet.getRange(cell.getRow(), 10).setValue(language);
        sheet.getRange(cell.getRow(), 9).setValue(subject.id);
        sheet.getRange(cell.getRow(), 8).setValue(id);
    });
}