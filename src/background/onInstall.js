chrome.runtime.onInstalled.addListener((details) => {
	/*
		Reload all E-klase tabs upon install
	*/
	chrome.storage.sync.get([`isDebugModeOn`], (res) => {
		if (res.isDebugModeOn !== true) {
			chrome.tabs.query({ url: `*://*.e-klase.lv/*` }, (tabs) => {
				for (let tab of tabs) {
					chrome.tabs.reload(tab.id);
				}
			});
		}
	});

	/*
		Set the default settings
	*/
	chrome.storage.sync.get([`theme`, `cornerRoundness`, `themeData`, `themeName`, `themeColor`, `cornerRadius`, `shouldShowSetupModal`, `backgroundOpacity`, `isBackgroundBlurOn`, `isStatisticsPanelOn`, `treatNVAsZero`, `treatNAsZero`, `treatPercentagesAsGrades`, `isHolidayDesignOn`, `isDebugModeOn`], (res) => {
		// Design settings
		if (res.themeData === undefined || res.themeData === ``) {
			if (res.theme !== undefined && res.theme !== ``) {
				// Import the theme settings from last version if they are present
				fetch(chrome.runtime.getURL(`themes/${res.theme.name}.json`))
					.then(response => response.json())
					.then(themeData => {

						chrome.storage.sync.set({ themeData });

					}
				);
			} else {
				fetch(chrome.runtime.getURL(`themes/light.json`))
					.then(response => response.json())
					.then(themeData => {

						chrome.storage.sync.set({ themeData });

					}
				);
			}
		}
		if (res.themeName === undefined || res.themeName === ``) {
			if (res.theme !== undefined && res.theme !== ``) {
				// Import the theme settings from last version if they are present
				chrome.storage.sync.set({ themeName: res.theme.name });
			} else {
				chrome.storage.sync.set({ themeName: `light` });
			}
		}
		if (res.themeColor === undefined || res.themeColor === ``) {
			chrome.storage.sync.set({ themeColor: `#0088e3` });
		}
		if (res.cornerRadius === undefined || res.cornerRadius === ``) {
			if (res.cornerRoundness !== undefined && res.cornerRoundness !== ``) {
				// Import the corner radius settings from last version if they are present
				chrome.storage.sync.set({ cornerRadius: parseInt(res.cornerRoundness.split(`px`)[0]) });
			} else {
				chrome.storage.sync.set({ cornerRadius: 10 });
			}
		}

		// Background translucency
		if (res.backgroundOpacity === undefined || res.backgroundOpacity === ``) {
			chrome.storage.sync.set({ backgroundOpacity: 100 });
		}
		if (res.isBackgroundBlurOn === undefined || res.isBackgroundBlurOn === ``) {
			chrome.storage.sync.set({ isBackgroundBlurOn: true });
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

		// Technical settings
		if (res.isHolidayDesignOn === undefined || res.isHolidayDesignOn === ``) {
			chrome.storage.sync.set({ isHolidayDesignOn: true });
		}
		if (res.isDebugModeOn === undefined || res.isDebugModeOn === ``) {
			chrome.storage.sync.set({ isDebugModeOn: false });
		}
		if (details.reason === `install`) {
			if (res.shouldShowSetupModal === undefined || res.shouldShowSetupModal === ``) {
				chrome.storage.sync.set({ shouldShowSetupModal: true });
			}
		}
	});
});