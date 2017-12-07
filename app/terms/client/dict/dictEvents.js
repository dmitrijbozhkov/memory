/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var dictManager = (function () {
    var events = {
        setUp: function () {
            $("#pepe").click(function (event) {
                console.log("Stuff happens");
            });
        },
        turnDown: function () {
            $("#pepe").unbind("click");
        }
    };
    return events;
})();
