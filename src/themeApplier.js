// This sets the theme to light by default if it hasn't been set
chrome.storage.sync.get(`theme`, (res) => {
	if (Object.keys(res).length === 0) {
		chrome.storage.sync.set({ theme: `light` });
	}
});

chrome.storage.sync.get(`theme`, (res) => {
	let themeData;
	switch (res.theme) {
		case `dark`:
			themeData = darkTheme;
			break;
		default:
			themeData = lightTheme;
			break;
	}

	let root = document.querySelector(`:root`);
	for (let key in themeData) {
		root.style.setProperty(`--${key}`, themeData[key]);
	}
});