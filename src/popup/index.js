let whatsNewButton = document.getElementById(`whats-new-btn`);
whatsNewButton.onclick = () => {
	chrome.tabs.create({
		active: true,
		url: chrome.runtime.getURL(`/popup/changelog.html`)
	});
}

let foundBugButton = document.getElementById(`found-bug-btn`);
foundBugButton.onclick = () => {
	alert(`Lol pats vainīgs`);
}

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
		profilePictureElement.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDU2QzE2IDU2IDIwLjg4NDEgNDYuNSAzMi41IDQ2LjVDNDQuMTE1OSA0Ni41IDQ4IDU2IDQ4IDU2IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjUiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjguNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1Ii8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMjYiIHI9IjEwLjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIvPgo8L3N2Zz4K`;
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