// The WebExtensions Storage API has actual autism, PTSD, down syndrom, depression,
// speech impediment, AIDS, HIV, ADHD, schizophrenia, trisomy 13, cancer,
// and probably at least 18 other different diseases but doctors haven't 100% confirmed that yet

// ...anyways this sets the theme to light by default if it hasn't been set
browser.storage.sync.get(`theme`).then((res) => {
	if (Object.keys(res).length === 0) {
		browser.storage.sync.set({ theme: `light` });
	}
});

browser.storage.sync.get(`theme`).then((res) => {
	fetch(browser.runtime.getURL(`/themes/${res.theme}.json`)).then((response) => {
		response.json().then((res) => {
			let root = document.querySelector(`:root`);
			for (let key in res) {
				root.style.setProperty(`--${key}`, res[key]);
			}
		});
	});
});