/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />

interface ITabPages {
    lookDict: IPageEvents;
}

enum TabTypes {
    "lookDict",
    "lang",
    "subjects",
    "editTerms",
    "editDict"
}

const Tabs = (function() {
    let pages: ITabPages;
    let currTab: string;
    let events = {
        setUp: function(tabPages: ITabPages) {
            pages = tabPages;
            currTab = TabTypes[0];
            hideActiveTab();
            pages.lookDict.setUp();
            $("#lookTab").click(lookCallback);
        },
        turnDown: function() {
            pages[currTab].turnDown();
            $("#lookTab").unbind("click");
        }
    };
    function hideActiveTab() {
        $("#dict-content .content-section:not(.is-hidden)").addClass("is-hidden");
    }
    function nextTab(tabName: string) {
        pages[currTab].turnDown();
        currTab = tabName;
    }
    function lookCallback(event: CallbackEvent) {
        hideActiveTab();
        nextTab(TabTypes[0]);
        pages.lookDict.setUp();
    }
    return events;
})();