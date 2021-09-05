let lightThemeBtn = document.getElementById(`theme-light-btn`);
let darkThemeBtn = document.getElementById(`theme-dark-btn`);

chrome.storage.sync.get(`theme`, (res) => {
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

	chrome.storage.sync.set({ theme: `light` });
	document.body.className = `light-theme`;
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
	
	chrome.storage.sync.set({ theme: `dark` });
	document.body.className = `dark-theme`;
}

let profilePictureElement = document.getElementById(`profile-picture`);
chrome.storage.local.get(`profilePicture`, (res) => {
	if (res.profilePicture === null) {

	} else {
		profilePictureElement.src = res.profilePicture;
	}
});
document.getElementById(`profile-picture-btn`).onclick = () => {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL(`/popup/uploadProfilePicture.html`)
	});
}