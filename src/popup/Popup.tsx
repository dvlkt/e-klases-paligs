import React from "react";
import browser from "webextension-polyfill";

export function Popup() {
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    return (
        <div>
            <h1>Popup</h1>
        </div>
    );
}