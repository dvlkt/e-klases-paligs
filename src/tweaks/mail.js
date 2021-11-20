const tryAddingListViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/folder/`)) {
		return;
	}

	if (document.querySelector(`.MailSearch__Input`) !== null) {

		/*
			Show various elements from the old header
		*/
		document.querySelector(`.MailSearch__Input`).focus();
		document.querySelector(`.MailSearch__Input`).blur();
		

		if (document.querySelector(`.mail-list-view-header`) === null) {
			/*
				Add a new list view header (the old one is hidden)
			*/
			let listViewHeaderParentElement = document.querySelector(`.Folder__MailboxHeader`).parentElement;

			let listViewHeaderElement = document.createElement(`div`);
			listViewHeaderElement.className = `mail-list-view-header`;
			listViewHeaderElement.innerHTML = `
				<input class="search-input" placeholder="Meklēt..." />
				<button class="search-button">Pēc autora</button>
				<button class="search-button">Pēc tēmas</button>
				<button class="dropdown-button">Darbības</button>
				<div class="dropdown">
					<button class="option">Dzēst atzīmētās vēstules</button>
					<button class="option">Atzīmēt visas kā lasītas</button>
					<button class="option">Atzīmēt izvēlētās kā lasītas</button>
				</div>
			`;
			listViewHeaderParentElement.insertBefore(listViewHeaderElement, listViewHeaderParentElement.children[0]);

			let listViewHeaderInputElement = document.querySelector(`.mail-list-view-header .search-input`);
			let authorSearchButtonElement = document.querySelector(`.mail-list-view-header .search-button:nth-child(2)`);
			let topicSearchButtonElement = document.querySelector(`.mail-list-view-header .search-button:nth-child(3)`);
			let dropdownButtonElement = document.querySelector(`.mail-list-view-header .dropdown-button`);
			let dropdownElement = document.querySelector(`.mail-list-view-header .dropdown`);

			/*
				Sync up the original and new search inputs
			*/
			// TODO, cuz' the input is actually very mysterious and does not just look at the value
			/* let isListViewHeaderInputFocused = false;
			listViewHeaderElement.addEventListener(`input`, (event) => {
				//console.log(event);
				originalListViewHeaderInputElement.value = listViewHeaderInputElement.value; 
				originalListViewHeaderInputElement.setAttribute(`value`, listViewHeaderInputElement.value);
				originalListViewHeaderInputElement.dispatchEvent(event);
			});
			listViewHeaderElement.addEventListener(`change`, (event) => {
				originalListViewHeaderInputElement.dispatchEvent(event);
			}); */
			/* document.addEventListener(`keydown`, (event) => {
				if (isListViewHeaderInputFocused) {
					console.log(event.key);
					originalListViewHeaderInputElement.dispatchEvent(event);
				}
			}); */

			/*
				Reveal the search options upon clicking the search input
			*/
			listViewHeaderInputElement.addEventListener(`focus`, () => {
				isListViewHeaderInputFocused = true;
				
				listViewHeaderInputElement.style.width = `calc(100% - 350px)`;

				authorSearchButtonElement.style.display = `block`;
				topicSearchButtonElement.style.display = `block`;

				setTimeout(() => {
					topicSearchButtonElement.style.opacity = `1`;
					topicSearchButtonElement.style.transform = `translateY(0)`;
				}, 10);
				setTimeout(() => {
					authorSearchButtonElement.style.opacity = `1`;
					authorSearchButtonElement.style.transform = `translateY(0)`;
				}, 80);
			});
			listViewHeaderInputElement.addEventListener(`blur`, () => {
				setTimeout(() => {
					listViewHeaderInputElement.style.width = ``;

					setTimeout(() => {
						authorSearchButtonElement.style.opacity = `0`;
						authorSearchButtonElement.style.transform = `translateY(10px)`;
					}, 10);
					setTimeout(() => {
						topicSearchButtonElement.style.opacity = `0`;
						topicSearchButtonElement.style.transform = `translateY(10px)`;
					}, 80);

					setTimeout(() => {
						authorSearchButtonElement.style.display = `none`;
						topicSearchButtonElement.style.display = `none`;
					}, 280);
				}, 100);
			});

			/*
				Add the event listeners to the search buttons
			*/
			authorSearchButtonElement.addEventListener(`click`, () => {
				document.querySelector(`.MailSearch__Button:nth-child(1)`).click();
			});
			topicSearchButtonElement.addEventListener(`click`, () => {
				document.querySelector(`.MailSearch__Button:nth-child(2)`).click();
			});

			/*
				Add the event listener to the dropdown button
			*/
			let isActionDropdownOpen = false;
			dropdownButtonElement.addEventListener(`click`, () => {
				if (!isActionDropdownOpen) {
					isActionDropdownOpen = true;

					dropdownElement.innerHTML = ``; // Reset the dropdown content

					setTimeout(() => {
						document.querySelector(`.MailActions .MailActions__ToggleButton`).click(); // Click on the original dropdown so that the original dropdown menu opens
					}, 20);
					setTimeout(() => {
						// Refill the dropdown with the content of the original dropdown
						for (let element of document.querySelectorAll(`.MailActions__ActionList .MailActions__ActionOuter`)) {
							dropdownElement.innerHTML += `
								<button class="option${element.className.includes(`--disabled`) ? ` disabled` : ``}">
									${element.children[0].innerHTML}
								</button>
							`;
						}

						// Add event listeners to the new dropdown options
						for (let i = 0; i < document.querySelector(`.mail-list-view-header .dropdown`).children.length; i++) {
							document.querySelectorAll(`.mail-list-view-header .dropdown .option`)[i].addEventListener(`click`, () => {

								// Open the original dropdown just in case it was closed by now
								if (document.querySelectorAll(`.MailActions__ActionInner`)[i] === null) {
									document.querySelector(`.MailActions .MailActions__ToggleButton`).click();
								}

								document.querySelectorAll(`.MailActions__ActionInner`)[i].click();
							});
						}
					}, 40);

					// Opening animation
					dropdownButtonElement.classList.add(`open`); // This class controls the arrow on the dropdown button

					dropdownElement.style.display = `block`;

					setTimeout(() => {
						dropdownElement.style.opacity = `1`;
						dropdownElement.style.transform = `translateY(0)`;
					}, 20);
				} else {
					isActionDropdownOpen = false;

					// Closing animation
					dropdownButtonElement.classList.remove(`open`);

					dropdownElement.style.opacity = `0`;
					dropdownElement.style.transform = `translateY(10px)`;

					setTimeout(() => {
						dropdownElement.style.display = `none`;
					}, 200);
				}
			});

		}

	} else {
		setTimeout(tryAddingListViewPatches, 20);
	}
}
const tryAddingMailViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/message/view/`)) {
		return;
	}

	if (document.querySelector(`.MailMainAreaWrapper .ViewMessage .ViewMessage__MessageBody`) === null) {
		setTimeout(tryAddingMailViewPatches, 20);
	} else {
		/*
			Reorder the mail view elements
		*/
		let view = document.querySelector(`.ViewMessage`);
		let personWrapper = document.querySelector(`.ViewMessage .ViewMessage__PersonWrapper`);
		let metaInfo = document.querySelector(`.ViewMessage .ViewMessage__MetaInfo`);
		let attachments = document.querySelector(`.ViewMessage .ViewMessage__Attachments`);

		view.appendChild(attachments);
		metaInfo.appendChild(personWrapper);

		/*
			Add file previews
		*/
		for (let attachmentElement of document.querySelectorAll(`.AttachmentList__ItemContainer`)) {
			let fileType = attachmentElement.children[0].id.split(`.`).pop();

			if ([`png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp`].includes(fileType)) {
				let url = attachmentElement.querySelector(`.AttachmentList__Link`).href;

				let imgElement = document.createElement(`img`);
				imgElement.src = url;
				attachmentElement.insertBefore(imgElement, attachmentElement.children[0]);
			} else {
				let fileCategory = `generic`;

				switch (fileType) {
					case `pdf`:
					case `docx`:
					case `doc`:
					case `odf`:
					case `txt`:
					case `html`:
						fileCategory = `document`;
						break;

					case `mp4`:
					case `mkv`:
						fileCategory = `video`;
						break;

					case `mp3`:
					case `wav`:
					case `ogg`:
					case `m4a`:
						fileCategory = `audio`;
						break;
				}

				let iconElement = document.createElement(`div`);
				iconElement.className = `file-icon type-${fileCategory}`;
				attachmentElement.insertBefore(iconElement, attachmentElement.children[0]);
			}

			attachmentElement.addEventListener(`click`, () => {
				attachmentElement.querySelector(`.AttachmentList__Link`).click();
			});
		}
	}
}
const tryAddingMailViewToolbarPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/message/view/`)) {
		return;
	}

	if (document.querySelector(`.MessageActions .TopToolbar__ButtonContainer`) === null) {
		setTimeout(tryAddingMailViewToolbarPatches, 20);
	} else {
		/*
			Add the star button to the toolbar
		*/
		let toolbar = document.querySelector(`.ViewMessage .MessageActions ul`);
		let originalStarButton = document.querySelector(`.ViewMessage__Category.MessageFollowUpStatus`);
		let starButton = document.createElement(`li`);
		let starButtonState = `star-empty`;

		if (originalStarButton.className.includes(`marked`)) {
			starButtonState = `star-filled`;
		} else if (originalStarButton.className.includes(`compleated`)) {
			starButtonState = `check`;
		}

		starButton.className = `TopToolbar__ButtonContainer`;
		starButton.innerHTML = `<button
									title="Atzīmēt kā svarīgu"
									aria-label="Atzīmēt kā svarīgu"
									tabindex="0"
									class="ButtonIcon TopToolbar__Button TopToolbar__Button--${starButtonState}">
									&nbsp;
								</button>`;
		starButton.addEventListener(`click`, () => {
			originalStarButton.click();

			if (starButtonState === `star-empty`) {
				starButtonState = `star-filled`;
			} else if (starButtonState === `star-filled`) {
				starButtonState = `check`;
			} else {
				starButtonState = `star-empty`;
			}

			starButton.children[0].className = `ButtonIcon TopToolbar__Button TopToolbar__Button--${starButtonState}`;
		});
		toolbar.insertBefore(starButton, toolbar.children[4]);
	}
}

window.addEventListener(`urlChanged`, () => {
	tryAddingListViewPatches();
	tryAddingMailViewPatches();
	tryAddingMailViewToolbarPatches();
});
window.addEventListener(`pageLoading`, () => {
	tryAddingListViewPatches();
	tryAddingMailViewPatches();
	tryAddingMailViewToolbarPatches();
});