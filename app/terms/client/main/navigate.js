/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var Paths;
(function (Paths) {
    Paths[Paths["lang"] = 0] = "lang";
    Paths[Paths["dict"] = 1] = "dict";
    Paths[Paths["learn"] = 2] = "learn";
    Paths[Paths["stat"] = 3] = "stat";
})(Paths || (Paths = {}));
(function () {
    function setContent(template) {
        document.getElementById("pageContent").innerHTML = template;
    }
    $("#lang-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[0]);
    });
    $("#dict-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[1]);
    });
    $("#learn-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[2]);
    });
    $("#stat-nav").click(function (event) {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[3]);
    });
    google.script.run.withSuccessHandler(setContent).navigate(Paths[3]);
})();
