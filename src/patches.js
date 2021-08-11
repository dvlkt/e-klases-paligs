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
				o.style.background = `#28282d`;
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
for (element of document.querySelectorAll(`.item-messages a`)) {
	element.className = `onclick-spinner`;
}
for (element of document.querySelectorAll(`.item-analytics a`)) {
	element.className = `onclick-spinner`;
}
if (document.querySelector(`.student-switch-link`) !== null) {
	document.querySelector(`.student-switch-link`).className += ` onclick-spinner`;
}