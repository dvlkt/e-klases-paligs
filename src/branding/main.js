// Change favicon
try {
	chrome.storage.sync.get(`theme`, (res) => {
		let isBW = document.querySelector(`.ekl__header`) !== null; // As far as I can tell, this element only exists in the homepage
		// This is to make the icon black and white when logged out

		// Find out what the favicon should be
		let faviconData;
		switch (res.theme) {
			case `dark`:
				faviconData = isBW ? bwDarkFaviconData : darkFaviconData;
				break;
			default:
				faviconData = isBW ? bwLightFaviconData : lightFaviconData;
				break;
		}
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
		element.setAttribute(`href`, faviconData);

		document.head.appendChild(element);
		
		// Change all of the original logos to the new ones
		for (let logo of document.querySelectorAll(`.logo`)) {
			logo.style.backgroundImage = `url("${res.theme === `dark` ? darkLogoData : lightLogoData}")`;
		}
		/*
		// (this is basically the same code as above)
		fetch(chrome.runtime.getURL(`/res/title-${res.theme === `dark` ? `dark` : `light`}.png`))
			.then(response => response.blob())
			.then(blob => {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64data = reader.result;

					for (logo of document.querySelectorAll(`.logo`)) {
						logo.style.backgroundImage = `url("${base64data}")`;
					}
				}
			}
		); */
	});
} catch (e) {
	console.log(e);
}

// Edit the bottom copyright text
let familyPlanActivated = false;
if (document.querySelector(`.copyright`) !== null) {
	if (document.location.pathname === `/`) {
		document.querySelector(`.copyright`).innerHTML = `&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}`;
	} else {
		if (document.querySelector(`.copyright`).innerHTML.toLowerCase().includes(`ģimenes`)) {
			familyPlanActivated = true;
		}

		document.querySelector(`.copyright`).innerHTML =
			`&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}
			<br />
			Aktivizēts <i>E-klases Palīgs</i>`;
	}
}