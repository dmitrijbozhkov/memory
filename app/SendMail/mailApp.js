/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Рассылка")
        .addItem("Создать рассылочный лист", "createMailSheet")
        .addItem("Добавить ссылку на текст письма", "addTemplateText")
        .addItem("Добавить файл", "addFile")
        .addItem("Начать рассылку", "send")
        .addToUi();
}
function createMailSheet() {
    var name = getName();
    if (name) {
        makeSheet(name);
    }
}
function addTemplateText() {
    pickTemplate();
}
function addFile() {
    pickFiles();
}
function send() {
    sendMails();
}
