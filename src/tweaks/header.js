window.addEventListener(`pageLoading`, () => {
	// Remove the titles for the links
	for (element of document.querySelectorAll(`.header-second-menu .header-second-menu-item a`)) {
		element.innerText = ``;
	}

	// Remove the student selector & first header
	if (document.querySelector(`.header-second .col-sm-4.col-sm-offset-1`) !== null) {
		let element = document.querySelector(`.header-second .col-sm-4.col-sm-offset-1`);
		element.parentElement.removeChild(element);
	}
	if (document.querySelector(`.content-wrap .header-first`)) {
		let element = document.querySelector(`.content-wrap .header-first`);
		element.parentElement.removeChild(element);
	}

	// Add the logo
	
	
	// Add the videocall tab
	if (document.querySelector(`.header-second .header-second-menu`) !== null) {
		let header = document.querySelector(`.header-second .header-second-menu`);

		let element = document.createElement(`li`);
		element.className = `header-second-menu-item item-video`;
		element.innerHTML = `<a href="/SPA/Family#/video-communication/all" class="onclick-spinner"></a>`;

		header.insertBefore(element, header.children[3]);
	}

	// Show the loading spinner when clicking "Saziņa", "Pārskati" and account button
	// ...and also set the links so it works on mobile as well
	for (element of document.querySelectorAll(`.item-messages a`)) {
		element.className = `onclick-spinner`;
		element.href = `/SPA/Family#/mail`;
	}
	for (element of document.querySelectorAll(`.item-analytics a`)) {
		element.className = `onclick-spinner`;
	}
	if (document.querySelector(`.student-switch-link`) !== null) {
		document.querySelector(`.student-switch-link`).className += ` onclick-spinner`;
	}
});

window.addEventListener(`urlChanged`, () => {
	// Show header links as active when in some pages
	if (document.location.href.includes(`/SPA/Family#/mail`)) {
		document.querySelector(`.header-second-menu-item.item-messages`).className += ` active`;
	} else {
		document.querySelector(`.header-second-menu-item.item-messages`).className = `header-second-menu-item item-messages`;
	}
	if (document.location.href.includes(`/SPA/Family#/video-communication`)) {
		document.querySelector(`.header-second-menu-item.item-video`).className += ` active`;
	} else {
		document.querySelector(`.header-second-menu-item.item-video`).className = `header-second-menu-item item-video`;
	}
});