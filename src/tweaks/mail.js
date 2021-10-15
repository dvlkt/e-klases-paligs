const tryAddingMailViewPatches = () => {
	if (!location.href.includes(`SPA/Family#/mail/message/view/`)) {
		if (document.querySelector(`.MailSearch__Input`) !== null) {
			document.querySelector(`.MailSearch__Input`).setAttribute(`placeholder`, `Meklēt...`);
		}

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

			if (fileType === `png` || fileType === `jpg` || fileType === `jpeg` || fileType === `bmp` || fileType === `gif` || fileType === `webp`) {
				let url = attachmentElement.querySelector(`.AttachmentList__Link`).href;

				let imgElement = document.createElement(`img`);
				imgElement.src = url;
				attachmentElement.insertBefore(imgElement, attachmentElement.children[0]);
			} else {
				let fileCategory = null; // 0 = document, 1 = video, 2 = audio

				switch (fileType) {
					case `pdf`:
					case `docx`:
					case `doc`:
					case `odf`:
					case `txt`:
					case `html`:
						fileCategory = 0;
						break;

					case `mp4`:
					case `mkv`:
						fileCategory = 1;
						break;

					case `mp3`:
					case `wav`:
					case `ogg`:
					case `m4a`:
						fileCategory = 2;
						break;
				}	

				if (fileCategory !== null) {
					let imgElement = document.createElement(`img`);
					imgElement.src = chrome.runtime.getURL(`res/icons/attachment-${fileCategory}.png`);
					//attachmentElement.insertBefore(imgElement, attachmentElement.children[0]);
				}
			}

			attachmentElement.addEventListener(`click`, () => {
				attachmentElement.querySelector(`.AttachmentList__Link`).click();
			});
		}
	}
}
window.addEventListener(`urlChanged`, () => {
	tryAddingMailViewPatches();
});
window.addEventListener(`pageLoading`, () => {
	tryAddingMailViewPatches();
});