const loadTheme = () => {
	chrome.storage.sync.get([`theme`, `themeColor`], (res) => {
		// Apply the theme
		let root = document.querySelector(`:root`);
		for (let key in res.theme) {
			root.style.setProperty(`--${key}`, res.theme[key]);
		}
		
		document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
	});
}
const loadCornerRoundness = () => {
	chrome.storage.sync.get([`cornerRoundness`], (res) => {
		document.querySelector(`:root`).style.setProperty(`--corner-roundness`, res.cornerRoundness);
	});
}

// This sets the default theme if it hasn't been set
chrome.storage.sync.get([`theme`, `themeColor`, `cornerRoundness`], (res) => {
	if (res.theme === undefined) {
		fetch(chrome.runtime.getURL(`themes/light.json`))
			.then(response => response.json())
			.then(themeData => {

				chrome.storage.sync.set({ theme: themeData });

			});
	}
	if (res.themeColor === undefined) {
		chrome.storage.sync.set({ themeColor: `#0088e3`});
	}
	if (res.cornerRoundness === undefined) {
		chrome.storage.sync.set({ cornerRoundness: `10px` });
	}
});
loadTheme();
loadCornerRoundness();

chrome.runtime.onMessage.addListener((request) => {
	if (request === `loadTheme`) {
		loadTheme();
		applyLogos(); // Accessed from branding.js
	} else if (request === `loadCornerRoundness`) {
		loadCornerRoundness();
	}
});