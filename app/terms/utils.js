/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function iterateRange(sheet, row, col, numRows, numCols) {
    if (numRows === void 0) { numRows = 1; }
    if (numCols === void 0) { numCols = 1; }
    return {
        next: function (rowMove, colMove) {
            row += rowMove;
            col += colMove;
        },
        value: function () {
            return sheet.getRange(row, col, numRows, numCols);
        }
    };
}
function findCells(toFind, isRow, numEmpty) {
    if (isRow === void 0) { isRow = true; }
    if (numEmpty === void 0) { numEmpty = 0; }
    return function (iter, amount) {
        if (amount === void 0) { amount = 1; }
        var emptyCount = 0;
        var cell;
        var found = [];
        var value;
        while (true) {
            cell = iter.value();
            if (isRow) {
                iter.next(1, 0);
            }
            else {
                iter.next(0, 1);
            }
            value = cell.getValue();
            if (!value) {
                emptyCount += 1;
            }
            else {
                emptyCount = 0;
            }
            if (emptyCount > numEmpty) {
                break;
            }
            else {
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
function freeId(iter) {
    var lastId = 0;
    var currValue;
    var cell;
    while (true) {
        cell = iter.value();
        currValue = cell.getValue();
        if (!currValue) {
            return lastId + 1;
        }
        else {
            if (lastId < currValue) {
                lastId = currValue;
            }
        }
        iter.next(1, 0);
    }
}
function untilEmptyRow(iter) {
    var range;
    while (true) {
        range = iter.value();
        if (isRangeEmpty(range)) {
            return range;
        }
        iter.next(1, 0);
    }
}
function emptyRows(range) {
    var tempEmpty = range.getValues().map(function (row) {
        return row.map(function () { return null; });
    });
    range.setValues(tempEmpty);
}
function isRangeEmpty(range) {
    var values = range.getValues();
    for (var i = 0; i < values.length; i += 1) {
        for (var j = 0; j < values[i].length; j += 1) {
            if (values[i][j]) {
                return false;
            }
        }
    }
    return true;
}
function rowsToEmpty(iter, sheet) {
    var first = iter.value();
    var last = untilEmptyRow(iter);
    return sheet.getRange(first.getRow(), first.getColumn(), last.getRow() - first.getRow(), first.getNumColumns());
}
function patchRows(iter, numEmpty) {
    var emptyStart = iter.value();
    var pointer;
    var moveRows;
    var moveTo;
    var temp;
    var countEmpty = 0;
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
        }
        else {
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
function compareCol(col, compareTo) {
    if (compareTo === null) {
        return true;
    }
    if (typeof col === "string") {
        return col.indexOf(compareTo) !== -1;
    }
    else {
        return col === compareTo;
    }
}
function compareRows(row, compareTo) {
    var sameCount = 0;
    for (var i = 0; i < row.length; i += 1) {
        if (compareTo[i] instanceof Array) {
            for (var j = 0; j < compareTo[i].length; j += 1) {
                if (compareCol(row[i], compareTo[i][j])) {
                    sameCount += 1;
                    break;
                }
            }
        }
        else {
            if (compareCol(row[i], compareTo[i])) {
                sameCount += 1;
            }
        }
    }
    if (sameCount === row.length) {
        return true;
    }
}
function findRow(iter, rowToFid) {
    var row;
    var found = [];
    var values;
    while (true) {
        row = iter.value();
        if (isRangeEmpty(row)) {
            return found;
        }
        else {
            values = row.getValues()[0];
            if (compareRows(values, rowToFid)) {
                found.push(values);
            }
        }
        iter.next(1, 0);
    }
}
