// Show the button as active when in mail page
if (document.location.href.includes(`/SPA/Family#/mail`)) {
	document.querySelector(`.header-second-menu-item.item-links.item-messages`).className += ` active`;
}

// Remove the different column colors from the table header in diary when there is no data
if (document.location.href.includes(`/Family/Diary`)) {
	for (let i of document.querySelectorAll(`table.lessons-table`)) {
		if (i.children[1].children[0].children[0].className.includes(`no-data`)) {
			for (let o of i.querySelectorAll(`thead tr td`)) {
				o.innerHTML = ``;
				o.style.background = `var(--background-middle-dark-color)`;
			}
		}
	}
}

// Replace the dumb "Notifikācijas" name with "Paziņojumi"
if (document.querySelector(`.layout-navigation-notifications`) !== null) {
	document.querySelector(`.layout-navigation-notifications`).innerText = `Paziņojumi`;
}
for (element of document.querySelectorAll(`.user-settings-tab`)) {
	if (element.innerText === `Notifikācijas`) {
		element.innerText = `Paziņojumi`;
	}
}

// Show the loading spinner when clicking "Saziņa", "Pārskati" and account button
// ...and also set the links so it works on mobile as well
for (element of document.querySelectorAll(`.item-messages a`)) {
	element.className = `onclick-spinner`;
	element.href = `/SPA/Family#/mail`;
}
for (element of document.querySelectorAll(`.item-analytics a`)) {
	element.className = `onclick-spinner`;
	element.href = `/Family/ReportPupilMarks/Get`
}
if (document.querySelector(`.student-switch-link`) !== null) {
	document.querySelector(`.student-switch-link`).className += ` onclick-spinner`;
}

// In the home pages, when on a small screen move the login box to the top
if (window.location.pathname === `/`) {
	if (document.body.clientWidth <= 767) {
		let loginElement = document.querySelector(`aside.hidden-xs`);
		loginElement.parentNode.insertBefore(loginElement, loginElement.parentNode.firstChild);
	}
}

const tryAddingMailPatches = () => {
	if (!window.location.href.includes(`/SPA/Family#/mail`)) {
		return;
	}
	
	if (document.querySelector(`.communication-container .container .mailbox-data .wrapper`).children[1].innerHTML.includes(`Loading`)) {
		setTimeout(tryAddingMailActionDropdownAnimation, 20);
	} else {

		// Swap the title and the sender/recipient when viewing mail
		if (document.querySelector(`.MailMainAreaWrapper .ViewMessage .ViewMessage__MetaInfo`) !== null) {
			let personWrapper = document.querySelector(`.ViewMessage .ViewMessage__PersonWrapper`);
			let metaInfo = document.querySelector(`.ViewMessage .ViewMessage__MetaInfo`);

			metaInfo.parentNode.insertBefore(metaInfo, personWrapper);
		}
	}
}
tryAddingMailPatches();