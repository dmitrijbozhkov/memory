/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

let LookDict: IPageEvents = (function() {
    let currDict: string;
    let chosenThemes: string[] = [];
    let chosenSubjects: string[] = [];
    let events = {
        setUp: function(tabPages: ITabPages) {
            $("#look-content").removeClass("is-hidden");
            console.log("Dict lookup setup");
        },
        turnDown: function() {
            console.log("Dict lookup turnDown");
        },
        changeDict: function(dict: string) {
            console.log("dictionary is" + dict);
            currDict = dict;
        }
    };
    function clean() {
        $("#choosen-themes")[0].innerHTML = "";

    }
    return events;
})();