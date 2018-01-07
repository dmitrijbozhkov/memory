/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

const PAGE_ITEMS = 10;

function getDictionaries() {
    let sheet = getDictSheet();
    let iter = iterateRange(sheet, 3, 1);
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

function searchResult(result: any[], page: any) {
    if (page === null) {
        return result;
    } else {
        return {
            count: result.length,
            result: result.slice((page - 1) * PAGE_ITEMS, PAGE_ITEMS)
        };
    }
}

function searchTerms(searchStr: string, subj: any[] = null, lang: any[] = null, page: number = null) {
    let sheet = getDictSheet();
    if (subj !== null) {
        subj = subj.map((name) => {
            return findSubject(name).id;
        });
    }
    if (lang !== null) {
        lang = lang.map((name) => {
            return findLanguage(name);
        });
    }
    return searchResult(findRow(iterateRange(sheet, 3, 8, 1, 5), [null, subj, lang, searchStr, null]), page);
}

function searchDicitionaries(searchStr: string, page: number = null) {
    let sheet = getDictSheet();
    return searchResult(findRow(iterateRange(sheet, 3, 1, 1, 2), [searchStr, null]), page);
}

function searchSubject(searchStr: string, dict: any[] = null, page: number = null) {
    let sheet = getDictSheet();
    if (dict !== null) {
        dict = dict.map((name) => {
            return findDictionary(name);
        });
    }
    return searchResult(findRow(iterateRange(sheet, 3, 3, 1, 3), [null, dict, searchStr]), page);
}

function searchLanguage(searchStr: string, page: number = null) {
    let sheet = getDictSheet();
    return searchResult(findRow(iterateRange(sheet, 3, 6, 1, 2), [null, searchStr]), page);
}

function findDictionary(name: string) {
    let sheet = getDictSheet();
    let dictCell = findCells(name)(iterateRange(sheet, 3, 1))[0];
    return sheet.getRange(dictCell.getRow(), 2).getValue();
}

function findSubject(name: string) {
    let sheet = getDictSheet();
    let subjCell = findCells(name)(iterateRange(sheet, 3, 5))[0];
    return {
        dictId: sheet.getRange(subjCell.getRow(), 4).getValue(),
        id: sheet.getRange(subjCell.getRow(), 3).getValue()
    };
}

function findLanguage(name: string) {
    let sheet = getDictSheet();
    let langCell = findCells(name)(iterateRange(sheet, 3, 7))[0];
    return sheet.getRange(langCell.getRow(), 6).getValue();
}