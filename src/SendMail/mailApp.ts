/// <reference path="../../node_modules/@types/google-apps-script/index.d.ts" />

function onOpen() {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu("Рассылка")
    .addItem("Создать рассылочный лист", "createMailSheet")
    .addItem("Добавить ссылку на текст письма", "addTemplateText")
    .addItem("Добавить файл", "addFile")
    .addItem("Начать рассылку", "send")
    .addToUi();
}

function createMailSheet() {
    let name = getName();
    if (name) {
        makeSheet(name as string);
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