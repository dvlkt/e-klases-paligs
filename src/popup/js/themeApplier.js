let isRainbowActivated = false;

export const loadTheme = () => {
	chrome.storage.sync.get([`themeData`, `themeColor`, `cornerRadius`], (res) => {
		// Apply the theme
		chrome.storage.sync.get([`themeData`], (res) => {
			let root = document.querySelector(`:root`);

			for (let key in res.themeData.colors) {
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

		// Apply the corner radius
		document.querySelector(`:root`).style.setProperty(`--corner-radius`, `${res.cornerRadius}px`);
	});
}
loadTheme();

setInterval(() => {
	if (isRainbowActivated) {
		let rainbowHueValue = Math.floor(Date.now() / 50) % 360;
		document.querySelector(`:root`).style.setProperty(`--theme-color`, `hsl(${rainbowHueValue}, 100%, 50%)`);
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