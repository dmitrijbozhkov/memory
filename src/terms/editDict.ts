/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function addDictionary(name: string) {
    let list = getDictSheet();
    let iterate = iterateRange(list, 3, 1, 1, 2);
    let id = freeId(iterateRange(list, 3, 2));
    let row = untilEmptyRow(iterate);
    row.setValues([[name, id]]);
}

function addSubject(subjName: string, dictName: string) {
    let sheet = getDictSheet();
    let dict = findDictionary(dictName);
    let id = freeId(iterateRange(sheet, 3, 3));
    let row = untilEmptyRow(iterateRange(sheet, 3, 3, 1, 3));
    row.setValues([[id, dict, subjName]]);
}

function addLanguage(name: string) {
    let sheet = getDictSheet();
    let id = freeId(iterateRange(sheet, 3, 6));
    let row = untilEmptyRow(iterateRange(sheet, 3, 6, 1, 2));
    row.setValues([[id, name]]);
}

function addNewTerm(term: string, exp: string, subj: string, lang: string) {
    let sheet = getDictSheet();
    let id = freeId(iterateRange(sheet, 3, 8));
    let subject = findSubject(subj);
    let language = findLanguage(lang);
    let row = untilEmptyRow(iterateRange(sheet, 3, 8, 1, 5));
    row.setValues([[id, subject.id, language, term, exp]]);
}

function addTermTransl(id: number, lang: string, term: string, exp: string) {
    let sheet = getDictSheet();
    let termCell = findCells(id)(iterateRange(sheet, 3, 8))[0];
    let subject = sheet.getRange(termCell.getRow(), 9).getValue();
    let language = findLanguage(lang);
    let row = untilEmptyRow(iterateRange(sheet, 3, 8, 1, 5));
    row.setValues([[id, subject, language, term, exp]]);
}

function editDictionary(name: string, changeName: string) {
    let sheet = getDictSheet();
    let dictCell = findCells(name)(iterateRange(sheet, 3, 1))[0];
    dictCell.setValue(changeName);
}

function editSubject(name: string, changeName: string) {
    let sheet = getDictSheet();
    let subjCell = findCells(name)(iterateRange(sheet, 3, 5))[0];
    subjCell.setValue(changeName);
}

function editTerm(name: string, changeName: string) {
    let sheet = getDictSheet();
    let termCell = findCells(name)(iterateRange(sheet, 3, 11))[0];
    termCell.setValue(changeName);
}

function editTermExplanation(name: string, expl: string) {
    let sheet = getDictSheet();
    let subjCell = findCells(name)(iterateRange(sheet, 3, 12))[0];
    sheet.getRange(subjCell.getRow(), 12).setValue(expl);
}

function removeTerms(terms: string[]) {
    let sheet = getDictSheet();
    let termCells = terms.map((name) => {
        return findCells(name)(iterateRange(sheet, 3, 11))[0];
    });
    termCells.forEach((termCell) => {
        sheet.getRange(termCell.getRow(), 8, 1, 5).setValues([[null, null, null, null, null]]);
    });
    patchRows(iterateRange(sheet, 3, 8, 1, 5), terms.length);
}

function removeSubjects(subjects: string[]) {
    let sheet = getDictSheet();
    let termCell: GoogleAppsScript.Spreadsheet.Range[];
    let termNames: string[] = [];
    let subjCells = subjects.map((name) => {
        return findCells(name)(iterateRange(sheet, 3, 5))[0];
    });
    subjCells.forEach((cell) => {
        termCell = findCells(sheet.getRange(cell.getRow(), 3).getValue())(iterateRange(sheet, 3, 9), Infinity);
        termNames = termNames.concat(termCell.map((term) => {
            return sheet.getRange(term.getRow(), 11).getValue() as string;
        }));
        sheet.getRange(cell.getRow(), 3, 1, 3).setValues([[null, null, null]]);
    });
    removeTerms(termNames);
    patchRows(iterateRange(sheet, 3, 3, 1, 3), subjCells.length);
}

function removeLanguages(languages: string[]) {
    let sheet = getDictSheet();
    let termCell: GoogleAppsScript.Spreadsheet.Range[];
    let termNames: string[] = [];
    let langCells = languages.map((name) => {
        return findCells(name)(iterateRange(sheet, 3, 7))[0];
    });
    langCells.forEach((cell) => {
        termCell = findCells(sheet.getRange(cell.getRow(), 6).getValue())(iterateRange(sheet, 3, 10), Infinity);
        termNames = termNames.concat(termCell.map((term) => {
            return sheet.getRange(term.getRow(), 11).getValue() as string;
        }));
        sheet.getRange(cell.getRow(), 6, 1, 2).setValues([[null, null]]);
    });
    removeTerms(termNames);
    patchRows(iterateRange(sheet, 3, 6, 1, 2), langCells.length);
}

function removeDictionaries(dictionaries: string[]) {
    let sheet = getDictSheet();
    let subjCell: GoogleAppsScript.Spreadsheet.Range[];
    let subjNames: string[] = [];
    let dictCells = dictionaries.map((name) => {
        return findCells(name)(iterateRange(sheet, 3, 1))[0];
    });
    dictCells.forEach((cell) => {
        subjCell = findCells(sheet.getRange(cell.getRow(), 2).getValue())(iterateRange(sheet, 3, 4), Infinity);
        subjNames = subjNames.concat(subjCell.map((subj) => {
            return sheet.getRange(subj.getRow(), 5).getValue() as string;
        }));
        sheet.getRange(cell.getRow(), 1, 1, 2).setValues([[null, null]]);
    });
    removeSubjects(subjNames);
    patchRows(iterateRange(sheet, 3, 1, 1, 2), dictCells.length);
}