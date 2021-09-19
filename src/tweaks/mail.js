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
window.addEventListener(`urlChanged`, () => {
	tryAddingMailViewPatches();
});
window.addEventListener(`pageLoading`, () => {
	tryAddingMailViewPatches();
});