/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
var HEADERS = [["Мыло", "Отослано", "Тема", "Шаблон", "Файлы"]];
var BORDER_COLOR = "black";
var BORDER_STYLE_HEADER = SpreadsheetApp.BorderStyle.SOLID_THICK;
var BORDER_STYLE_COL = SpreadsheetApp.BorderStyle.SOLID_MEDIUM;
var HEADER_FONT_SIZE = 16;
var COL_FONT_SIZE = 14;
var BACKGROUNDS = [["#e6b8af", "#fff2cc", "#d9d2e9", "#d9ead3", "#d0e0e3"]];
function getName() {
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt("Введите название листа", ui.ButtonSet.OK_CANCEL);
    if (response.getSelectedButton() === ui.Button.OK) {
        return response.getResponseText();
    }
    else {
        return false;
    }
}
function workingRanges(sheet) {
    return {
        "mailTable": sheet.getRange("A2:A"),
        "sendTable": sheet.getRange("B2:B"),
        "subjectTable": sheet.getRange("C2:C2"),
        "templateTable": sheet.getRange("D2:D2"),
        "fileTable": sheet.getRange("E2:E")
    };
}
function columnValidators(builder) {
    return {
        "mailValidator": builder.requireTextIsEmail().build()
    };
}
function populateSheet(sheet) {
    var ranges = workingRanges(sheet);
    var headerRow = sheet.getRange(1, 1, 1, 5);
    var validators = columnValidators(SpreadsheetApp.newDataValidation());
    headerRow.setValues(HEADERS);
    headerRow.setBorder(true, true, true, true, true, null, BORDER_COLOR, BORDER_STYLE_HEADER);
    headerRow.setFontSize(HEADER_FONT_SIZE);
    headerRow.setBackgrounds(BACKGROUNDS);
    ranges["mailTable"].setFontSize(COL_FONT_SIZE);
    ranges["sendTable"].setFontSize(COL_FONT_SIZE);
    ranges["subjectTable"].setFontSize(COL_FONT_SIZE);
    var bNum = 0;
    Object.keys(ranges).forEach(function (key) {
        ranges[key].setBackground(BACKGROUNDS[0][bNum]);
        bNum += 1;
    });
    ranges.mailTable.setDataValidation(validators.mailValidator);
    sheet.setFrozenRows(1);
}
function makeSheet(name) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!sheet.getSheetByName(name)) {
        sheet.insertSheet(name);
        var table = sheet.getSheetByName(name);
        populateSheet(table);
    }
    else {
        SpreadsheetApp.getUi().alert("Лист с таким именем уже существует");
    }
}
