chrome.runtime.onInstalled.addListener((details) => {
	/*
		Reload all E-klase tabs upon install
	*/
	/* chrome.tabs.query({ url: `*://*.e-klase.lv/*` }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.reload(tab.id);
		}
	}); */

	/*
		Show the greeting modal upon install
	*/
	chrome.storage.sync.set({ shouldShowSetupModal: true });

});