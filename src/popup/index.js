let whatsNewButton = document.getElementById(`whats-new-btn`);
whatsNewButton.onclick = () => {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL(`/popup/changelog.html`)
	});
}

/* let foundBugButton = document.getElementById(`found-bug-btn`);
foundBugButton.onclick = () => {
	alert(`Lol pats vainīgs`);
} */

let lightThemeBtn = document.getElementById(`theme-preview-light-btn`);
let darkThemeBtn = document.getElementById(`theme-preview-dark-btn`);

chrome.storage.sync.get(`theme`, (res) => {
	if (res.theme === `dark`) {
		darkThemeBtn.className += ` theme-preview-selected`;
	} else {
		lightThemeBtn.className += ` theme-preview-selected`;
	}
});

const sendThemeUpdateMessage = () => {
	chrome.tabs.query({ url: "*://*.e-klase.lv/*" }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(
				tab.id,
				`loadTheme`
			);
		}
	});
}

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme-preview theme-preview-light theme-preview-selected`;
	darkThemeBtn.className = `theme-preview theme-preview-dark`;

	chrome.storage.sync.set({ theme: `light` });
	document.body.className = `light-theme`;

	sendThemeUpdateMessage();
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme-preview theme-preview-light`;
	darkThemeBtn.className = `theme-preview theme-preview-dark theme-preview-selected`;
	
	chrome.storage.sync.set({ theme: `dark` });
	document.body.className = `dark-theme`;

	sendThemeUpdateMessage();
}


for (let element of document.querySelectorAll(`#theme-color-picker .color-picker-option`)) {
	element.addEventListener(`click`, () => {
		chrome.storage.sync.set({ themeColor: element.className.split(`-`)[5] });
		sendThemeUpdateMessage();
	});
}

let profilePictureElement = document.getElementById(`profile-picture`);
chrome.storage.local.get(`profilePicture`, (res) => {
	if (res.profilePicture === undefined) {
		// The default profile picture
		profilePictureElement.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjYxIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjUiLz4KPGNpcmNsZSBjeD0iNjQiIGN5PSI0NCIgcj0iMjQiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIvPgo8cGF0aCBkPSJNMjEgMTA3LjVDMjEgMTA3LjUgMzUuNSA4Mi41IDY0LjI1IDgyLjVDOTMgODIuNSAxMDcuNSAxMDcuNSAxMDcuNSAxMDcuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1Ii8+Cjwvc3ZnPgo=`;
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