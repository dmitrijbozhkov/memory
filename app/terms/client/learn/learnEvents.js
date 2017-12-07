/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var learnManager = (function () {
    var events = {
        setUp: function () {
            console.log("Set up learn");
        },
        turnDown: function () {
            console.log("Turn down learn");
        }
    };
    return events;
})();
