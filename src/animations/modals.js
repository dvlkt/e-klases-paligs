window.addEventListener(`pageLoaded`, () => {
	/*
		Timetable open/close animation
	*/
	for (let buttonElement of document.querySelectorAll(`.open-timetable, .open-lesson-times`)) {
		let modalElement = document.querySelector(`.modal.lesson-times-modal`);
		let modalCloseElement = document.querySelector(`.timetable-dialog [data-dismiss="modal"]`);
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			modalBgElement.style.display = `block`;
			modalElement.style.display = `block`;

			setTimeout(() => {
				modalBgElement.style.opacity = `1.0`;
				modalElement.style.opacity = `1.0`;
				modalElement.style.transform = `scale(1.0)`;
			}, 50);

			// Resize
			setInterval(() => {
				modalElement.style.top = `calc(50vh - ${modalElement.children[0].children[0].children[0].clientHeight / 2}px)`;
				modalElement.style.height = `${modalElement.children[0].children[0].children[0].clientHeight}px`;
			}, 100);
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
				modalBgElement.style.opacity = `1.0`;
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
		Grade overview open/close animation
	*/
	for (let buttonElement of document.querySelectorAll(`.score.open-mark-file, .recent-scores-item-col .score`)) {
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			setTimeout(() => {
				let modalElement = document.querySelector(`.Modal.modal-evaluation-file`);

				modalBgElement.style.display = `block`;
				modalElement.style.display = `block`;

				setTimeout(() => {
					modalBgElement.style.opacity = `1.0`;
					modalElement.style.opacity = `1.0`;
					modalElement.style.transform = `scale(1.0)`;

					setTimeout(() => onDiaryModalOpening(), 20);
				}, 50);
			}, 20);
		});

		modalBgElement.addEventListener(`click`, () => {
			setTimeout(() => {
				if (document.querySelector(`.Modal.modal-evaluation-file`) === null) {
					return;
				}

				let modalElement = document.querySelector(`.Modal.modal-evaluation-file`);

				modalBgElement.style.opacity = `0`;
				modalElement.style.opacity = `0`;
				modalElement.style.transform = `scale(0.75)`;

				setTimeout(() => {
					modalBgElement.style.display = `none`;
					modalElement.style.display = `none`;

					document.querySelector(`.Modal.modal-evaluation-file .Modal__Header .Modal__Close`)?.click();
				}, 200);
			}, 20);
		});
	}

	/*
		Answer sending modal
	*/
	for (let buttonElement of document.querySelectorAll(`.home-task-answer-widget-container`)) {
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			setTimeout(() => {
				let modalElement = document.querySelector(`.home-task-answer-modal-container .Modal`);

				modalBgElement.style.display = `block`;
				modalElement.style.display = `block`;

				setTimeout(() => {
					modalBgElement.style.opacity = `1.0`;
					modalElement.style.opacity = `1.0`;
					modalElement.style.transform = `scale(1.0)`;

					setTimeout(() => onDiaryModalOpening(), 20);
				}, 50);
			}, 20);
		});

		modalBgElement.addEventListener(`click`, () => {
			setTimeout(() => {
				if (document.querySelector(`.home-task-answer-modal-container .Modal`) === null) {
					return;
				}

				let modalElement = document.querySelector(`.home-task-answer-modal-container .Modal`);

				modalBgElement.style.opacity = `0`;
				modalElement.style.opacity = `0`;
				modalElement.style.transform = `scale(0.75)`;

				setTimeout(() => {
					modalBgElement.style.display = `none`;
					modalElement.style.display = `none`;

					document.querySelector(`.home-task-answer-modal-container .Modal .Modal__Header .Modal__Close`).click();
				}, 200);
			}, 20);
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

		modalElement.style.top = `${window.innerHeight / 2 - modalElement.children[0].children[0].children[0].clientHeight / 2}px`;
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
				modalBgElement.style.opacity = `1.0`;
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

			// Resize
			greetingsModalElement.style.height = `${greetingsModalElement.children[0].children[0].children[0].clientHeight}px`;
			greetingsModalElement.style.top = `calc(50vh - ${greetingsModalElement.children[0].children[0].children[0].clientHeight / 2}px)`;

			setTimeout(() => {
				greetingsModalElement.style.opacity = `1`;
				greetingsModalElement.style.transform = `scale(1.0)`;
				modalBgElement.style.opacity = `1.0`;
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

	addRecipientAnimation();
});
window.addEventListener(`urlChanged`, () => {
	addRecipientAnimation();
});

const onDiaryModalOpening = () => {
	if (document.querySelector(`.Modal .Modal__Dialog .loading`) !== null) {
		setTimeout(() => onDiaryModalOpening(), 20);
	} else {
		// Resize the modal
		let modalElement = document.querySelector(`.home-task-answer-modal-container .Modal, .Modal.modal-evaluation-file`);
		modalElement.style.top = `${window.innerHeight / 2 - modalElement.children[0].children[0].clientHeight / 2}px`;
		modalElement.style.height = `${modalElement.children[0].children[0].clientHeight}px`;

		onDiaryModalFullyLoading();
	}
}
const onDiaryModalFullyLoading = () => {
	if (document.querySelector(`.Modal .loadingMessageBlock, .Modal .Spinner`) !== null) {
		setTimeout(() => onDiaryModalFullyLoading(), 20);
	} else {
		let modalHeaderElement = document.querySelector(`.Modal.modal-evaluation-file .Modal__Header, .home-task-answer-modal-container .Modal .Modal__Header`);
		let originalModalCloseButtonElement = document.querySelector(`.Modal.modal-evaluation-file .Modal__Header .Modal__Close, .home-task-answer-modal-container .Modal .Modal__Header .Modal__Close`);

		if (document.querySelector(`.modal-close-button`) === null) {
			let modalCloseButtonElement = document.createElement(`div`);
			modalCloseButtonElement.className = `modal-close-button`;
			modalCloseButtonElement.innerHTML = originalModalCloseButtonElement.innerHTML;
			modalHeaderElement.insertBefore(modalCloseButtonElement, modalHeaderElement.children[1]);

			originalModalCloseButtonElement.style.display = `none`;
		}

		// Add the close animation
		document.querySelector(`.Modal.modal-evaluation-file .modal-close-button, .home-task-answer-modal-container .modal-close-button`).addEventListener(`click`, () => {
			let modalElement = document.querySelector(`.home-task-answer-modal-container .Modal, .Modal.modal-evaluation-file`);
			let modalBgElement = document.querySelector(`.modal-background`);

			modalBgElement.style.opacity = `0`;
			modalElement.style.opacity = `0`;
			modalElement.style.transform = `scale(0.75)`;

			setTimeout(() => {
				modalBgElement.style.display = `none`;
				modalElement.style.display = `none`;

				originalModalCloseButtonElement.click();
			}, 200);
		});

		// Resize the modal
		let modalElement = document.querySelector(`.home-task-answer-modal-container .Modal, .Modal.modal-evaluation-file`);
		modalElement.style.top = `${window.innerHeight / 2 - modalElement.children[0].children[0].clientHeight / 2}px`;
		modalElement.style.height = `${modalElement.children[0].children[0].clientHeight}px`;
	}
}

const addRecipientAnimation = () => {
	/*
		Recipients modal open/close animation
	*/
	if (document.querySelector(`.MessageContent__AddRecipientButton`) !== null) {
		let buttonElement = document.querySelector(`.MessageContent__AddRecipientButton`);
		let modalBgElement = document.querySelector(`.modal-background`);

		buttonElement.addEventListener(`click`, () => {
			setTimeout(() => {
				let modalElement = document.querySelector(`.Modal#RecipientsModal .Modal__Content`);
				if (modalElement === null) {
					return;
				}
				
				modalBgElement.style.display = `block`;
				modalElement.style.display = `block`;
				modalElement.parentElement.parentElement.style.display = `block`;

				let originalModalCloseButtonElement = document.querySelector(`.Modal#RecipientsModal .Modal__Close`);
				if (document.querySelector(`.Modal#RecipientsModal .modal-close-button`) === null) {
					let modalCloseButtonElement = document.createElement(`div`);
					modalCloseButtonElement.className = `modal-close-button`;
					modalCloseButtonElement.innerHTML = originalModalCloseButtonElement.innerHTML;
					modalCloseButtonElement.addEventListener(`click`, () => {
						modalBgElement.click();
					});
					modalElement.querySelector(`.Modal__Header`).insertBefore(modalCloseButtonElement, modalElement.querySelector(`.Modal__Header .Modal__Close`));
		
					originalModalCloseButtonElement.style.display = `none`;
				}

				setTimeout(() => {
					modalBgElement.style.opacity = `1.0`;
					modalElement.style.opacity = `1.0`;
					modalElement.style.transform = `scale(1.0)`;
				}, 50);
			}, 20);
		});

		modalBgElement.addEventListener(`click`, () => {
			setTimeout(() => {
				let modalElement = document.querySelector(`.Modal#RecipientsModal .Modal__Content`);
				if (modalElement === null) {
					return;
				}

				modalBgElement.style.opacity = `0`;
				modalElement.style.opacity = `0`;
				modalElement.style.transform = `scale(0.75)`;

				setTimeout(() => {
					modalBgElement.style.display = `none`;
					modalElement.parentElement.parentElement.style.display = `none`;
				}, 200);
			}, 20);
		});
	}
}