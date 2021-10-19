import { loadTheme } from './themeApplier.js';
import { openTab, sendMessageToTabs } from './tabs.js';

loadTheme();

/*
	The top buttons
*/
document.querySelector(`#whats-new-btn`).onclick = () => {
	openTab(`/popup/changelog.html`);
}
/* document.querySelector(`#found-bug-btn`).onclick = () => {
	// Stuff happens
} */


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
				sendMessageToTabs(`loadTheme`); // Update the theme in all of the opened tabs
				loadTheme();
			});
		});
	});
}


/*
	Theme color picker
*/
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
		document.querySelector(`:root`).style.setProperty(`--theme-color`, colorButtonElement.getAttribute(`data-theme-color`));
		chrome.storage.sync.set({ themeColor: colorButtonElement.getAttribute(`data-theme-color`) });
		sendMessageToTabs(`loadTheme`);
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
	sendMessageToTabs(`loadCornerRoundness`);
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