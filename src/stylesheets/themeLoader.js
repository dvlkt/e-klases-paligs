const loadTheme = () => {
	chrome.storage.sync.get(`theme`, (res) => {
		fetch(chrome.runtime.getURL(`themes/${res.theme}.json`))
			.then(response => response.json())
			.then(themeData => {

				// Apply the theme
				let root = document.querySelector(`:root`);
				for (let key in themeData) {
					root.style.setProperty(`--${key}`, themeData[key]);
				}

			});
	});
}

// This sets the theme to light by default if it hasn't been set
chrome.storage.sync.get(`theme`, (res) => {
	if (Object.keys(res).length === 0) {
		chrome.storage.sync.set({ theme: `light` });
	}
});
loadTheme();

chrome.runtime.onMessage.addListener((request) => {
	if (request === `loadTheme`) {
		loadTheme();
		applyLogos(); // Accessed from branding.js
	}
});