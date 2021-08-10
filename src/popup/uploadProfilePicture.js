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
			browser.storage.local.get({ profilePicture: event.target.result }).then((msg) => {
				window.close();
                console.log(msg);
                //window.close();
            }, (err) => {
                console.log(err);
            });
		};
	}
}