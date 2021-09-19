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
	lightThemeBtn.className = `theme theme-light theme-selected`;
	darkThemeBtn.className = `theme theme-dark`;

	chrome.storage.sync.set({ theme: `light` });
	document.body.className = `light-theme`;

	changeNotice.style.top = `4rem`;

	sendThemeUpdateMessage();
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme theme-light`;
	darkThemeBtn.className = `theme theme-dark theme-selected`;
	
	chrome.storage.sync.set({ theme: `dark` });
	document.body.className = `dark-theme`;

	changeNotice.style.top = `4rem`;

	sendThemeUpdateMessage();
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