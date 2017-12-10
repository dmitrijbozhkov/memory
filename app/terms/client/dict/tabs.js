/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
var TabTypes;
(function (TabTypes) {
    TabTypes[TabTypes["lookDict"] = 0] = "lookDict";
    TabTypes[TabTypes["lang"] = 1] = "lang";
    TabTypes[TabTypes["subjects"] = 2] = "subjects";
    TabTypes[TabTypes["editTerms"] = 3] = "editTerms";
    TabTypes[TabTypes["editDict"] = 4] = "editDict";
})(TabTypes || (TabTypes = {}));
var Tabs = (function () {
    var pages;
    var currTab;
    var events = {
        setUp: function (tabPages) {
            pages = tabPages;
            currTab = TabTypes[0];
            hideActiveTab();
            pages.lookDict.setUp();
            $("#lookTab").click(lookCallback);
        },
        turnDown: function () {
            pages[currTab].turnDown();
            $("#lookTab").unbind("click");
        }
    };
    function hideActiveTab() {
        $("#dict-content .content-section:not(.is-hidden)").addClass("is-hidden");
    }
    function nextTab(tabName) {
        pages[currTab].turnDown();
        currTab = tabName;
    }
    function lookCallback(event) {
        hideActiveTab();
        nextTab(TabTypes[0]);
        pages.lookDict.setUp();
    }
    return events;
})();
