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
	chrome.storage.sync.get([`themeData`, `themeName`, `themeColor`, `cornerRadius`, `shouldShowSetupModal`, `isHolidayDesignOn`, ``], (res) => {
		// Design settings
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
		if (res.isHolidayDesignOn === undefined || res.isHolidayDesignOn === ``) {
			chrome.storage.sync.set({ isHolidayDesignOn: true });
		}

		// Statistics settings
		if (res.isStatisticsPanelOn === undefined || res.isStatisticsPanelOn === ``) {
			chrome.storage.sync.set({ isStatisticsPanelOn: true });
		}
		if (res.treatNVAsZero === undefined || res.treatNVAsZero === ``) {
			chrome.storage.sync.set({ treatNVAsZero: true });
		}
		if (res.treatNAsZero === undefined || res.treatNAsZero === ``) {
			chrome.storage.sync.set({ treatNAsZero: true });
		}
		if (res.treatPercentagesAsGrades === undefined || res.treatPercentagesAsGrades === ``) {
			chrome.storage.sync.set({ treatPercentagesAsGrades: true });
		}
		
		if (details.reason === `install`) {
			if (res.shouldShowSetupModal === undefined || res.shouldShowSetupModal === ``) {
				chrome.storage.sync.set({ shouldShowSetupModal: true });
			}
		}
	});
});