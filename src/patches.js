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
	//element.href = `/Family/ReportPupilMarks/Get`
}
if (document.querySelector(`.student-switch-link`) !== null) {
	document.querySelector(`.student-switch-link`).className += ` onclick-spinner`;
}

// In the home pages on mobile, move the login box to the top
if (window.location.pathname === `/`) {
	if (document.body.clientWidth <= 767) {
		let loginElement = document.querySelector(`aside.hidden-xs`);
		loginElement.parentNode.insertBefore(loginElement, loginElement.parentNode.firstChild);
	}
}

const tryAddingMailViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/message/view/`)) {
		return;
	}

	if (document.querySelector(`.MailMainAreaWrapper .ViewMessage .ViewMessage__MessageBody`) === null) {
		setTimeout(tryAddingMailViewPatches, 20);
	} else {
		// Reorder the mail view elements
		let view = document.querySelector(`.ViewMessage`);
		let personWrapper = document.querySelector(`.ViewMessage .ViewMessage__PersonWrapper`);
		let metaInfo = document.querySelector(`.ViewMessage .ViewMessage__MetaInfo`);
		let attachments = document.querySelector(`.ViewMessage .ViewMessage__Attachments`);

		view.appendChild(attachments);
		metaInfo.appendChild(personWrapper);

		// Add image previews
		for (let attachmentElement of document.querySelectorAll(`.AttachmentList__ItemContainer`)) {
			let fileType = attachmentElement.children[0].id.split(`.`).pop();

			if (fileType === `png` || fileType === `jpg` || fileType === `jpeg` || fileType === `bmp` || fileType === `gif`) {
				let url = attachmentElement.querySelector(`.AttachmentList__Link`).href;

				let imgElement = document.createElement(`img`);
				imgElement.src = url;
				attachmentElement.insertBefore(imgElement, attachmentElement.children[0]);
			}

			attachmentElement.addEventListener(`click`, () => {
				attachmentElement.querySelector(`.AttachmentList__Link`).click();
			});
		}
	}
}
window.addEventListener(`locationchange`, () => {
	tryAddingMailViewPatches();
});
tryAddingMailViewPatches();