/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var Paths;
(function (Paths) {
    Paths[Paths["dict"] = 0] = "dict";
    Paths[Paths["learn"] = 1] = "learn";
    Paths[Paths["stat"] = 2] = "stat";
})(Paths || (Paths = {}));
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
    });
    $("#learn-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(function (template) {
            setContent(template, Paths[1]);
        }).navigate(Paths[1]);
    });
    $("#stat-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(function (template) {
            setContent(template, Paths[2]);
        }).navigate(Paths[2]);
    });
    google.script.run.withSuccessHandler(function (template) {
        setContent(template, Paths[2]);
    }).navigate(Paths[2]);
})();
