chrome.storage.sync.get(`theme`, (res) => {
	if (res.theme === `dark`) {
		document.body.className = `dark-theme`;

		if (document.querySelector(`.news`) !== null) {
			for (element of document.querySelectorAll(`img`)) {
				element.src = element.src.replaceAll(`light`, `dark`);
			}
		}

		//darkThemeBtn.className += ` theme-selected`;
	} else {
		document.body.className = `light-theme`;
		//lightThemeBtn.className += ` theme-selected`;
	}
});