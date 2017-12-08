/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function iterateCell(sheet, row, col) {
    return {
        next: function (rowMove, colMove) {
            row += rowMove;
            col += colMove;
        },
        value: function () {
            return sheet.getRange(row, col);
        }
    };
}
function findCell(toFind, isRow, numEmpty) {
    if (isRow === void 0) { isRow = true; }
    if (numEmpty === void 0) { numEmpty = 0; }
    return function (sheet, row, col) {
        var iter = iterateCell(sheet, row, col);
        var emptyCount = 0;
        var cell;
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
                return null;
            }
            else {
                if (value === toFind) {
                    return cell;
                }
            }
        }
    };
}
