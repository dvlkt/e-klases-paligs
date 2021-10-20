let isRainbowActivated = false;
let rainbowHueValue = 0;

export const loadTheme = () => {
	chrome.storage.sync.get([`theme`, `themeColor`, `cornerRoundness`], (res) => {
		if (res.theme.name === `dark`) {
			document.body.className = `dark-theme`;

			for (let element of document.querySelectorAll(`img`)) {
				element.src = element.src.replaceAll(`light`, `dark`);
			}
		} else {
			document.body.className = `light-theme`;

			for (let element of document.querySelectorAll(`img`)) {
				element.src = element.src.replaceAll(`dark`, `light`);
			}
		}

		if (res.themeColor !== `rainbow`) {
			isRainbowActivated = false;
			document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
		} else {
			isRainbowActivated = true;
			rainbowHueValue = 0;
		}


		document.querySelector(`:root`).style.setProperty(`--corner-roundness`, res.cornerRoundness);
	});
}
loadTheme();

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