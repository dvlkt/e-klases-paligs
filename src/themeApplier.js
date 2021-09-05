// The WebExtensions Storage API has actual autism, PTSD, down syndrom, depression,
// speech impediment, AIDS, HIV, ADHD, schizophrenia, trisomy 13, cancer,
// and probably at least 18 other different diseases but doctors haven't 100% confirmed that yet

// ...anyways this sets the theme to light by default if it hasn't been set
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