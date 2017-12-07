/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var statManager = (function () {
    var events = {
        setUp: function () {
            console.log("Set up stat");
        },
        turnDown: function () {
            console.log("Turn down stat");
        }
    };
    return events;
})();
