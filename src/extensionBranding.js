// Change favicon (currently broken on Chrome)
try {
	chrome.storage.sync.get(`theme`, (res) => {
		let isBW = document.querySelector(`.ekl__header`) !== null; // As far as I can tell, this element only exists in the homepage
		// This is to make the icon black and white when logged out

		let iconUrl = `/res/${res.theme === `dark` ? `dark` : `light`}/icon-256${isBW ? `-bw` : ``}.png`;
		// This ensures that if res.theme isn't either `dark` or `light`, it'll default to `light`

		// Reads the icon file, code from here https://stackoverflow.com/a/50248437
		// and here https://stackoverflow.com/a/18650249
		fetch(chrome.runtime.getURL(iconUrl))
			.then(response => response.blob())
			.then(blob => {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64data = reader.result;

					// Applies the actual icon
					if (document.querySelector(`link[rel~="icon"]`) === null) {
						let element = document.createElement(`link`);
						element.rel = `icon`;
						element.href = base64data;

						document.head.appendChild(element);
					} else {
						document.querySelector(`link[rel~="icon"]`).href = base64data;
					}
				}
			}
			);

		// Change all of the original logos to the new ones
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
		);
	});
} catch (e) {
	console.log(e);
}

// Edit the bottom copyright text
if (document.querySelector(`.copyright`) !== null) {
	if (document.location.pathname === `/`) {
		document.querySelector(`.copyright`).innerHTML = `&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}`;
	} else {
		document.querySelector(`.copyright`).innerHTML =
			`&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}
			<br />
			Aktivizēta <i>E-klase 2</i>`;
	}
}