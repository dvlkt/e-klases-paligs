const tryAddingListViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/folder/`)) {
		return;
	}

	if (document.querySelector(`.MailSearch__Input`) !== null) {
		document.querySelector(`.MailSearch__Input`).setAttribute(`placeholder`, `Meklēt...`);
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