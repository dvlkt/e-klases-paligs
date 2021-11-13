/*
	Reload all E-klase tabs upon install
*/
chrome.runtime.onInstalled.addListener((details) => {
	chrome.tabs.query({ url: `*://*.e-klase.lv/*` }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.reload(tab.id);
		}
	});
});