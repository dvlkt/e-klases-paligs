// Top link animations
for (let i of document.querySelectorAll(`.header-first-menu-item`)) {
	if (i.querySelector(`.header-first-submenu`) !== null) {
		let submenu = i.querySelector(`.header-first-submenu`);

		const onMouseEnter = () => {
			if (submenu.style.display !== `block`) {
				submenu.style.display = `block`;
		
				setTimeout(() => {
					submenu.style.opacity = `1`;
					submenu.style.transform = `translateY(0px)`;
				}, 50);
			}
		}
		const onMouseOut = () => {
			if (!i.matches(`:hover`) &&
				!submenu.matches(`:hover`)) {

				submenu.style.opacity = `0`;
				submenu.style.transform = `translateY(-10px)`;
		
				setTimeout(() => {
					submenu.style.display = `none`;
				}, 200);
			}
		}

		i.addEventListener(`mouseenter`, onMouseEnter);
		i.addEventListener(`mouseout`, onMouseOut);
		submenu.addEventListener(`mouseenter`, onMouseEnter);
		submenu.addEventListener(`mouseout`, onMouseOut);
	}
}

// Calendar popup animations
if (document.location.href.includes(`/Family/Diary`)) {
	for (let calendarButton of document.querySelectorAll(`.selected-period.hidden-xs`)) {
		let calendar = calendarButton.parentElement.children[5];

		calendarButton.addEventListener(`click`, () => {
			if (calendarButton.parentElement.className.includes(`calendar-open`)) {
				calendar.style.opacity = `0`;
				calendar.style.transform = `translateY(-10px)`;
				setTimeout(() => {
					calendar.style.display = `none`;
				}, 200);
			} else {
				calendar.style.display = `block`;
				setTimeout(() => {
					calendar.style.opacity = `1`;
					calendar.style.transform = `translateY(0)`;
				}, 50);
			}
		});
	}
}

// Loading spinner open animation
for (element of document.querySelectorAll(`.onclick-spinner`)) {
	element.addEventListener(`click`, () => {
		let loadingSpinner = document.querySelector(`#loading-info`);
		let background = document.querySelector(`#overlay`);

		loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 0; transform: scale(0.1) !important;`);
		background.setAttribute(`style`, `display: block !important; opacity: 0;`);

		setTimeout(() => {
			// Have to do it this way instead of using loadingSpinner.style.whatever because dumbass
			// E-klase devs added !important everywhere instead of fixing their bad code
			loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 1; transform: scale(1) !important;`);
			
			background.setAttribute(`style`, `display: block !important; opacity: 1;`);
		}, 50);
	});
}

// Loading spinner close animation
if (document.querySelector(`#loading-info`) !== null) {
	let loadingSpinner = document.querySelector(`#loading-info`);
	let background = document.querySelector(`#overlay`);

	setTimeout(() => {
		loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 0; transform: scale(0.1) !important;`);
		background.setAttribute(`style`, `display: block !important; opacity: 0;`);
	}, 50);
	setTimeout(() => {
		loadingSpinner.setAttribute(`style`, `display: none !important; opacity: 0; transform: scale(0.1) !important;`);
		background.setAttribute(`style`, `display: none !important; opacity: 0;`);
	}, 250);
}

// Mail actions dropdown animation
// This code checks if the mail layout has been loaded every 20 milliseconds until it has and then it applies the animation
const tryAddingMailActionDropdownAnimation = () => {
	if (!window.location.href.includes(`/SPA/Family#/mail`)) {
		return;
	}

	if (document.querySelector(`.communication-container .container .mailbox-data .wrapper`).children[1].innerHTML.includes(`Loading`)) {
		setTimeout(tryAddingMailActionDropdownAnimation, 20);
	} else {
		let toggleButton = document.querySelector(`span button.MailActions__ToggleButton`);

		toggleButton.addEventListener(`click`, () => {
			if (document.querySelector(`ul.MailActions__ActionList`) === null) {

			} else {
				setTimeout(() => {
					let dropdown = document.querySelector(`ul.MailActions__ActionList`);

					dropdown.style.opacity = `1`;
					dropdown.style.transform = `translateY(0)`;
				}, 200);
			}
		});
	}
}
tryAddingMailActionDropdownAnimation();