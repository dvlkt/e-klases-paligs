let changeNotice = document.getElementById(`notice`);
changeNotice.onclick = () => {
	changeNotice.style.top = `0`;
}

let whatsNewButton = document.getElementById(`whats-new`);
whatsNewButton.onclick = () => {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL(`/popup/changelog.html`)
	});
}

let lightThemeBtn = document.getElementById(`theme-light-btn`);
let darkThemeBtn = document.getElementById(`theme-dark-btn`);

chrome.storage.sync.get(`theme`, (res) => {
	if (res.theme === `dark`) {
		darkThemeBtn.className += ` theme-selected`;
	} else {
		lightThemeBtn.className += ` theme-selected`;
	}
});

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light theme-selected`;
	darkThemeBtn.className = `theme theme-dark`;

	chrome.storage.sync.set({ theme: `light` });
	document.body.className = `light-theme`;

	changeNotice.style.top = `4rem`;
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
	
	chrome.storage.sync.set({ theme: `dark` });
	document.body.className = `dark-theme`;

	changeNotice.style.top = `4rem`;
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