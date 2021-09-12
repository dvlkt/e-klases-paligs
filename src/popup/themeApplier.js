chrome.storage.sync.get(`theme`, (res) => {
	if (res.theme === `dark`) {
		document.body.className = `dark-theme`;
		if (darkThemeBtn !== undefined) darkThemeBtn.className += ` theme-selected`;

		console.log(document.querySelector(`.news`))
		if (document.querySelector(`.news`) !== null) {
			for (element of document.querySelectorAll(`img`)) {
				console.log(element.src)
			}
		}
	} else {
		document.body.className = `light-theme`;
		if (lightThemeBtn !== undefined) lightThemeBtn.className += ` theme-selected`;
	}
});