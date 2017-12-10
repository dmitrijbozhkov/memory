/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var Sidebar = (function () {
    var currSubs;
    var events = {
        setUp: function (sub) {
            currSubs = sub;
            updateDicts();
        },
        turnDown: function () {
            $(".dict-item").unbind("click");
        }
    };
    function updateDicts() {
        google.script.run.withSuccessHandler(pushDicts).getDictionaries();
    }
    function pushDicts(dicts) {
        var dictNode = $("#dictionaries")[0];
        if (dicts.length > 0) {
            dictNode.innerHTML += "<a class=\"panel-block is-active dict-item\">" + dicts[0] + "</a>";
            for (var i = 1; i < dicts.length; i += 1) {
                dictNode.innerHTML += "<a class=\"panel-block dict-item\">" + dicts[i] + "</a>";
            }
            notifySubs(dicts[0]);
            $(".dict-item").click(changeDict);
        }
    }
    function notifySubs(dict) {
        currSubs.forEach(function (sub) {
            sub(dict);
        });
    }
    function changeDict(event) {
        event.preventDefault();
        $("#dictionaries .is-active").toggleClass("is-active");
        event.target.classList.toggle("is-active");
        notifySubs(event.target.innerText);
    }
    return events;
})();
