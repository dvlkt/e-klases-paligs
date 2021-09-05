let btn = document.getElementById(`btn`);
let upload = document.getElementById(`upload`);

btn.onclick = () => {
	upload.click();
}
upload.onchange = () => {
	if (upload.files !== null) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(upload.files[0]);
		fileReader.onload = (event) => {
			chrome.storage.local.set({ profilePicture: event.target.result }, (msg) => {
				window.close();
            });
		};
	}
}