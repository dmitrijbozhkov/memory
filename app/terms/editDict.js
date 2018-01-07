/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function addDictionary(name) {
    var list = getDictSheet();
    var iterate = iterateRange(list, 3, 1, 1, 2);
    var id = freeId(iterateRange(list, 3, 2));
    var row = untilEmptyRow(iterate);
    row.setValues([[name, id]]);
}
function addSubject(subjName, dictName) {
    var sheet = getDictSheet();
    var dict = findDictionary(dictName);
    var id = freeId(iterateRange(sheet, 3, 3));
    var row = untilEmptyRow(iterateRange(sheet, 3, 3, 1, 3));
    row.setValues([[id, dict, subjName]]);
}
function addLanguage(name) {
    var sheet = getDictSheet();
    var id = freeId(iterateRange(sheet, 3, 6));
    var row = untilEmptyRow(iterateRange(sheet, 3, 6, 1, 2));
    row.setValues([[id, name]]);
}
function addNewTerm(term, exp, subj, lang) {
    var sheet = getDictSheet();
    var id = freeId(iterateRange(sheet, 3, 8));
    var subject = findSubject(subj);
    var language = findLanguage(lang);
    var row = untilEmptyRow(iterateRange(sheet, 3, 8, 1, 5));
    row.setValues([[id, subject.id, language, term, exp]]);
}
function addTermTransl(id, lang, term, exp) {
    var sheet = getDictSheet();
    var termCell = findCells(id)(iterateRange(sheet, 3, 8))[0];
    var subject = sheet.getRange(termCell.getRow(), 9).getValue();
    var language = findLanguage(lang);
    var row = untilEmptyRow(iterateRange(sheet, 3, 8, 1, 5));
    row.setValues([[id, subject, language, term, exp]]);
}
function editDictionary(name, changeName) {
    var sheet = getDictSheet();
    var dictCell = findCells(name)(iterateRange(sheet, 3, 1))[0];
    dictCell.setValue(changeName);
}
function editSubject(name, changeName) {
    var sheet = getDictSheet();
    var subjCell = findCells(name)(iterateRange(sheet, 3, 5))[0];
    subjCell.setValue(changeName);
}
function editTerm(name, changeName) {
    var sheet = getDictSheet();
    var termCell = findCells(name)(iterateRange(sheet, 3, 11))[0];
    termCell.setValue(changeName);
}
function editTermExplanation(name, expl) {
    var sheet = getDictSheet();
    var subjCell = findCells(name)(iterateRange(sheet, 3, 12))[0];
    sheet.getRange(subjCell.getRow(), 12).setValue(expl);
}
function removeTerms(terms) {
    var sheet = getDictSheet();
    var termCells = terms.map(function (name) {
        return findCells(name)(iterateRange(sheet, 3, 11))[0];
    });
    termCells.forEach(function (termCell) {
        sheet.getRange(termCell.getRow(), 8, 1, 5).setValues([[null, null, null, null, null]]);
    });
    patchRows(iterateRange(sheet, 3, 8, 1, 5), terms.length);
}
function removeSubjects(subjects) {
    var sheet = getDictSheet();
    var termCell;
    var termNames = [];
    var subjCells = subjects.map(function (name) {
        return findCells(name)(iterateRange(sheet, 3, 5))[0];
    });
    subjCells.forEach(function (cell) {
        termCell = findCells(sheet.getRange(cell.getRow(), 3).getValue())(iterateRange(sheet, 3, 9), Infinity);
        termNames = termNames.concat(termCell.map(function (term) {
            return sheet.getRange(term.getRow(), 11).getValue();
        }));
        sheet.getRange(cell.getRow(), 3, 1, 3).setValues([[null, null, null]]);
    });
    removeTerms(termNames);
    patchRows(iterateRange(sheet, 3, 3, 1, 3), subjCells.length);
}
function removeLanguages(languages) {
    var sheet = getDictSheet();
    var termCell;
    var termNames = [];
    var langCells = languages.map(function (name) {
        return findCells(name)(iterateRange(sheet, 3, 7))[0];
    });
    langCells.forEach(function (cell) {
        termCell = findCells(sheet.getRange(cell.getRow(), 6).getValue())(iterateRange(sheet, 3, 10), Infinity);
        termNames = termNames.concat(termCell.map(function (term) {
            return sheet.getRange(term.getRow(), 11).getValue();
        }));
        sheet.getRange(cell.getRow(), 6, 1, 2).setValues([[null, null]]);
    });
    removeTerms(termNames);
    patchRows(iterateRange(sheet, 3, 6, 1, 2), langCells.length);
}
function removeDictionaries(dictionaries) {
    var sheet = getDictSheet();
    var subjCell;
    var subjNames = [];
    var dictCells = dictionaries.map(function (name) {
        return findCells(name)(iterateRange(sheet, 3, 1))[0];
    });
    dictCells.forEach(function (cell) {
        subjCell = findCells(sheet.getRange(cell.getRow(), 2).getValue())(iterateRange(sheet, 3, 4), Infinity);
        subjNames = subjNames.concat(subjCell.map(function (subj) {
            return sheet.getRange(subj.getRow(), 5).getValue();
        }));
        sheet.getRange(cell.getRow(), 1, 1, 2).setValues([[null, null]]);
    });
    removeSubjects(subjNames);
    patchRows(iterateRange(sheet, 3, 1, 1, 2), dictCells.length);
}
