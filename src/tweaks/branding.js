const applyLogos = () => {
	chrome.storage.sync.get(`theme`, (res) => {
		let logoTheme = res.theme.name === `dark` ? `dark` : `light`;
		if (isAHolidayToday()) {
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
				}
			}
		);
	});
}

const applyFavicons = () => {
	chrome.storage.sync.get(`theme`, (res) => {
		let isBW = document.querySelector(`.ekl__header`) !== null; // As far as I can tell, this element only exists in the homepage
		// This is to make the icon black and white when logged out

		// Fetches the favicon
		fetch(chrome.runtime.getURL(`res/${res.theme.name === `dark` ? `dark` : `light`}/icon-256${isBW ? `-bw` : ``}.png`))
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


window.addEventListener(`pageLoading`, () => {
	/*
		Apply the new logo
	*/
	applyLogos();
});

window.addEventListener(`pageLoaded`, () => {
	/*
		Apply the favicon
	*/
	applyFavicons();

	/*
		Edit the bottom copyright text
	*/
	if (document.querySelector(`.copyright`) !== null) {
		if (document.querySelector(`.ekl__header`) !== null) { // If on the homepage
			document.querySelector(`.copyright`).innerHTML = `&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}`;
		} else {
			document.querySelector(`.copyright`).innerHTML =
				`&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}
				<br />
				Aktivizēts <i>E-klases Palīgs</i>`;
		}
	}
});

chrome.runtime.onMessage.addListener((request) => {
	if (request === `loadTheme`) {
		applyLogos();
		applyFavicons();
	}
});