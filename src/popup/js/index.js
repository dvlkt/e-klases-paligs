import { loadTheme } from './themeApplier.js';
import { openTab, sendMessageToEklaseTabs, sendMessageToExtensionTabs } from './tabs.js';
import { Switch, Slider } from './components.js';

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


/*
	Theme picker
*/
let themeList = [`light`, `dark`, `combined`, `deepDark`, `solarizedLight`, `solarizedDark`, `ayu`, `gitHubDark`, `shadesOfPurple`];
let themePickerElement = document.querySelector(`#theme-picker`);

// Fill up the theme picker with all themes
for (let i = 0; i < themeList.length; i++) {
	themePickerElement.innerHTML += 
		`<div class="theme-preview" data-theme-name="${themeList[i]}">
			<div class="theme-preview-header"></div>
			<div class="theme-preview-header-detail"></div>
			<div class="theme-preview-table-title"></div>
			<div class="theme-preview-table"></div>
		</div>`;
}
themePickerElement.style.width = `${themeList.length * 125}px`;

// Load the theme preview colors
for (let i = 0; i < themeList.length; i++) {
	fetch(chrome.runtime.getURL(`themes/${themeList[i]}.json`))
		.then(response => response.json())
		.then(themeData => {
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"]`).style.background = themeData.colors[`background-back`];
			document.querySelector(`.theme-preview[data-theme-name="${themeList[i]}"] .theme-preview-header`).style.background = themeData.colors.header[`background`];
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
	Font picker
*/
let fontList = [`Inter`, `Overpass`, `Quicksand`, `Source Code Pro`, `Roboto Slab`, `Lora`];
let fontPickerElement = document.querySelector(`#font-picker`);

// Fill up the font picker with all fonts
for (let i = 0; i < fontList.length; i++) {
	fontPickerElement.innerHTML +=
		`<div class="font-preview" data-font-name="${fontList[i]}" style="font-family: ${fontList[i]};">
			<p>${fontList[i]}</p>
		</div>`;
}
fontPickerElement.style.width = `${fontList.length * 125}px`;

for (let fontButtonElement of document.querySelectorAll(`.font-preview`)) {
	// Highlight the button if it's the selected font
	chrome.storage.sync.get([`font`], (res) => {
		if (res.font === fontButtonElement.getAttribute(`data-font-name`)) {
			fontButtonElement.classList.add(`font-preview-selected`);
		}
	});

	// Add the event listener
	fontButtonElement.addEventListener(`click`, () => {
		// Update the font button styles
		chrome.storage.sync.get([`font`], (res) => {
			document.querySelector(`.font-preview[data-font-name="${res.font}"]`).classList.remove(`font-preview-selected`);
			fontButtonElement.classList.add(`font-preview-selected`);
		});

		// Save the font
		chrome.storage.sync.set({ font: fontButtonElement.getAttribute(`data-font-name`) }, () => {
			sendMessageToEklaseTabs(`updateFont`); // Update the font in all of the opened tabs
			sendMessageToExtensionTabs(`updateFont`);
			loadTheme();
		});
	});
}


/*
	Corner roundness slider
*/
let cornerRoundnessSlider = new Slider(document.querySelector(`#corner-roundness-slider`), 0, 30);
let cornerRoundnessSliderValueElement = document.querySelector(`#corner-roundness-slider-value`);

chrome.storage.sync.get([`cornerRadius`], (res) => {
	cornerRoundnessSlider.setValue(res.cornerRadius);
});

cornerRoundnessSlider.setOnChangeFunction(() => {
	chrome.storage.sync.set({ cornerRadius: cornerRoundnessSlider.value });

	document.querySelector(`:root`).style.setProperty(`--corner-radius`, `${cornerRoundnessSlider.value}px`);
	
	sendMessageToEklaseTabs(`updateCornerRadius`);

	cornerRoundnessSliderValueElement.innerText = `${cornerRoundnessSlider.value}px${cornerRoundnessSlider.value === 10 ? ` (noklusējums)` : ``}`;
});


/*
	Background translucency
*/
let backgroundOpacitySlider = new Slider(document.querySelector(`#background-opacity-slider`), 50, 100);
let backgroundOpacitySliderValueElement = document.querySelector(`#background-opacity-slider-value`);

chrome.storage.sync.get([`backgroundOpacity`], (res) => {
	backgroundOpacitySlider.setValue(res.backgroundOpacity * 100);
});

backgroundOpacitySlider.setOnChangeFunction(() => {
	chrome.storage.sync.set({ backgroundOpacity: backgroundOpacitySlider.value / 100 });

	sendMessageToEklaseTabs(`updateBackgroundOpacity`);

	backgroundOpacitySliderValueElement.innerText = `${Math.round(backgroundOpacitySlider.value)}%${backgroundOpacitySlider.value === 100 ? ` (noklusējums)` : ``}`;
});

let backgroundBlurSwitch = new Switch(document.querySelector(`#background-blur-switch`));
chrome.storage.sync.get([`isBackgroundBlurOn`], (res) => {
	backgroundBlurSwitch.setValue(res.isBackgroundBlurOn === true);
});
backgroundBlurSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ isBackgroundBlurOn: backgroundBlurSwitch.value });
	sendMessageToEklaseTabs(`updateBackgroundOpacity`);
});


/*
	Statistics options
*/
let statisticsSwitch = new Switch(document.querySelector(`#statistics-switch`));
chrome.storage.sync.get([`isStatisticsPanelOn`], (res) => {
	statisticsSwitch.setValue(res.isStatisticsPanelOn === true);
});
statisticsSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ isStatisticsPanelOn: statisticsSwitch.value });
});

let statisticsNVSwitch = new Switch(document.querySelector(`#statistics-nv-switch`));
chrome.storage.sync.get([`treatNVAsZero`], (res) => {
	statisticsNVSwitch.setValue(res.treatNVAsZero === true);
});
statisticsNVSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ treatNVAsZero: statisticsNVSwitch.value });
});

let statisticsNSwitch = new Switch(document.querySelector(`#statistics-n-switch`));
chrome.storage.sync.get([`treatNAsZero`], (res) => {
	statisticsNSwitch.setValue(res.treatNAsZero === true);
});
statisticsNSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ treatNAsZero: statisticsNSwitch.value });
});

let statisticsPercentageSwitch = new Switch(document.querySelector(`#statistics-percentage-switch`));
chrome.storage.sync.get([`treatPercentagesAsGrades`], (res) => {
	statisticsPercentageSwitch.setValue(res.treatPercentagesAsGrades === true);
});
statisticsPercentageSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ treatPercentagesAsGrades: statisticsPercentageSwitch.value });
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


/*
	Technical settings
*/
let debugModeSwitch = new Switch(document.querySelector(`#debug-mode-switch`));
chrome.storage.sync.get([`isDebugModeOn`], (res) => {
	debugModeSwitch.setValue(res.isDebugModeOn === true);
});
debugModeSwitch.setOnClickFunction(() => {
	chrome.storage.sync.set({ isDebugModeOn: debugModeSwitch.value });
});