/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function getDictionaries() {
    var sheet = getDictSheet();
    var iter = iterateRange(sheet, 3, 1);
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
function searchResult(result, offset, amount) {
    return {
        count: result.length,
        result: result.slice(offset, amount)
    };
}
function searchTerms(searchStr, subj, lang, offset, amount) {
    if (subj === void 0) { subj = null; }
    if (lang === void 0) { lang = null; }
    if (offset === void 0) { offset = 0; }
    if (amount === void 0) { amount = 10; }
    var sheet = getDictSheet();
    if (subj !== null) {
        subj = subj.map(function (name) {
            return findSubject(name).id;
        });
    }
    if (lang !== null) {
        lang = lang.map(function (name) {
            return findLanguage(name);
        });
    }
    return searchResult(findRow(iterateRange(sheet, 3, 8, 1, 5), [null, subj, lang, searchStr, null]), offset, amount);
}
function searchDicitionaries(searchStr, offset, amount) {
    if (offset === void 0) { offset = 0; }
    if (amount === void 0) { amount = 10; }
    var sheet = getDictSheet();
    return searchResult(findRow(iterateRange(sheet, 3, 1, 1, 2), [searchStr, null]), offset, amount);
}
function searchSubject(searchStr, dict, offset, amount) {
    if (dict === void 0) { dict = null; }
    if (offset === void 0) { offset = 0; }
    if (amount === void 0) { amount = 10; }
    var sheet = getDictSheet();
    if (dict !== null) {
        dict = dict.map(function (name) {
            return findDictionary(name);
        });
    }
    return searchResult(findRow(iterateRange(sheet, 3, 3, 1, 3), [null, dict, searchStr]), offset, amount);
}
function searchLanguage(searchStr, offset, amount) {
    if (offset === void 0) { offset = 0; }
    if (amount === void 0) { amount = 10; }
    var sheet = getDictSheet();
    return searchResult(findRow(iterateRange(sheet, 3, 6, 1, 2), [null, searchStr]), offset, amount);
}
function findDictionary(name) {
    var sheet = getDictSheet();
    var dictCell = findCells(name)(iterateRange(sheet, 3, 1))[0];
    return sheet.getRange(dictCell.getRow(), 2).getValue();
}
function findSubject(name) {
    var sheet = getDictSheet();
    var subjCell = findCells(name)(iterateRange(sheet, 3, 5))[0];
    return {
        dictId: sheet.getRange(subjCell.getRow(), 4).getValue(),
        id: sheet.getRange(subjCell.getRow(), 3).getValue()
    };
}
function findLanguage(name) {
    var sheet = getDictSheet();
    var langCell = findCells(name)(iterateRange(sheet, 3, 7))[0];
    return sheet.getRange(langCell.getRow(), 6).getValue();
}
