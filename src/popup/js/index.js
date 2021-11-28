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
let themeList = [`light`, `dark`, `deepDark`, `solarizedLight`, `solarizedDark`];
let themePickerElement = document.querySelector(`#theme-picker`);

// Fill up the theme picker with all themes
for (let i = 0; i < themeList.length; i++) {
	themePickerElement.innerHTML += `
		<div class="theme-preview" data-theme-name="${themeList[i]}">
			<div class="theme-preview-header"></div>
			<div class="theme-preview-header-detail"></div>
			<div class="theme-preview-table-title"></div>
			<div class="theme-preview-table"></div>
		</div>
	`;
}

// Load the theme preview colors
for (let i = 0; i < themeList.length; i++) {
	fetch(chrome.runtime.getURL(`themes/${themeList[i]}.json`))
		.then(response => response.json())
		.then(themeData => {
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"]`).style.background = themeData.colors[`background-back`];
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"] .theme-preview-header`).style.background = themeData.colors[`background-middle`];
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"] .theme-preview-table-title`).style.background = themeData.colors[`title`];
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"] .theme-preview-table`).style.background = themeData.colors[`background-middle`];
		}
	);
}

for (let themeButtonElement of document.querySelectorAll(`.theme-preview`)) {
	// Highlight the button if it's the selected theme
	chrome.storage.sync.get([`themeName`], (res) => {
		if (res.themeName === themeButtonElement.getAttribute(`data-theme-name`)) {
			themeButtonElement.classList.add(`theme-preview-selected`);
		}
	});

	// Add the event listener
	themeButtonElement.addEventListener(`click`, () => {
		// Update the theme button styles
		chrome.storage.sync.get([`themeName`], (res) => {
			document.querySelector(`.theme-preview[data-theme-name="${res.themeName}"]`).classList.remove(`theme-preview-selected`);
			themeButtonElement.classList.add(`theme-preview-selected`);
		});

		// Save the theme
		fetch(chrome.runtime.getURL(`themes/${themeButtonElement.getAttribute(`data-theme-name`)}.json`))
			.then(response => response.json())
			.then(themeData => {

			chrome.storage.sync.set({ themeData, themeName: themeButtonElement.getAttribute(`data-theme-name`) }, () => {
				sendMessageToEklaseTabs(`updateTheme`); // Update the theme in all of the opened tabs
				sendMessageToExtensionTabs(`updateTheme`);
				loadTheme();
				chrome.browserAction.setIcon({ path: chrome.runtime.getURL(`/res/${themeData.variants.logo}/icon-64.png`) });
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
		sendMessageToEklaseTabs(`updateThemeColor`);
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
	
	chrome.storage.sync.set({ cornerRadius: cornerRoundnessSliderValue });
	document.querySelector(`:root`).style.setProperty(`--corner-radius`, `${cornerRoundnessSliderValue}px`);
	sendMessageToEklaseTabs(`updateCornerRadius`);
}

chrome.storage.sync.get([`cornerRadius`], (res) => {
	cornerRoundnessSliderValue = res.cornerRadius;
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
	Statistics options
*/
let isStatisticsPanelOn = true;
let isTreatingNVAsZero = true;
let isTreatingNAsZero = true;
let isTreatingPercentagesAsGrades = true;

chrome.storage.sync.get([`isStatisticsPanelOn`], (res) => {
	let statisticsSwitchElement = document.querySelector(`#statistics-switch`);

	if (res.isStatisticsPanelOn === undefined) {
		chrome.storage.sync.set({ isStatisticsPanelOn: true });
		isStatisticsPanelOn = true;
	} else {
		isStatisticsPanelOn = res.isStatisticsPanelOn;
	}

	statisticsSwitchElement.className = `switch switch-${isStatisticsPanelOn ? `on` : `off`}`;

	statisticsSwitchElement.addEventListener(`click`, () => {
		isStatisticsPanelOn = !isStatisticsPanelOn;

		chrome.storage.sync.set({ isStatisticsPanelOn });

		statisticsSwitchElement.className = `switch switch-${isStatisticsPanelOn ? `on` : `off`}`;
	});
});

chrome.storage.sync.get([`treatNVAsZero`], (res) => {
	let statisticsNVSwitchElement = document.querySelector(`#statistics-nv-switch`);

	if (res.treatNVAsZero === undefined) {
		chrome.storage.sync.set({ treatNVAsZero: true });
		isTreatingNVAsZero = true;
	} else {
		isTreatingNVAsZero = res.treatNVAsZero;
	}

	statisticsNVSwitchElement.className = `switch switch-${isTreatingNVAsZero ? `on` : `off`}`;

	statisticsNVSwitchElement.addEventListener(`click`, () => {
		isTreatingNVAsZero = !isTreatingNVAsZero;

		chrome.storage.sync.set({ treatNVAsZero: isTreatingNVAsZero });

		statisticsNVSwitchElement.className = `switch switch-${isTreatingNVAsZero ? `on` : `off`}`;
	});
});

chrome.storage.sync.get([`treatNAsZero`], (res) => {
	let statisticsNSwitchElement = document.querySelector(`#statistics-n-switch`);

	if (res.treatNAsZero === undefined) {
		chrome.storage.sync.set({ treatNAsZero: true });
		isTreatingNAsZero = true;
	} else {
		isTreatingNAsZero = res.treatNAsZero;
	}

	statisticsNSwitchElement.className = `switch switch-${isTreatingNAsZero ? `on` : `off`}`;

	statisticsNSwitchElement.addEventListener(`click`, () => {
		isTreatingNAsZero = !isTreatingNAsZero;

		chrome.storage.sync.set({ treatNAsZero: isTreatingNAsZero });

		statisticsNSwitchElement.className = `switch switch-${isTreatingNAsZero ? `on` : `off`}`;
	});
});

chrome.storage.sync.get([`treatPercentagesAsGrades`], (res) => {
	let statisticsPercentageSwitchElement = document.querySelector(`#statistics-percentage-switch`);

	if (res.treatPercentagesAsGrades === undefined) {
		chrome.storage.sync.set({ treatPercentagesAsGrades: true });
		isTreatingPercentagesAsGrades = true;
	} else {
		isTreatingPercentagesAsGrades = res.treatPercentagesAsGrades;
	}

	statisticsPercentageSwitchElement.className = `switch switch-${isTreatingPercentagesAsGrades ? `on` : `off`}`;

	statisticsPercentageSwitchElement.addEventListener(`click`, () => {
		isTreatingPercentagesAsGrades = !isTreatingPercentagesAsGrades;

		chrome.storage.sync.set({ treatPercentagesAsGrades: isTreatingPercentagesAsGrades });

		statisticsPercentageSwitchElement.className = `switch switch-${isTreatingPercentagesAsGrades ? `on` : `off`}`;
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