export const openTab = (url) => {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL(url)
	});
}
export const sendMessageToTabs = (message) => {
	chrome.tabs.query({ url: "*://*.e-klase.lv/*" }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(
				tab.id,
				message
			);
		}
	});
}