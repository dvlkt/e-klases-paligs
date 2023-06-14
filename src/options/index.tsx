import * as React from "react";
import * as ReactDOM from "react-dom";
import browser from "webextension-polyfill";
import { Options } from "./Options";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
    ReactDOM.render(<Options />, document.getElementById("options"));
});