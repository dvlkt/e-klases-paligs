import { loadTheme } from './themeApplier.js';
import { openTab, sendMessageToEklaseTabs, sendMessageToExtensionTabs } from './tabs.js';

loadTheme();

/*
	The top buttons
*/
// Hide the open E-klase button if a tab with it is already opened
chrome.tabs.query({ url: `*://*.e-klase.lv/*` }, (tabs) => {
	if (tabs.length !== 0) {
		document.querySelector(`#open-e-klase-btn`).style.display = `none`;
	}
});
// Handle button clicks
document.querySelector(`#open-e-klase-btn`).addEventListener(`click`, () => {
	openTab(`https://e-klase.lv`, false);
});
document.querySelector(`#whats-new-btn`).addEventListener(`click`, () => {
	openTab(`/popup/changelog.html`);
});
/* document.querySelector(`#found-bug-btn`).addEventListener(`click`, () => {
	// Stuff happens
}); */


/*
	Theme picker
*/
for (let themeButtonElement of document.querySelectorAll(`.theme-preview`)) {

	// Highlight the button if it's the selected theme
	chrome.storage.sync.get([`theme`], (res) => {
		if (res.theme.name === themeButtonElement.getAttribute(`data-theme-name`)) {
			themeButtonElement.classList.add(`theme-preview-selected`);
		}
	});

	// Add the event listener
	themeButtonElement.addEventListener(`click`, () => {
		// Update the theme button styles
		chrome.storage.sync.get([`theme`], (res) => {
			document.querySelector(`.theme-preview[data-theme-name="${res.theme.name}"]`).classList.remove(`theme-preview-selected`);
			themeButtonElement.classList.add(`theme-preview-selected`);
		});

		// Save the theme
		fetch(chrome.runtime.getURL(`themes/${themeButtonElement.getAttribute(`data-theme-name`)}.json`))
			.then(response => response.json())
			.then(themeData => {

			chrome.storage.sync.set({ theme: themeData }, () => {
				sendMessageToEklaseTabs(`loadTheme`); // Update the theme in all of the opened tabs
				sendMessageToExtensionTabs(`loadTheme`);
				loadTheme();
				chrome.browserAction.setIcon({ path: chrome.runtime.getURL(`/res/${themeData.name}/icon-64.png`) });
			});
		});
	});
}


/*
	Theme color picker
*/
// Rainbow mode is an easter egg
for (let colorButtonElement of document.querySelectorAll(`.color-picker-option`)) {
	// Highlight the color picker button if it's the selected theme
	chrome.storage.sync.get([`themeColor`], (res) => {
		if (res.themeColor === colorButtonElement.getAttribute(`data-theme-color`)) {
			colorButtonElement.classList.add(`color-picker-option-selected`);
		}
	});

	colorButtonElement.addEventListener(`click`, () => {
		// Update the theme color picker button styles
		chrome.storage.sync.get([`themeColor`], (res) => {
			document.querySelector(`.color-picker-option[data-theme-color="${res.themeColor}"]`).classList.remove(`color-picker-option-selected`);
			colorButtonElement.classList.add(`color-picker-option-selected`);
		});

		// Update the theme colors
		chrome.storage.sync.set({ themeColor: colorButtonElement.getAttribute(`data-theme-color`) });
		loadTheme();
		sendMessageToEklaseTabs(`loadTheme`);
	});
}


/*
	Corner roundness slider
*/
let cornerRoundnessSliderElement = document.querySelector(`#corner-roundness-slider`);
let cornerRoundnessSliderGrabberElement = document.querySelector(`#corner-roundness-slider-grabber`);
let cornerRoundnessSliderValueElement = document.querySelector(`#corner-roundness-slider-value`);
let isCornerRoundnessSliderGrabbed = false;
let cornerRoundnessSliderWidth = cornerRoundnessSliderElement.clientWidth;
let cornerRoundnessSliderValue = 0;
const cornerRoundnessSliderMaxValue = 30;

