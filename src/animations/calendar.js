window.addEventListener(`pageLoading`, () => {
	if (document.location.href.includes(`/Family/Diary`)) {
		// Desktop
		for (let calendarButton of document.querySelectorAll(`.selected-period.hidden-xs`)) {
			let calendar = calendarButton.parentElement.children[5];

			calendarButton.addEventListener(`click`, () => {
				if (calendarButton.parentElement.className.includes(`calendar-open`)) {
					calendar.style.opacity = `0`;
					calendar.style.transform = `translateY(10px)`;
					setTimeout(() => {
						calendar.style.display = `none`;
					}, 200);
				} else {
					calendar.style.display = `block`;
					setTimeout(() => {
						calendar.style.opacity = `1`;
						calendar.style.transform = `translateY(0)`;
					}, 50);
				}
			});
		}

		// Mobile
		for (let calendarButton of document.querySelectorAll(`.selected-period-mobile.calendar-toggle`)) {
			let calendar = calendarButton.parentElement.parentElement.children[5];

			calendarButton.addEventListener(`click`, () => {
				if (calendarButton.parentElement.parentElement.className.includes(`calendar-open`)) {
					calendar.style.opacity = `0`;
					calendar.style.transform = `translateY(10px)`;
					setTimeout(() => {
						calendar.style.display = `none`;
					}, 200);
				} else {
					calendar.style.display = `block`;
					setTimeout(() => {
						calendar.style.opacity = `1`;
						calendar.style.transform = `translateY(0)`;
					}, 50);
				}
			});
		}
	}
});