/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

const learnManager: IPageEvents = (function() {
    let events = {
        setUp: function() {
            console.log("Set up learn");
        },
        turnDown: function() {
            console.log("Turn down learn");
        }
    };
    return events;
})();