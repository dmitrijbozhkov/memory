/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

const dictManager: IPageEvents = (function() {
    let events = {
        setUp: function() {
            $("#pepe").click((event) => {
                console.log("Stuff happens");
            });
        },
        turnDown: function() {
            $("#pepe").unbind("click");
        }
    };
    return events;
})();