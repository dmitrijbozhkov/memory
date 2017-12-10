/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function addDictionary(name) {
    var list = getDictSheet();
    var iterate = iterateCell(list, 3, 1);
    var id = freeId(iterateCell(list, 3, 2));
    untilEmptyRow(iterate, function (cell) {
        cell.setValue(name);
        list.getRange(cell.getRow(), 2).setValue(id);
    });
}
function addSubject(subjName, dictName) {
    var sheet = getDictSheet();
    var dict = findDictionary(dictName);
    var id = freeId(iterateCell(sheet, 3, 3));
    untilEmptyRow(iterateCell(sheet, 3, 5), function (cell) {
        cell.setValue(subjName);
        sheet.getRange(cell.getRow(), 3).setValue(id);
        sheet.getRange(cell.getRow(), 4).setValue(dict);
    });
}
function addLanguage(name) {
    var sheet = getDictSheet();
    var id = freeId(iterateCell(sheet, 3, 6));
    untilEmptyRow(iterateCell(sheet, 3, 7), function (cell) {
        cell.setValue(name);
        sheet.getRange(cell.getRow(), 6).setValue(id);
    });
}
function addNewTerm(term, exp, subj, lang) {
    var sheet = getDictSheet();
    var id = freeId(iterateCell(sheet, 3, 8));
    var subject = findSubject(subj);
    var language = findLanguage(lang);
    untilEmptyRow(iterateCell(sheet, 3, 11), function (cell) {
        cell.setValue(term);
        sheet.getRange(cell.getRow(), 12).setValue(exp);
        sheet.getRange(cell.getRow(), 10).setValue(language);
        sheet.getRange(cell.getRow(), 9).setValue(subject.id);
        sheet.getRange(cell.getRow(), 8).setValue(id);
    });
}
