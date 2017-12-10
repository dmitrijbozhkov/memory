/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var Paths;
(function (Paths) {
    Paths[Paths["dict"] = 0] = "dict";
    Paths[Paths["learn"] = 1] = "learn";
    Paths[Paths["stat"] = 2] = "stat";
})(Paths || (Paths = {}));
var dictManager = (function (sidebar, tabs, lookDict) {
    var events = {
        setUp: function () {
            tabs.setUp({
                lookDict: lookDict
            });
            sidebar.setUp([lookDict.changeDict]);
        },
        turnDown: function () {
            sidebar.turnDown();
        }
    };
    return events;
})(Sidebar, Tabs, LookDict);
(function () {
    var currEvents = statManager;
    var content = document.getElementById("pageContent");
    function setContent(template, page) {
        currEvents.turnDown();
        content.innerHTML = template;
        switch (page) {
            case Paths[0]:
                currEvents = dictManager;
                break;
            case Paths[1]:
                currEvents = learnManager;
                break;
            case Paths[2]:
                currEvents = statManager;
                break;
        }
        currEvents.setUp();
    }
    $("#dict-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(function (template) {
            setContent(template, Paths[0]);
        }).navigate(Paths[0]);
        $("#navbar-button").text("Словари");
        hideElem("#navbar-dropdown");
    });
    $("#learn-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(function (template) {
            setContent(template, Paths[1]);
        }).navigate(Paths[1]);
        $("#navbar-button").text("Учить");
        hideElem("#navbar-dropdown");
    });
    $("#stat-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(function (template) {
            setContent(template, Paths[2]);
        }).navigate(Paths[2]);
        $("#navbar-button").text("Статистика");
        hideElem("#navbar-dropdown");
    });
    $("#navbar-button").click(function (event) {
        event.preventDefault();
        hideElem("#navbar-dropdown");
    });
    function hideElem(selector) {
        $(selector).toggleClass("is-active");
    }
    google.script.run.withSuccessHandler(function (template) {
        setContent(template, Paths[2]);
    }).navigate(Paths[2]);
})();
