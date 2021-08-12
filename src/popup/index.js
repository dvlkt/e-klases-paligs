let lightThemeBtn = document.getElementById(`theme-light-btn`);
let darkThemeBtn = document.getElementById(`theme-dark-btn`);

browser.storage.sync.get(`theme`).then((res) => {
	if (res.theme === `dark`) {
		document.body.className = `dark-theme`;
		darkThemeBtn.className += ` theme-selected`;
	} else {
		document.body.className = `light-theme`;
		lightThemeBtn.className += ` theme-selected`;
	}
});

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light theme-selected`;
	darkThemeBtn.className = `theme theme-dark`;

	browser.storage.sync.set({ theme: `light` });
	document.body.className = `light-theme`;
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
	
	browser.storage.sync.set({ theme: `dark` });
	document.body.className = `dark-theme`;
}


document.getElementById(`profile-picture-btn`).onclick = () => {
	browser.tabs.create({
		active: true,
		url: browser.runtime.getURL(`/popup/uploadProfilePicture.html`)
	});
}