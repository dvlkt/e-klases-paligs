window.addEventListener(`pageLoading`, () => {
	for (element of document.querySelectorAll(`.open-lesson-times`)) {
		let modalElement = document.querySelector(`.timetable-dialog .modal-content`);
		let modalCloseElement = document.querySelector(`[data-dismiss="modal"]`);

		element.addEventListener(`click`, () => {
			setTimeout(() => {
				modalElement.style.transform = `scale(1)`;
				modalElement.style.opacity = `1`;
			}, 50);
		});

		modalCloseElement.addEventListener(`click`, () => {
			setTimeout(() => {
				modalElement.style.transform = `scale(0.1)`;
				modalElement.style.opacity = `0.1`;
			}, 50);
		});
	}
});