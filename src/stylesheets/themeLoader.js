const loadTheme = () => {
	chrome.storage.sync.get([`theme`, `themeColor`], (res) => {
		fetch(chrome.runtime.getURL(`themes/${res.theme}.json`))
			.then(response => response.json())
			.then(themeData => {

				// Apply the theme
				let root = document.querySelector(`:root`);
				for (let key in themeData) {
					root.style.setProperty(`--${key}`, themeData[key]);
				}

			});
		
		document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
	});
}

// This sets the theme to light by default if it hasn't been set
chrome.storage.sync.get(`theme`, (res) => {
	if (Object.keys(res).length === 0) {
		chrome.storage.sync.set({ theme: `light`, themeColor: `#0088e3` });
	}
});
loadTheme();

chrome.runtime.onMessage.addListener((request) => {
	if (request === `loadTheme`) {
		loadTheme();
		applyLogos(); // Accessed from branding.js
	}
});