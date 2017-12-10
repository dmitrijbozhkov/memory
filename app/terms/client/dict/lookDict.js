/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var LookDict = (function () {
    var currDict;
    var chosenThemes = [];
    var chosenSubjects = [];
    var events = {
        setUp: function (tabPages) {
            $("#look-content").removeClass("is-hidden");
            console.log("Dict lookup setup");
        },
        turnDown: function () {
            console.log("Dict lookup turnDown");
        },
        changeDict: function (dict) {
            console.log("dictionary is" + dict);
            currDict = dict;
        }
    };
    function clean() {
        $("#choosen-themes")[0].innerHTML = "";
    }
    return events;
})();
