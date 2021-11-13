export const openTab = (url, extensionPage = true) => {
	chrome.tabs.create({
		active: true,
		url: extensionPage ? chrome.runtime.getURL(url) : url
	});
}
export const sendMessageToEklaseTabs = (message) => {
	chrome.tabs.query({ url: `*://*.e-klase.lv/*` }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(
				tab.id,
				message
			);
		}
	});
}
export const sendMessageToExtensionTabs = (message) => {
	chrome.tabs.query({ url: `${chrome.runtime.getURL(``)}*` }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(
				tab.id,
				message
			);
		}
	});
}