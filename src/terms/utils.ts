/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

interface ICellIterator {
    next: (rowMove: number, colMove: number) => void;
    value: () => GoogleAppsScript.Spreadsheet.Range;
}

type EmptyRowCallback = (cell: GoogleAppsScript.Spreadsheet.Range) => void;

function iterateCell(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, col: number): ICellIterator {
    return {
        next: function(rowMove: number, colMove: number) {
            row += rowMove;
            col += colMove;
        },
        value: function() {
            return sheet.getRange(row, col);
        }
    };
}

function findCell(toFind: any, isRow = true, numEmpty = 0) {
    return (iter: ICellIterator) => {
        let emptyCount = 0;
        let cell: GoogleAppsScript.Spreadsheet.Range;
        let value;
        while (true) {
            cell = iter.value();
            if (isRow) {
                iter.next(1, 0);
            } else {
                iter.next(0, 1);
            }
            value = cell.getValue();
            if (!value) {
                emptyCount += 1;
            } else {
                emptyCount = 0;
            }
            if (emptyCount > numEmpty) {
                return null;
            } else {
                if (value === toFind) {
                    return cell;
                }
            }
        }
    };
}

function freeId(iter: ICellIterator) {
    let lastId = 0;
    let currValue;
    let cell;
    while (true) {
        cell = iter.value();
        currValue = cell.getValue();
        if (!currValue) {
            return lastId + 1;
        } else {
            if (lastId < currValue) {
                lastId = currValue;
            }
        }
        iter.next(1, 0);
    }
}

function untilEmptyRow(iter: ICellIterator, callback: EmptyRowCallback) {
    let cell;
    while (true) {
        cell = iter.value();
        if (!cell.getValue()) {
            callback(cell);
            return;
        }
        iter.next(1, 0);
    }
}