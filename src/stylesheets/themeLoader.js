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
			setLogoHueToThemeColor(res.themeColor);
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
		setLogoHueToThemeColor(rainbowHueValue);

		if (rainbowHueValue === 360) {
			rainbowHueValue = 0;
		} else {
			rainbowHueValue++;
		}
	}
}, 20);

const setLogoHueToThemeColor = (hueValue) => {
	let hue = 0;

	if (typeof hueValue === `string`) {
		let rValue = Number(`0x${hueValue[1]}${hueValue[2]}`);
		let gValue = Number(`0x${hueValue[3]}${hueValue[4]}`);
		let bValue = Number(`0x${hueValue[5]}${hueValue[6]}`);
		hue = rgbToHsv(rValue, gValue, bValue)[0] * 360;
	} else {
		hue = hueValue;
	}

	const hueOffset = 215;
	for (let logo of document.querySelectorAll(`.logo`)) {
		logo.style.filter = `hue-rotate(${hue - hueOffset}deg)`;
	}
	for (let logo of document.querySelectorAll(`img[src="/Presentation/_IDACC/Login/Views/css/img/logo.png"]`)) {
		logo.style.filter = `hue-rotate(${hue - hueOffset}deg)`;
	}
	if (document.querySelector(`.header-logo`) !== null) {
		document.querySelector(`.header-logo`).style.filter = `hue-rotate(${hue - hueOffset}deg)`;
	}
}

// Following function taken and modified from https://gist.github.com/mjackson/5311256
const rgbToHsv = (r, g, b) => {
	r /= 255, g /= 255, b /= 255;

	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, v = max;

	var d = max - min;
	s = max == 0 ? 0 : d / max;

	if (max == min) {
		h = 0; // achromatic
	} else {
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return [h, s, v];
}