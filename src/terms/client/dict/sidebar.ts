/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

type MainPanelSub = (dict: string) => void;

const Sidebar: IPageEvents = (function() {
    let currSubs: MainPanelSub[];
    let events = {
        setUp: function(sub: MainPanelSub[]) {
            currSubs = sub;
            updateDicts();
        },
        turnDown: function() {
            $(".dict-item").unbind("click");
        }
    };
    function updateDicts() {
        google.script.run.withSuccessHandler(pushDicts).getDictionaries();
    }
    function pushDicts(dicts: string[]) {
        let dictNode = $("#dictionaries")[0];
        if (dicts.length > 0) {
            dictNode.innerHTML += `<a class="panel-block is-active dict-item">${dicts[0]}</a>`;
            for (let i = 1; i < dicts.length; i += 1) {
                dictNode.innerHTML += `<a class="panel-block dict-item">${dicts[i]}</a>`;
            }
            notifySubs(dicts[0]);
            $(".dict-item").click(changeDict);
        }
    }
    function notifySubs(dict: string) {
        currSubs.forEach((sub) => {
            sub(dict);
        });
    }
    function changeDict(event: CallbackEvent) {
        event.preventDefault();
        $("#dictionaries .is-active").toggleClass("is-active");
        event.target.classList.toggle("is-active");
        notifySubs(event.target.innerText);
    }
    return events;
})();