import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
    if (request.popupMounted) {
        console.log("Popup mounted!");
    }
});