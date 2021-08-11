let lightThemeBtn = document.getElementById(`theme-light-btn`);
let darkThemeBtn = document.getElementById(`theme-dark-btn`);

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light theme-selected`;
	darkThemeBtn.className = `theme theme-dark`;

	browser.storage.sync.set({ theme: `light` });
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
	
	browser.storage.sync.set({ theme: `dark` });
}

document.getElementById(`profile-picture-btn`).onclick = () => {
	browser.tabs.create({
		active: true,
		url: browser.runtime.getURL(`/popup/uploadProfilePicture.html`)
	});
}