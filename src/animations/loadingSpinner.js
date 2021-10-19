/* Opening animation */
window.addEventListener(`pageLoaded`, () => {
	for (element of document.querySelectorAll(`.onclick-spinner`)) {
		element.addEventListener(`click`, () => {
			let loadingSpinner = document.querySelector(`#loading-info`);
			let background = document.querySelector(`#overlay`);

			loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 0; transform: scale(0.1) !important;`);
			background.setAttribute(`style`, `display: block !important; opacity: 0;`);

			setTimeout(() => {
				// Have to do it this way instead of using loadingSpinner.style.whatever because dumbass
				// E-klase devs added !important everywhere instead of fixing their bad code
				loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 1; transform: scale(1) !important;`);

				background.setAttribute(`style`, `display: block !important; opacity: 1;`);
			}, 50);
		});
	}
});

/* Closing animation */
window.addEventListener(`pageLoaded`, () => {
	if (document.querySelector(`#loading-info`) !== null) {
		let loadingSpinner = document.querySelector(`#loading-info`);
		let background = document.querySelector(`#overlay`);

		setTimeout(() => {
			loadingSpinner.setAttribute(`style`, `display: block !important; opacity: 0; transform: scale(0.1) !important;`);
			background.setAttribute(`style`, `display: block !important; opacity: 0;`);
		}, 50);
		setTimeout(() => {
			loadingSpinner.setAttribute(`style`, `display: none !important; opacity: 0; transform: scale(0.1) !important;`);
			background.setAttribute(`style`, `display: none !important; opacity: 0;`);
		}, 250);
	}
});