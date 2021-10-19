let buttonElement = document.getElementById(`btn`);
let fileUploadElement = document.getElementById(`upload`);

buttonElement.addEventListener(`click`, (event) => {
	fileUploadElement.click();
});
fileUploadElement.addEventListener(`change`, () => {
	if (fileUploadElement.files !== null) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(upload.files[0]);
		fileReader.onload = (event) => {
			chrome.storage.local.set({ profilePicture: event.target.result }, (msg) => {
				window.close(); // When done, close the tab
            });
		};
	}
});