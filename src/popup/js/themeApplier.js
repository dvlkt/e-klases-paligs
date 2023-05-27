let isRainbowActivated = false;

export const loadTheme = () => {
	chrome.storage.sync.get([`themeData`, `themeColor`, `font`, `cornerRadius`], (res) => {
		// Apply the theme
		chrome.storage.sync.get([`themeData`], (res) => {
			let root = document.querySelector(`:root`);

			for (let key in res.themeData.colors) {
				if (typeof res.themeData.colors[key] !== `string`) {
					continue;
				}

				root.style.setProperty(`--${key}-color`, res.themeData.colors[key]);
			}

			if (res.themeData.variants.logo === `dark`) {
				for (let element of document.querySelectorAll(`img`)) {
					element.src = element.src.replaceAll(`light`, `dark`);
				}
			} else {
				for (let element of document.querySelectorAll(`img`)) {
					element.src = element.src.replaceAll(`dark`, `light`);
				}
			}
		});

		// Apply the theme color
		if (res.themeColor !== `rainbow`) {
			isRainbowActivated = false;
			document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
		} else {
			isRainbowActivated = true;
		}

		// Apply the theme color to the logo
		for (let element of document.querySelectorAll(`img`)) {
			if (element.src.includes(`title`)) {
				let r = Number(`0x${res.themeColor[1]}${res.themeColor[2]}`);
				let g = Number(`0x${res.themeColor[3]}${res.themeColor[4]}`);
				let b = Number(`0x${res.themeColor[5]}${res.themeColor[6]}`);
				let hue = rgbToHsv(r, g, b)[0] * 360;

				element.style.filter = `hue-rotate(${hue - 215}deg)`;
			}
		}

		// Apply the corner radius
		document.querySelector(`:root`).style.setProperty(`--font`, res.font);

		// Apply the corner radius
		document.querySelector(`:root`).style.setProperty(`--corner-radius`, `${res.cornerRadius}px`);
	});
}
loadTheme();

setInterval(() => {
	if (isRainbowActivated) {
		let rainbowHueValue = Math.floor(Date.now() / 50) % 360;

		document.querySelector(`:root`).style.setProperty(`--theme-color`, `hsl(${rainbowHueValue}, 100%, 50%)`);
		for (let element of document.querySelectorAll(`img`)) {
			if (element.src.includes(`title`)) {
				element.style.filter = `hue-rotate(${rainbowHueValue - 215}deg)`;
			}
		}
	}
}, 20);


/*
	Update the theme whenever it's changed in the popup
*/
chrome.runtime.onMessage.addListener((request) => {
	if (request === `updateTheme`) {
		loadTheme();
	}
});


/*
	RGB to HSV function, taken and modified from https://gist.github.com/mjackson/5311256
*/
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