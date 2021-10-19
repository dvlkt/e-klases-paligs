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
	if (res.theme.name === `dark`) {
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
const sendCornerRoundnessUpdateMessage = () => {
	chrome.tabs.query({ url: "*://*.e-klase.lv/*" }, (tabs) => {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(
				tab.id,
				`loadCornerRoundness`
			);
		}
	});
}


const saveTheme = (themeName) => {
	fetch(chrome.runtime.getURL(`themes/${themeName}.json`))
		.then(response => response.json())
		.then(themeData => {

			chrome.storage.sync.set({ theme: themeData }, () => {
				sendThemeUpdateMessage();
			});

		});
}

lightThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme-preview theme-preview-light theme-preview-selected`;
	darkThemeBtn.className = `theme-preview theme-preview-dark`;

	saveTheme(`light`);

	document.body.className = `light-theme`;
}
darkThemeBtn.onclick = () => {
	lightThemeBtn.className = `theme-preview theme-preview-light`;
	darkThemeBtn.className = `theme-preview theme-preview-dark theme-preview-selected`;

	saveTheme(`dark`);
	
	document.body.className = `dark-theme`;
}

const themeColors = {
	red: `#ee3333`,
	orange: `#fa5e21`,
	yellow: `#f8b525`,
	green: `#139e4a`,
	lblue: `#0088e3`,
	blue: `#1c1fd1`,
	violet: `#8c29dd`
}
for (let element of document.querySelectorAll(`#theme-color-picker .color-picker-option`)) {
	element.addEventListener(`click`, () => {
		let colorValue = themeColors[element.className.split(`-`)[5]];
		chrome.storage.sync.set({ themeColor: colorValue });
		document.querySelector(`:root`).style.setProperty(`--theme-color`, colorValue);

		sendThemeUpdateMessage();
	});
}


let cornerRoundnessSlider = document.querySelector(`#corner-roundness-slider`);
let cornerRoundnessSliderGrabber = document.querySelector(`#corner-roundness-slider-grabber`);
let isCornerRoundnessSliderGrabbed = false;
let cornerRoundnessSliderLeftEdge = cornerRoundnessSlider.offsetLeft;
let cornerRoundnessSliderRightEdge = cornerRoundnessSlider.offsetLeft + cornerRoundnessSlider.clientWidth - 20;

chrome.storage.sync.get([`cornerRoundness`], (res) => {
	let cornerRoundnessValue = parseInt(res.cornerRoundness.split(`px`)[0]);
	cornerRoundnessSliderGrabber.style.left = `${cornerRoundnessValue}px`
});

cornerRoundnessSliderGrabber.addEventListener(`mousedown`, () => {
	isCornerRoundnessSliderGrabbed = true;
});

window.addEventListener(`mousemove`, (event) => {
	if (isCornerRoundnessSliderGrabbed) {
		if (event.clientX < cornerRoundnessSliderLeftEdge) {
			cornerRoundnessSliderGrabber.style.left = `0`;
		} else if (event.clientX > cornerRoundnessSliderRightEdge) {
			cornerRoundnessSliderGrabber.style.right = `20px`;
		} else {
			cornerRoundnessSliderGrabber.style.left = `${event.clientX - cornerRoundnessSliderLeftEdge}px`;
		}

		// Update the corner roundness
		let cornerRoundnessSliderOffsetLeft = cornerRoundnessSliderGrabber.offsetLeft - cornerRoundnessSliderLeftEdge;
		let cornerRoundnessSliderValuePercentage = cornerRoundnessSliderOffsetLeft / (cornerRoundnessSlider.clientWidth - 20)
		let cornerRoundnessSliderValue = cornerRoundnessSliderValuePercentage * 60; // Values go from 0 to 60
		
		chrome.storage.sync.set({ cornerRoundness: `${cornerRoundnessSliderValue}px`});
		sendCornerRoundnessUpdateMessage();
	}
});

window.addEventListener(`mouseup`, (event) => {
	if (isCornerRoundnessSliderGrabbed) {
		isCornerRoundnessSliderGrabbed = false;
	}
});


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