const updateCornerRoundnessSliderGrabber = () => {
	let cornerRoundnessSliderPercentage = cornerRoundnessSliderValue * (100 / cornerRoundnessSliderMaxValue);
	cornerRoundnessSliderGrabberElement.style.left = `${(cornerRoundnessSliderWidth * (cornerRoundnessSliderPercentage / 100)) - 7.5}px`;
	cornerRoundnessSliderValueElement.innerText = `${cornerRoundnessSliderValue}px${ cornerRoundnessSliderValue === 10 ? ` (noklusējums)` : ``}`;
	
	chrome.storage.sync.set({ cornerRoundness: `${cornerRoundnessSliderValue}px` });
	document.querySelector(`:root`).style.setProperty(`--corner-roundness`, `${cornerRoundnessSliderValue}px`);
	sendMessageToEklaseTabs(`loadCornerRoundness`);
}

chrome.storage.sync.get([`cornerRoundness`], (res) => {
	cornerRoundnessSliderValue = parseInt(res.cornerRoundness.split(`px`)[0]); // This removes the "px" at the end of the value
	updateCornerRoundnessSliderGrabber();
});

cornerRoundnessSliderGrabberElement.addEventListener(`mousedown`, (event) => {
	isCornerRoundnessSliderGrabbed = true;
});

window.addEventListener(`mousemove`, (event) => {
	if (isCornerRoundnessSliderGrabbed) {
		if (event.clientX < cornerRoundnessSliderElement.offsetLeft) {
			cornerRoundnessSliderValue = 0;
		} else if (event.clientX > cornerRoundnessSliderElement.offsetLeft + cornerRoundnessSliderWidth) {
			cornerRoundnessSliderValue = cornerRoundnessSliderMaxValue;
		} else {
			cornerRoundnessSliderValue = Math.round(((event.clientX - cornerRoundnessSliderElement.offsetLeft) / cornerRoundnessSliderWidth) * cornerRoundnessSliderMaxValue);
		}

		updateCornerRoundnessSliderGrabber();
	}
});

window.addEventListener(`mouseup`, (event) => {
	if (isCornerRoundnessSliderGrabbed) {
		isCornerRoundnessSliderGrabbed = false;
	}
});


/*
	Holiday design switch
*/
let isHolidayDesignOn = true;
chrome.storage.sync.get([`isHolidayDesignOn`], (res) => {
	let holidayDesignSwitchElement = document.querySelector(`#holiday-design-switch`);

	if (res.isHolidayDesignOn === undefined) {
		chrome.storage.sync.set({ isHolidayDesignOn: true });
		isHolidayDesignOn = true;
	} else {
		isHolidayDesignOn = res.isHolidayDesignOn;
	}

	holidayDesignSwitchElement.className = `switch switch-${isHolidayDesignOn ? `on` : `off`}`;

	holidayDesignSwitchElement.addEventListener(`click`, () => {
		isHolidayDesignOn = !isHolidayDesignOn;

		chrome.storage.sync.set({ isHolidayDesignOn: isHolidayDesignOn });

		holidayDesignSwitchElement.className = `switch switch-${isHolidayDesignOn ? `on` : `off`}`;
	});
});


/*
	Profile picture chooser
*/
// Show the profile picture
let profilePictureElement = document.querySelector(`.profile-picture`);
chrome.storage.local.get([`profilePicture`], (res) => {
	if (res.profilePicture === undefined) {
		// The default profile picture
		profilePictureElement.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjYxIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjUiLz4KPGNpcmNsZSBjeD0iNjQiIGN5PSI0NCIgcj0iMjQiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNSIvPgo8cGF0aCBkPSJNMjEgMTA3LjVDMjEgMTA3LjUgMzUuNSA4Mi41IDY0LjI1IDgyLjVDOTMgODIuNSAxMDcuNSAxMDcuNSAxMDcuNSAxMDcuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1Ii8+Cjwvc3ZnPgo=`;
	} else {
		profilePictureElement.src = res.profilePicture;
	}
});
// Handle the upload button click
document.querySelector(`.profile-picture-btn`).addEventListener(`click`, () => {
	openTab(`/popup/uploadProfilePicture.html`);
});