/*
	Theme loading
*/
const loadTheme = () => {
	chrome.storage.sync.get([`themeData`], (res) => {
		let root = document.querySelector(`:root`);

		for (let key in res.themeData.colors) {
			root.style.setProperty(`--${key}-color`, res.themeData.colors[key]);
		}
	});
}


/*
	Theme color loading
*/
let isRainbowActivated = false;

const loadThemeColor = () => {
	chrome.storage.sync.get([`themeColor`], (res) => {
		if (res.themeColor !== `rainbow`) {
			isRainbowActivated = false;
			document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
			setLogoHueToThemeColor(res.themeColor);
			loadThemeAccentColor(res.themeColor);
		} else {
			isRainbowActivated = true;
		}
	});
}

const loadThemeAccentColor = (themeColor) => {
	let rValue = Number(`0x${themeColor[1]}${themeColor[2]}`);
	let gValue = Number(`0x${themeColor[3]}${themeColor[4]}`);
	let bValue = Number(`0x${themeColor[5]}${themeColor[6]}`);

	let brightness = rgbToHsv(rValue, gValue, bValue)[2] * 255;
	let saturation = rgbToHsv(rValue, gValue, bValue)[1] * 255;

	if (brightness > 128 && saturation < 50) {
		document.querySelector(`:root`).style.setProperty(`--theme-accent-color`, `#000000`);
	} else {
		document.querySelector(`:root`).style.setProperty(`--theme-accent-color`, `#ffffff`);
	}
}

setInterval(() => {
	if (isRainbowActivated) {
		// Get the rainbow color based on the system time to make it synced between different pages and the popup
		let rainbowHueValue = Math.floor(Date.now() / 50) % 360;

		document.querySelector(`:root`).style.setProperty(`--theme-color`, `hsl(${rainbowHueValue}, 100%, 50%)`);
		setLogoHueToThemeColor(rainbowHueValue);
		loadThemeAccentColor(rainbowHueValue);
	}
}, 20);


/*
	Corner radius loading
*/
const loadCornerRadius = () => {
	chrome.storage.sync.get([`cornerRadius`], (res) => {
		document.querySelector(`:root`).style.setProperty(`--corner-radius`, `${res.cornerRadius}px`);
	});
}


/*
	Load logos
*/
const loadLogos = () => {
	chrome.storage.sync.get([`themeData`, `themeColor`], async (res) => {
		let logoTheme = res.themeData.variants.logo;

		let isAHolidayTodayValue = await isAHolidayToday();
		if (isAHolidayTodayValue) {
			logoTheme = `dark`;
		}

		fetch(chrome.runtime.getURL(`res/title-${logoTheme}.png`))
			.then(response => response.blob())
			.then(blob => {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64data = reader.result;

					for (let logo of document.querySelectorAll(`.logo`)) {
						logo.style.backgroundImage = `url("${base64data}")`;
					}
					for (let logo of document.querySelectorAll(`img[src="/Presentation/_IDACC/Login/Views/css/img/logo.png"]`)) {
						logo.src = base64data;
					}
					if (document.querySelector(`.header-logo`) !== null) {
						document.querySelector(`.header-logo`).src = base64data;
					}

					setLogoHueToThemeColor(res.themeColor);
				}
			}
		);
	});
}


/*
	Load favicon
*/
const loadFavicon = () => {
	chrome.storage.sync.get([`themeData`], async (res) => {
		let isBW = document.querySelector(`.ekl__header`) !== null; // As far as I can tell, this element only exists in the homepage
		// This is to make the icon black and white when logged out

		let iconTheme = res.themeData.variants.favicon;

		fetch(chrome.runtime.getURL(`res/${iconTheme}/icon-256${isBW ? `-bw` : ``}.png`))
			.then(response => response.blob())
			.then(blob => {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64data = reader.result;

					// Removes any existing icons
					let linkElements = document.querySelectorAll(`link`);
					for (let element of linkElements) {
						if (element.rel.toLowerCase() === `icon` || element.rel.toLowerCase() === `shortcut icon`) {
							element.setAttribute(`rel`, `none`);
						}
					}
					// Applies the actual icon
					let element = document.createElement(`link`);
					element.setAttribute(`rel`, `shortcut icon`);
					element.setAttribute(`type`, `image/x-icon`);
					element.setAttribute(`href`, base64data);

					document.head.appendChild(element);
				}
			}
		);
	});
}


/*
	Change the hue of the logo
*/
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


/*
	Load everything
*/
loadTheme();
loadThemeColor();
loadCornerRadius();

window.addEventListener(`pageLoading`, () => {
	loadFavicon();
	loadLogos();
});


/*
	Update the theme whenever it's changed in the popup
*/
chrome.runtime.onMessage.addListener((request) => {
	if (request === `updateTheme`) {
		loadTheme();
		loadLogos();
		loadFavicon();
	} else if (request === `updateThemeColor`) {
		loadThemeColor();
	} else if (request === `updateCornerRadius`) {
		loadCornerRadius();
	}
});