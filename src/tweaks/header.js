window.addEventListener(`pageLoading`, () => {
	// Show the button as active when in mail page
	if (document.location.href.includes(`/SPA/Family#/mail`)) {
		document.querySelector(`.header-second-menu-item.item-links.item-messages`).className += ` active`;
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
		//element.href = `/SPA/Family#/mail`;
	}
	for (element of document.querySelectorAll(`.item-analytics a`)) {
		element.className = `onclick-spinner`;
	}
	if (document.querySelector(`.student-switch-link`) !== null) {
		document.querySelector(`.student-switch-link`).className += ` onclick-spinner`;
	}
});