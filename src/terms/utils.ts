/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

type FindCallback = (range: GoogleAppsScript.Spreadsheet.Range) => void;

function iterateCell(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, col: number) {
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
    return (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, col: number) => {
        let iter = iterateCell(sheet, row, col);
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