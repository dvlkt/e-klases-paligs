window.addEventListener(`pageLoading`, () => {
	// Add the videocall tab
	if (document.querySelector(`.header-second .header-second-menu`) !== null) {
		let header = document.querySelector(`.header-second .header-second-menu`);

		let element = document.createElement(`li`);
		element.className = `header-second-menu-item item-video`;
		element.innerHTML = `<a href="/SPA/Family#/video-communication/all" class="onclick-spinner">Video saziņa</a>`;

		header.insertBefore(element, header.children[3]);
	}

	// Rename the mail tab
	if (document.querySelector(`.header-second-menu .header-second-menu-item.item-messages a`) !== null) {
		document.querySelector(`.header-second-menu .header-second-menu-item.item-messages a`).innerText = `Pasts`;
	}

	// Add the tooltips
	for (let element of document.querySelectorAll(`li.header-second-menu-item`)) {
		element.innerHTML += `
			<div class="header-menu-item-tooltip">
				<div class="header-menu-item-tooltip-content">
					<p>${element.querySelector(`a`).innerText}</p>
				</div>
			</div>`;
	}

	// Add animations for tooltips
	for (let element of document.querySelectorAll(`li.header-second-menu-item a`)) {
		let tooltip = element.parentElement.querySelector(`.header-menu-item-tooltip`);

		element.addEventListener(`mouseenter`, () => {
			tooltip.style.display = `block`;

			setTimeout(() => {
				tooltip.style.marginTop = `5px`;
				tooltip.style.opacity = `1`;
			}, 50);
		});
		element.addEventListener(`mouseleave`, () => {
			setTimeout(() => {
				tooltip.style.marginTop = `20px`;
				tooltip.style.opacity = `0`;
			}, 50);

			setTimeout(() => {
				tooltip.style.display = `none`;
			}, 250);
		})
	}

	// Add the logo
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		chrome.storage.sync.get(`theme`, (res) => {
			fetch(chrome.runtime.getURL(`res/title-${res.theme === `dark` ? `dark` : `light`}.png`))
				.then(response => response.blob())
				.then(blob => {
					var reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = () => {
						let logoElement = document.createElement(`img`);
						logoElement.className = `header-logo`;
						logoElement.src = reader.result;

						document.querySelector(`.header-second .header-second-inner`).appendChild(logoElement);
					}
				}
			);
		});
	}

	// Add the account popup
	let isAccountPopupOpen = false;
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		let accountPopupElement = document.createElement(`div`);
		accountPopupElement.className = `header-account-popup`;

		accountPopupElement.innerHTML = `

			`;

		document.querySelector(`.header-second .header-second-inner`).appendChild(accountPopupElement);
	}

	// Add the account popup button
	if (document.querySelector(`.header-second .header-second-inner`) !== null) {
		let accountPopupButtonElement = document.createElement(`div`);
		accountPopupButtonElement.className = `header-account-btn`;

		document.querySelector(`.header-second .header-second-inner`).appendChild(accountPopupButtonElement);

		let accountPopupElement = document.querySelector(`.header-account-popup`);

		accountPopupButtonElement.addEventListener(`click`, () => {
			if (isAccountPopupOpen) {
				isAccountPopupOpen = false;
				accountPopupButtonElement.className = `header-account-btn`;

				accountPopupElement.style.top = `94px`;
				accountPopupElement.style.opacity = `0`;
				setTimeout(() => {
					accountPopupElement.style.display = `none`;
				}, 200);
			} else {
				isAccountPopupOpen = true;
				accountPopupButtonElement.className = `header-account-btn active`;

				accountPopupElement.style.display = `block`;
				setTimeout(() => {
					accountPopupElement.style.top = `74px`;
					accountPopupElement.style.opacity = `1`;
				}, 50);
			}
		})
	}

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