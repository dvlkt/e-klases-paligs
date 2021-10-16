const themeColors = {
	red: `#ee3333`,
	orange: `#fa5e21`,
	yellow: `#f8b525`,
	green: `#139e4a`,
	lblue: `#0088e3`,
	blue: `#1c1fd1`,
	violet: `#8c29dd`
}

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
		
		document.querySelector(`:root`).style.setProperty(`--theme-color`, themeColors[res.themeColor]);
	});
}

// This sets the theme to light by default if it hasn't been set
chrome.storage.sync.get(`theme`, (res) => {
	if (Object.keys(res).length === 0) {
		chrome.storage.sync.set({ theme: `light`, themeColor: `lblue` });
	}
});
loadTheme();

chrome.runtime.onMessage.addListener((request) => {
	if (request === `loadTheme`) {
		loadTheme();
		applyLogos(); // Accessed from branding.js
	}
});