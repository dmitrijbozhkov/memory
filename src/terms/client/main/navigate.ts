/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
declare var google: any;

interface IPageEvents {
    setUp: () => void;
    turnDown: () => void;
}

enum Paths {
    "dict",
    "learn",
    "stat"
}

(function() {
    let currEvents: IPageEvents = statManager;
    let content = document.getElementById("pageContent");
    function setContent(template: string, page: string) {
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
    $("#dict-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler((template) => {
            setContent(template, Paths[0]);
        }).navigate(Paths[0]);
    });
    $("#learn-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler((template) => {
            setContent(template, Paths[1]);
        }).navigate(Paths[1]);
    });
    $("#stat-nav").click((event) => {
        event.preventDefault();
        google.script.run.withSuccessHandler((template) => {
            setContent(template, Paths[2]);
        }).navigate(Paths[2]);
    });
    google.script.run.withSuccessHandler((template) => {
        setContent(template, Paths[2]);
    }).navigate(Paths[2]);
})();