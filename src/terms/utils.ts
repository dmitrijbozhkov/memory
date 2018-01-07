/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

interface IRangeIterator {
    next: (rowMove: number, colMove: number) => void;
    value: () => GoogleAppsScript.Spreadsheet.Range;
}

type findCell = any[] | any;

type findRow = findCell[];

function iterateRange(sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, col: number, numRows = 1, numCols = 1): IRangeIterator {
    return {
        next: function(rowMove: number, colMove: number) {
            row += rowMove;
            col += colMove;
        },
        value: function() {
            return sheet.getRange(row, col, numRows, numCols);
        }
    };
}

function findCells(toFind: any, isRow = true, numEmpty = 0) {
    return (iter: IRangeIterator, amount = 1): GoogleAppsScript.Spreadsheet.Range[] => {
        let emptyCount = 0;
        let cell: GoogleAppsScript.Spreadsheet.Range;
        let found = [];
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
                break;
            } else {
                if (amount <= found.length) {
                    break;
                }
                if (value === toFind) {
                    found.push(cell);
                }
            }
        }
        return found;
    };
}

function freeId(iter: IRangeIterator) {
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

function untilEmptyRow(iter: IRangeIterator) {
    let range: GoogleAppsScript.Spreadsheet.Range;
    while (true) {
        range = iter.value();
        if (isRangeEmpty(range)) {
            return range;
        }
        iter.next(1, 0);
    }
}

function emptyRows(range: GoogleAppsScript.Spreadsheet.Range) {
    let tempEmpty = range.getValues().map((row) => {
        return row.map(() => null);
    });
    range.setValues(tempEmpty);
}

function isRangeEmpty(range: GoogleAppsScript.Spreadsheet.Range) {
    let values = range.getValues();
    for (let i = 0; i < values.length; i += 1) {
        for (let j = 0; j < values[i].length; j += 1) {
            if (values[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function rowsToEmpty(iter: IRangeIterator, sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    let first = iter.value();
    let last = untilEmptyRow(iter);
    return sheet.getRange(first.getRow(), first.getColumn(), last.getRow() - first.getRow(), first.getNumColumns());
}

function patchRows(iter: IRangeIterator, numEmpty: number) {
    let emptyStart = iter.value();
    let pointer: GoogleAppsScript.Spreadsheet.Range;
    let moveRows: GoogleAppsScript.Spreadsheet.Range;
    let moveTo: GoogleAppsScript.Spreadsheet.Range;
    let temp: any[][];
    let countEmpty = 0;
    while (true) {
        pointer = iter.value();
        if (isRangeEmpty(pointer)) {
            countEmpty += 1;
            if (countEmpty > numEmpty) {
                return;
            }
            if (countEmpty === 1) {
                emptyStart = pointer;
            }
        } else {
            moveRows = rowsToEmpty(iter, emptyStart.getSheet());
            moveTo = emptyStart.getSheet().getRange(emptyStart.getRow(), emptyStart.getColumn(), moveRows.getNumRows(), emptyStart.getNumColumns());
            temp = moveRows.getValues();
            emptyRows(moveRows);
            moveTo.setValues(temp);
            countEmpty = 1;
            emptyStart = emptyStart.getSheet().getRange(moveTo.getRow() + 1, moveTo.getColumn(), moveRows.getNumRows(), emptyStart.getNumColumns());
        }
        iter.next(1, 0);
    }
}

function compareCol(col: any, compareTo: any): boolean {
    if (compareTo === null) {
        return true;
    }
    if (typeof col === "string") {
        return (col as string).indexOf(compareTo) !== -1;
    } else {
        return col === compareTo;
    }
}

function compareRows(row: any[], compareTo: findRow): boolean {
    let sameCount = 0;
    for (let i = 0; i < row.length; i += 1) {
        if (compareTo[i] instanceof Array) {
            for (let j = 0; j < compareTo[i].length; j += 1) {
                if (compareCol(row[i], compareTo[i][j])) {
                    sameCount += 1;
                    break;
                }
            }
        } else {
            if (compareCol(row[i], compareTo[i])) {
                sameCount += 1;
            }
        }
    }
    if (sameCount === row.length) {
        return true;
    }
}

function findRow(iter: IRangeIterator, rowToFid: findRow) {
    let row: GoogleAppsScript.Spreadsheet.Range;
    let found: any[] = [];
    let values: any[];
    while (true) {
        row = iter.value();
        if (isRangeEmpty(row)) {
            return found;
        } else {
            values = row.getValues()[0];
            if (compareRows(values, rowToFid)) {
                found.push(values);
            }
        }
        iter.next(1, 0);
    }
}