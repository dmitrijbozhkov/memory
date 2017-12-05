/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
declare var google: any;

enum Paths {
    "lang",
    "dict",
    "learn",
    "stat"
}

(function() {
    function setContent(template: string) {
        document.getElementById("pageContent").innerHTML = template;
    }
    $("#lang-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[0]);
    });
    $("#dict-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[1]);
    });
    $("#learn-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[2]);
    });
    $("#stat-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler(setContent).navigate(Paths[3]);
    });
    google.script.run.withSuccessHandler(setContent).navigate(Paths[3]);
})();