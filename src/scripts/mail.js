let areOriginalSearchButtonsShown = false;

const categories = [
	{
		name: `Ienākošās`,
		url: `inbox`
	},
	{
		name: `Nelasītās`,
		url: `unread`
	},
	{
		name: `Svarīgās`,
		url: `followUp`
	},
	{
		name: `Dzēstās`,
		url: `deleted`
	},
	{
		name: `Melnraksti`,
		url: `drafts`
	},
	{
		name: `Aizsūtītās`,
		url: `sent`
	}
];

const tryAddingListViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/folder/`)) {
		return;
	}

	if (document.querySelector(`.MailSearch__Input`) !== null) {


		if (document.querySelector(`.mail-list-view-header`) === null) {
			/*
				Add a new list view header (the old one is hidden)
			*/
			let listViewHeaderParentElement = document.querySelector(`.Folder__MailboxHeader`).parentElement;

			let listViewHeaderElement = document.createElement(`div`);
			listViewHeaderElement.className = `mail-list-view-header`;
			listViewHeaderElement.innerHTML = `
				<button class="search-button">Pēc autora</button>
				<button class="search-button">Pēc tēmas</button>
				<button class="close-button"></button>
				<button class="dropdown-button">Darbības</button>
				<div class="dropdown"><p>Nav izvēļu.</p></div>
			`;
			listViewHeaderParentElement.insertBefore(listViewHeaderElement, listViewHeaderParentElement.children[0]);

			/*
				Insert the original search bar into the new header
			*/
			let searchInputElement = document.querySelector(`.MailSearch__Input`);
			listViewHeaderElement.insertBefore(searchInputElement, listViewHeaderElement.children[0]);
			searchInputElement.placeholder = `Meklēt...`;

			let dropdownButtonElement = document.querySelector(`.mail-list-view-header .dropdown-button`);
			let dropdownElement = document.querySelector(`.mail-list-view-header .dropdown`);
			let authorSearchButtonElement = document.querySelector(`.mail-list-view-header .search-button:nth-child(2)`);
			let topicSearchButtonElement = document.querySelector(`.mail-list-view-header .search-button:nth-child(3)`);
			let closeSearchButtonElement = document.querySelector(`.mail-list-view-header .close-button`);


			/*
				Reveal the search options upon clicking the search input
			*/
			searchInputElement.addEventListener(`focus`, () => {
				if (window.location.href.includes(`drafts`)) {
					return;
				}

				if (!areOriginalSearchButtonsShown) {
					searchInputElement.blur();

					document.querySelector(`.MailSearch__Input`).focus();
					document.querySelector(`.MailSearch__Input`).blur();

					areOriginalSearchButtonsShown = true;

					setTimeout(() => searchInputElement.focus(), 20);
				}

				isListViewHeaderInputFocused = true;
				
				if (window.innerWidth > 767) {
					searchInputElement.style.width = `calc(100% - 390px)`;
				}

				authorSearchButtonElement.style.display = `block`;
				topicSearchButtonElement.style.display = `block`;
				closeSearchButtonElement.style.display = `block`;

				// Change the text for the author search button when in the sent page
				if (window.location.href.includes(`sent`)) {
					authorSearchButtonElement.innerHTML = `Pēc adresāta`;
				} else {
					authorSearchButtonElement.innerHTML = `Pēc autora`;
				}

				setTimeout(() => {
					closeSearchButtonElement.style.opacity = `1`;

					if (window.innerWidth > 767) {
						closeSearchButtonElement.style.right = `400px`;
					}
				}, 10);
				setTimeout(() => {
					topicSearchButtonElement.style.opacity = `1`;
					topicSearchButtonElement.style.transform = `translateY(0)`;
				}, 10);
				setTimeout(() => {
					authorSearchButtonElement.style.opacity = `1`;
					authorSearchButtonElement.style.transform = `translateY(0)`;
				}, 80);
				setTimeout(() => {
					if (window.innerWidth <= 767) {
						listViewHeaderElement.style.height = `80px`;
					}
				}, 10);
			});

			/*
				Add event listener to the close search button
			*/
			closeSearchButtonElement.addEventListener(`click`, () => {
				if (document.querySelector(`.MailSearch__ResetInputButton`) !== null) {
					document.querySelector(`.MailSearch__ResetInputButton`).click();
				}

				setTimeout(() => {
					searchInputElement.style.width = ``;

					if (window.innerWidth <= 767) {
						listViewHeaderElement.style.height = `35px`;
					}

					setTimeout(() => {
						closeSearchButtonElement.style.opacity = `0`;
						closeSearchButtonElement.style.right = `140px`;
					}, 10);
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
						closeSearchButtonElement.style.display = `none`;
					}, 280);
				}, 100);
			});

			/*
				Add the event listeners to the search buttons
			*/
			authorSearchButtonElement.addEventListener(`click`, () => {
				document.querySelector(`.MailSearch__Button:nth-child(1)`).click();
				setTimeout(() => { tryAddingListViewPatches() }, 20);
			});
			topicSearchButtonElement.addEventListener(`click`, () => {
				document.querySelector(`.MailSearch__Button:nth-child(2)`).click();
				setTimeout(() => { tryAddingListViewPatches() }, 20);
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
						let btnLabels = ["Dzēst atzīmētās vēstules", "Atzīmēt visas kā lasītas", "Atzīmēt izvēlētās kā lasītas"];
						let btnLabelI = 0;
						for (let element of document.querySelectorAll(`.MailActions__ActionList .MailActions__ActionOuter`)) {
							dropdownElement.innerHTML += `
								<button class="option${element.className.includes(`--disabled`) ? ` disabled` : ``}">
									${btnLabels[btnLabelI]}
								</button>
							`;
							btnLabelI++;
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

			/*
				Add the mobile category selector, new mail button and title
			*/
			if (window.innerWidth <= 767) {
				let mobileCategorySelectorButton = document.createElement(`div`);
				mobileCategorySelectorButton.className = `mobile-category-selector-btn`;
				listViewHeaderParentElement.insertBefore(mobileCategorySelectorButton, listViewHeaderParentElement.children[0]);

				let mobileCategorySelector = document.createElement(`div`);
				mobileCategorySelector.className = `mobile-category-selector`;
				listViewHeaderParentElement.appendChild(mobileCategorySelector);

				for (let i = 0; i < categories.length; i++) {
					let mobileCategorySelectorOption = document.createElement(`button`);
					mobileCategorySelectorOption.innerText += categories[i].name;
					mobileCategorySelector.appendChild(mobileCategorySelectorOption);

					mobileCategorySelectorOption.addEventListener(`click`, () => {
						window.location.hash = `/mail/folder/standardType_fmft_${categories[i].url}/false`;

						mobileCategorySelectorButton.innerHTML = `<b>Kategorija:</b> ${categories[i].name}`;

						mobileCategorySelector.style.opacity = `0`;
						mobileCategorySelector.style.top = `120px`;
						mobileCategorySelector.style.height = `0`;

						mobileCategorySelectorBg.style.opacity = `0`;

						setTimeout(() => {
							mobileCategorySelector.style.display = `none`;
							mobileCategorySelectorBg.style.display = `none`;
						}, 200);
					});

					if (window.location.hash.includes(categories[i].url)) {
						mobileCategorySelectorButton.innerHTML = `<b>Kategorija:</b> ${categories[i].name}`;
					}
				}

				let mobileCategorySelectorBg = document.createElement(`div`);
				mobileCategorySelectorBg.className = `mobile-category-selector-bg`;
				listViewHeaderParentElement.appendChild(mobileCategorySelectorBg);


				mobileCategorySelectorButton.addEventListener(`click`, () => {
					mobileCategorySelector.style.display = `block`;
					mobileCategorySelectorBg.style.display = `block`;

					setTimeout(() => {
						mobileCategorySelector.style.opacity = `1`;
						mobileCategorySelector.style.top = `80px`;
						mobileCategorySelector.style.height = `330px`;

						mobileCategorySelectorBg.style.opacity = `1`;
					}, 20);
				});
				mobileCategorySelectorBg.addEventListener(`click`, () => {
					mobileCategorySelector.style.opacity = `0`;
					mobileCategorySelector.style.top = `120px`;
					mobileCategorySelector.style.height = `0`;

					mobileCategorySelectorBg.style.opacity = `0`;

					setTimeout(() => {
						mobileCategorySelector.style.display = `none`;
						mobileCategorySelectorBg.style.display = `none`;
					}, 200);
				});


				let mobileNewMailButton = document.createElement(`button`);
				mobileNewMailButton.className = `mobile-new-mail-btn`;
				mobileNewMailButton.innerText = `Jauna vēstule`;
				listViewHeaderParentElement.insertBefore(mobileNewMailButton, listViewHeaderParentElement.children[0]);

				mobileNewMailButton.addEventListener(`click`, () => {
					window.location.hash = `/mail/message/new`;
				});


				let titleElement = document.createElement(`h1`);
				titleElement.className = `mobile-page-title`;
				titleElement.innerText = `Pasts`;
				listViewHeaderParentElement.insertBefore(titleElement, listViewHeaderParentElement.children[0]);
			}

		}

		/*
			Hide the search bar if user is in drafts page
		*/
		let searchInputElement = document.querySelector(`.MailSearch__Input`);
		if (window.location.href.includes(`drafts`)) {
			searchInputElement.style.opacity = `0`;
			searchInputElement.style.cursor = `default`;

			setTimeout(() => {
				searchInputElement.style.visibility = `hidden`;
			}, 200);
		} else {
			searchInputElement.style.visibility = `unset`;

			setTimeout(() => {
				searchInputElement.style.opacity = `1`;
				searchInputElement.style.cursor = `unset`;
			}, 20);
		}

		/*
			Close the search bar when going to a new page
		*/
		for (let element of document.querySelectorAll(`.NavItem`)) {
			element.addEventListener(`click`, () => {
				document.querySelector(`.mail-list-view-header .close-button`).click();
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

			let attachmentURL = attachmentElement.querySelector(`.AttachmentList__Link`).href;
			attachmentElement.addEventListener(`click`, () => {
				window.open(attachmentURL);
			});
			// Remove the href from the link to avoid downloading the file twice
			attachmentElement.querySelector(`.AttachmentList__Link`).removeAttribute(`href`);
		}

		/*
			Fix HTML symbols not rendering properly in the title
		*/
		let mailViewTitleElement = document.querySelector(`.ViewMessage__MessageTitle`);
		if (mailViewTitleElement.innerHTML.includes(`&`)) {
			let virtualElement = new DOMParser().parseFromString(mailViewTitleElement.innerText, `text/html`);
			mailViewTitleElement.innerHTML = virtualElement.documentElement.textContent;
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
const tryAddingNewMailViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/message/new`)) {
		return;
	}

	/*
		Improve the design of the file upload progress bar
	*/
	//document.querySelector(`.MessageContent__Row`).style.background = `#f00`;
}

window.addEventListener(`urlChanged`, () => {
	areOriginalSearchButtonsShown = false;

	tryAddingListViewPatches();
	tryAddingMailViewPatches();
	tryAddingMailViewToolbarPatches();
	tryAddingNewMailViewPatches();
});
window.addEventListener(`pageLoading`, () => {
	tryAddingListViewPatches();
	tryAddingMailViewPatches();
	tryAddingMailViewToolbarPatches();
	tryAddingNewMailViewPatches();
});

/*
<li
	class="AttachmentList__ItemContainer" style="margin-top: 5px; margin-bottom: 5px;">

	<span
		id="attach-attachment.mp4"
		class="AttachmentList__Item AttachmentList__Item--border"
		style="background: rgba(0, 0, 0, 0) linear-gradient(to right, lightblue 0%, lightblue 53%, lightblue 53%, white 53%, white 100%) repeat scroll 0% 0%;">
		
		<span
			class="">attachment.mp4</span>
		<button
			class="AttachmentList__RemoveButton">&nbsp;</button>

	</span>
</li>
*/