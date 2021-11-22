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
			
			modalElement.style.top = `${modalElement.children[0].children[0].children[0].clientHeight / 2}px`;
			modalElement.style.height = `${modalElement.children[0].children[0].children[0].clientHeight}px`;

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

	/*
		Technical support warning close animation
	*/
	if (document.querySelector(`.technical-support-warning-modal`) !== null) {
		let modalElement = document.querySelector(`.modal.technical-support-warning-modal`);
		let modalCloseElement = document.querySelector(`.technical-support-warning-modal [data-dismiss="modal"]`);
		let modalButtonElement = document.querySelector(`.technical-support-warning-modal .modal-button`);
		let modalBgElement = document.querySelector(`.modal-background`);

		modalElement.style.top = `${modalElement.children[0].children[0].children[0].clientHeight / 2}px`;
		modalElement.style.height = `${modalElement.children[0].children[0].children[0].clientHeight}px`;

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
		modalButtonElement.addEventListener(`click`, () => {
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
		Settings open/close animation
	*/
	for (let buttonElement of document.querySelectorAll(`.open-user-settings`)) {
		let modalElement = document.querySelector(`.modal#settingsModal`);
		let modalCloseElement = document.querySelector(`.modal#settingsModal .close-modal`);
		let modalBgElement = document.createElement(`div`);

		modalBgElement.className = `modal-background`;
		document.body.appendChild(modalBgElement);

		modalCloseElement.href = `#`;

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
		Greeting open/close animation
	*/
	chrome.storage.sync.get([`shouldShowSetupModal`], (res) => {
		if (res.shouldShowSetupModal) {
			chrome.storage.sync.set({ shouldShowSetupModal: false });

			let greetingsModalElement = document.querySelector(`.greetings-modal`);
			let modalBgElement = document.querySelector(`.modal-background`);
			let greetingsModalCloseElement = document.querySelector(`.greetings-modal .modal-close`);
			let greetingsModalBtnElement = document.querySelector(`.greetings-modal .modal-button`);

			greetingsModalElement.style.display = `block`;
			modalBgElement.style.display = `block`;

			greetingsModalElement.style.height = `${greetingsModalElement.children[0].children[0].children[0].clientHeight}px`;
			greetingsModalElement.style.top = `${greetingsModalElement.children[0].children[0].children[0].clientHeight / 2}px`;

			setTimeout(() => {
				greetingsModalElement.style.opacity = `1`;
				greetingsModalElement.style.transform = `scale(1.0)`;
				modalBgElement.style.opacity = `0.5`;
			}, 50);

			greetingsModalBtnElement.addEventListener(`click`, () => {
				greetingsModalElement.style.opacity = `0`;
				greetingsModalElement.style.transform = `scale(0.75)`;
				modalBgElement.style.opacity = `0`;

				setTimeout(() => {
					greetingsModalElement.style.display = `none`;
					modalBgElement.style.display = `none`;
				}, 200);
			});
			greetingsModalCloseElement.addEventListener(`click`, () => {
				greetingsModalElement.style.opacity = `0`;
				greetingsModalElement.style.transform = `scale(0.75)`;
				modalBgElement.style.opacity = `0`;

				setTimeout(() => {
					greetingsModalElement.style.display = `none`;
					modalBgElement.style.display = `none`;
				}, 200);
			});
			modalBgElement.addEventListener(`click`, () => {
				greetingsModalElement.style.opacity = `0`;
				greetingsModalElement.style.transform = `scale(0.75)`;
				modalBgElement.style.opacity = `0`;

				setTimeout(() => {
					greetingsModalElement.style.display = `none`;
					modalBgElement.style.display = `none`;
				}, 200);
			});
		}
	});
});