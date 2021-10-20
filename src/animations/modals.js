window.addEventListener(`pageLoaded`, () => {
	/*
		Timetable open/close animation
	*/
	for (let buttonElement of document.querySelectorAll(`.open-timetable`)) {
		let modalElement = document.querySelector(`.modal.lesson-times-modal`);
		let modalCloseElement = document.querySelector(`.timetable-dialog [data-dismiss="modal"]`);
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			modalBgElement.style.display = `block`;
			modalElement.style.display = `block`;

			setTimeout(() => {
				modalBgElement.style.opacity = `0.5`;
				modalElement.style.opacity = `1.0`;
				modalElement.style.transform = `scale(1.0)`;
			}, 50);
		});

		modalCloseElement.addEventListener(`click`, () => {
			modalBgElement.style.opacity = `0`;
			modalElement.style.opacity = `0`;
			modalElement.style.transform = `scale(0.75)`;

			setTimeout(() => {
				modalBgElement.style.display = `none`;
				modalElement.style.display = `none`;
			}, 200);
		});
		modalBgElement.addEventListener(`click`, () => {
			modalBgElement.style.opacity = `0`;
			modalElement.style.opacity = `0`;
			modalElement.style.transform = `scale(0.75)`;

			setTimeout(() => {
				modalBgElement.style.display = `none`;
				modalElement.style.display = `none`;
			}, 200);
		});
	}

	/*
		Legend open/close animation
	*/
	for (let buttonElement of document.querySelectorAll(`.open-legend`)) {
		let modalElement = document.querySelector(`.modal.terms-and-abbreviations-modal`);
		let modalCloseElement = document.querySelector(`.legend-dialog [data-dismiss="modal"]`);
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			modalBgElement.style.display = `block`;
			modalElement.style.display = `block`;

			setTimeout(() => {
				modalBgElement.style.opacity = `0.5`;
				modalElement.style.opacity = `1.0`;
				modalElement.style.transform = `scale(1.0)`;
			}, 50);
		});

		modalCloseElement.addEventListener(`click`, () => {
			modalBgElement.style.opacity = `0`;
			modalElement.style.opacity = `0`;
			modalElement.style.transform = `scale(0.75)`;

			setTimeout(() => {
				modalBgElement.style.display = `none`;
				modalElement.style.display = `none`;
			}, 200);
		});
		modalBgElement.addEventListener(`click`, () => {
			modalBgElement.style.opacity = `0`;
			modalElement.style.opacity = `0`;
			modalElement.style.transform = `scale(0.75)`;

			setTimeout(() => {
				modalBgElement.style.display = `none`;
				modalElement.style.display = `none`;
			}, 200);
		});
	}
});