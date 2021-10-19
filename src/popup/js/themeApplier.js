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

		document.querySelector(`:root`).style.setProperty(`--theme-color`, res.themeColor);
		
		document.querySelector(`:root`).style.setProperty(`--corner-roundness`, res.cornerRoundness);
	});
}
loadTheme();