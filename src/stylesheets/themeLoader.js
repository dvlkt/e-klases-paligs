let isRainbowActivated = false;
let rainbowHueValue = 0;

const loadTheme = () => {
	chrome.storage.sync.get([`theme`, `themeColor`], (res) => {
		// Apply the theme
		let root = document.querySelector(`:root`);
		for (let key in res.theme) {
			root.style.setProperty(`--${key}`, res.theme[key]);
		}
		
		if (res.themeColor !== `rainbow`) {
			isRainbowActivated = false;
			document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
		} else {
			isRainbowActivated = true;
			rainbowHueValue = 0;
		}
	});
}
const loadCornerRoundness = () => {
	chrome.storage.sync.get([`cornerRoundness`], (res) => {
		document.querySelector(`:root`).style.setProperty(`--corner-roundness`, res.cornerRoundness);
	});
}

// This sets the default theme if it hasn't been set
chrome.storage.sync.get([`theme`, `themeColor`, `cornerRoundness`], (res) => {
	if (res.theme === undefined || res.theme?.name === undefined) {
		fetch(chrome.runtime.getURL(`themes/light.json`))
			.then(response => response.json())
			.then(themeData => {

				chrome.storage.sync.set({ theme: themeData });

			});
	}
	if (res.themeColor === undefined || res.themeColor[0] !== `#`) {
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

setInterval(() => {
	if (isRainbowActivated) {
		document.querySelector(`:root`).style.setProperty(`--theme-color`, `hsl(${rainbowHueValue}, 100%, 50%)`);

		if (rainbowHueValue === 360) {
			rainbowHueValue = 0;
		} else {
			rainbowHueValue++;
		}
	}
}, 20);