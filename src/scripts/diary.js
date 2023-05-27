window.addEventListener(`pageLoading`, () => {
	if (!window.location.href.includes(`/Family/Diary`)) {
		return;
	}

	/*
		Change the diary header buttons
	*/
	for (let diaryHeaderElement of document.querySelectorAll(`.students-journal-header-links`)) {
		diaryHeaderElement.removeChild(diaryHeaderElement.children[0]); // Remove the timetable button
		
		/* let legendButton = document.createElement(`a`);
		legendButton.href = `javascript:void(0);`;
		legendButton.className = `open-legend`;
		legendButton.innerText = `Apzīmējumi`; */
		// I'm gonna implement the legend button at a later date

		let timetableButton = document.createElement(`a`);
		timetableButton.href = `javascript:void(0);`;
		timetableButton.className = `open-timetable`;
		timetableButton.innerText = `Stundu laiki`;
		// The reason we created the timetable button again even though it was already there is
		// to remove all event listeners so the scripts in /animations/ directory can have an easier life

		diaryHeaderElement.insertBefore(timetableButton, diaryHeaderElement.children[0]);
		//diaryHeaderElement.insertBefore(legendButton, diaryHeaderElement.children[0]);
	}

	/*
		Add modal background element
	*/
	let modalBgElement = document.createElement(`div`);
	modalBgElement.className = `modal-background`;
	document.body.appendChild(modalBgElement);

	/*
		Load the timetable data from the very beginning
	*/
	fetch(`https://my.e-klase.lv/Family/LessonTimes`).then((response) => {
		response.text().then((res) => {
			let data = new DOMParser().parseFromString(res, `text/html`);
			let timetableElement = document.querySelector(`.lesson-times-modal .modal-body .timetable`);

			for (let item of data.querySelectorAll(`.timetible-item`)) {
				timetableElement.innerHTML +=
					`<div class="timetible-item">
						<div class="name">
							<span>
								${item.children[0].innerText.trim()}
							</span>
						</div>
						<div class="time">
							${item.children[1].innerText.trim()}
						</div>
					</div>`; 
					// Unfortunately the misspelled "timetible" can't be changed to "timetable" because the CSS breaks too much then
					// It's still somewhat relying on the original E-klase CSS code
			}

			timetableElement.classList.remove(`loading-animation-container`);
		});
	});

	/*
		Remove the different column colors from the table header in diary when there is no data
	*/
	for (let i of document.querySelectorAll(`table.lessons-table`)) {
		if (i.children[1].children[0].children[0].className.includes(`no-data`)) {
			for (let o of i.querySelectorAll(`thead tr td`)) {
				o.innerHTML = ``;
				o.style.background = `var(--background-middle-dark-color)`;
			}
		}
	}

	/*
		Make the grade column wider when necessary
	*/
	let gradeColumnWidth = 110; // 110px is the default width
	for (let element of document.querySelectorAll(`.score.open-mark-file`)) {
		if (element.clientWidth + 12 > gradeColumnWidth) {
			gradeColumnWidth = element.clientWidth + 12; // Add 12 because the padding on both sides is 6px
		}
	}
	for (let element of document.querySelectorAll(`.lessons-table td.score`)) {
		element.style.width = `${gradeColumnWidth}px`;
	}

	/*
		Resize the answering container to fit the content
	*/
	for (let element of document.querySelectorAll(`.home-task-answer-widget-container`)) {
		tryResizingAnswerWidget(element);
	}

	/*
		Remove
	*/
	for (let element of document.querySelectorAll(`.score.open-mark-file`)) {
		element.addEventListener(`click`, () => {
			tryMinimizingGradePopup();
		});
	}

	/*
		Add the custom calendar (I know the code is awful, I might clean it up at some point but no guarantees)
	*/
	if (document.querySelector(`.main-eklase-content`) !== null) {
		const MONTHS = [`Janvāris`, `Februāris`, `Marts`, `Aprīlis`, `Maijs`, `Jūnijs`, `Jūlijs`, `Augusts`, `Septembris`, `Oktobris`, `Novembris`, `Decembris`];

		// This function updates the calendar view every time the month is changed
		const updateMonth = (change) => {
			if (change < 0) {
				monthInCalendar--;
				if (monthInCalendar === -1) {
					monthInCalendar = 11;
					yearInCalendar--;
				}
				yPos -= 180;
			} else if (change > 0) {
				monthInCalendar++;
				if (monthInCalendar === 12) {
					monthInCalendar = 0;
					yearInCalendar++;
				}
				yPos += 180;
			}
			scrollableEl.style.bottom = `${yPos}px`;

			if (scrollableEl.querySelector(`[data-pos="${monthInCalendar}-${yearInCalendar}"]`) === null) {
				let monthEl = document.createElement(`div`);
				monthEl.setAttribute(`data-pos`, `${monthInCalendar}-${yearInCalendar}`);
				monthEl.style.bottom = `${-yPos}px`;

				// Magic
				let currentDate = new Date();
				let d = new Date();
				d.setFullYear(yearInCalendar);
				d.setMonth(monthInCalendar);
				d.setDate(1);
				d.setDate(-(d.getDay() === 0 ? 6 : d.getDay() - 1) + 1); // Sets d to the first date of the first week in that month

				for (let i = 0; i <= 6; i++) {
					let weekEl = document.createElement(`div`);
					weekEl.className = `calendar-week`;
					weekEl.style.top = `${30 * i}px`;
					weekEl.addEventListener(`click`, () => {
						window.location.href = `/Family/Diary?Date=${d.getDate()}.${d.getMonth()}.${d.getFullYear()}.`;
					});

					for (let o = 0; o < 7; o++) {
						let dayEl = document.createElement(`p`);
						dayEl.innerText = d.getDate().toString();
						if (d.getMonth() !== monthInCalendar) {
							dayEl.classList.add(`not-in-month`);
						}
						if (d.getDate() === currentDate.getDate() && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
							weekEl.classList.add(`current`);
						}
						
						weekEl.appendChild(dayEl);
						d.setDate(d.getDate() + 1);
					}

					monthEl.appendChild(weekEl);
				}

				scrollableEl.appendChild(monthEl);
			}

			monthIndicatorEl.style.opacity = `0`;
			setTimeout(() => {
				monthIndicatorEl.innerText = `${MONTHS[monthInCalendar]} ${yearInCalendar}`;
				monthIndicatorEl.style.opacity = `1`;
			}, 100);
		}

		let monthInCalendar, yearInCalendar;

		let urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get(`Date`) !== null) {
			let urlDate = urlParams.get(`Date`).split(`.`);

			monthInCalendar = parseInt(urlDate[1]) - 1;
			yearInCalendar = parseInt(urlDate[2]);
		} else {
			let currentDate = new Date();
			monthInCalendar = currentDate.getMonth();
			yearInCalendar = currentDate.getFullYear();
		}

		let yPos = 0;

		let calendarEl = document.createElement(`div`);
		calendarEl.className = `calendar desktop-top closed`;
		calendarEl.style.display = `none`;

		let headerEl = document.createElement(`div`);
		headerEl.className = `calendar-header`;
		calendarEl.appendChild(headerEl);

		let previousMonthBtn = document.createElement(`button`);
		previousMonthBtn.className = `previous-month`;
		previousMonthBtn.addEventListener(`click`, () => {
			updateMonth(-1);
		});
		headerEl.appendChild(previousMonthBtn);

		let monthIndicatorEl = document.createElement(`p`);
		monthIndicatorEl.className = `month`;
		headerEl.appendChild(monthIndicatorEl);

		let nextMonthBtn = document.createElement(`button`);
		nextMonthBtn.className = `next-month`;
		nextMonthBtn.addEventListener(`click`, () => {
			updateMonth(1);
		});
		headerEl.appendChild(nextMonthBtn);
		
		let bodyEl = document.createElement(`div`);
		bodyEl.className = `calendar-body`;
		calendarEl.appendChild(bodyEl);

		let scrollableEl = document.createElement(`div`);
		scrollableEl.className = `calendar-scrollable`;
		bodyEl.appendChild(scrollableEl);

		let parentEl = document.querySelector(`.main-eklase-content`);
		parentEl.appendChild(calendarEl);

		updateMonth(0);

		let topCalendarHolder = document.querySelectorAll(`.week-selector .selected-period`)[0];
		topCalendarHolder.addEventListener(`click`, () => {
			if (calendarEl.style.display === `none`) {
				calendarEl.style.display = `block`;

				setTimeout(() => {
					calendarEl.style.opacity = `1`;
					calendarEl.style.transform = `translateY(0)`;
				}, 20);
			} else {
				calendarEl.style.opacity = `0`;
				calendarEl.style.transform = `translateY(10px)`;

				setTimeout(() => {
					calendarEl.style.display = `none`;
				}, 200);
			}
		});
	}
});

const tryResizingAnswerWidget = (element) => {
	if (element.querySelector(`.Widget`) !== null) {
		let elementHeight = Math.ceil(element.querySelector(`p`).innerText.length / 50) * 18 + 34;
		element.style.height = `${elementHeight}px`;
		element.children[0].style.height = `${elementHeight}px`;
	} else {
		setTimeout(() => tryResizingAnswerWidget(element), 20);
	}
}

const tryMinimizingGradePopup = () => {
	if (document.querySelector(`.Modal.modal-evaluation-file .Modal__Body .evaluation-card`) !== null) {
		let emptyGraphEl = document.querySelector(`.Modal.modal-evaluation-file .EmptyGraph`);
		if (emptyGraphEl != null) {
			emptyGraphEl.parentElement.parentElement.removeChild(emptyGraphEl.parentElement);
		}
	} else {
		setTimeout(() => tryMinimizingGradePopup(), 20);
	}
}