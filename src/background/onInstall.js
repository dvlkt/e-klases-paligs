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
		Set the default settings
	*/
	chrome.storage.sync.get([`themeData`, `themeName`, `themeColor`, `cornerRadius`, `shouldShowSetupModal`], (res) => {
		if (res.themeData === undefined || res.themeData === ``) {
			fetch(chrome.runtime.getURL(`themes/light.json`))
				.then(response => response.json())
				.then(themeData => {

					chrome.storage.sync.set({ themeData });

				});
		}
		if (res.themeName === undefined || res.themeName === ``) {
			chrome.storage.sync.set({ themeName: `light` });
		}
		if (res.cornerRadius === undefined || res.cornerRadius === ``) {
			chrome.storage.sync.set({ cornerRadius: 10 });
		}
		if (details.reason === `install`) {
			if (res.shouldShowSetupModal === undefined || res.shouldShowSetupModal === ``) {
				chrome.storage.sync.set({ shouldShowSetupModal: true });
			}
		}
	});
});