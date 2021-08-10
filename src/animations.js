// Top link animations
for (let i of document.querySelectorAll(`.header-first-menu-item`)) {
	if (i.querySelector(`.header-first-submenu`) !== null) {
		let submenu = i.querySelector(`.header-first-submenu`);

		const onMouseEnter = () => {
			if (submenu.style.display !== `block`) {
				submenu.style.display = `block`;
		
				setTimeout(() => {
					submenu.style.opacity = `1`;
					submenu.style.transform = `translateY(0px)`;
				}, 50);
			}
		}
		const onMouseOut = () => {
			if (!i.matches(`:hover`) &&
				!submenu.matches(`:hover`)) {

				submenu.style.opacity = `0`;
				submenu.style.transform = `translateY(-10px)`;
		
				setTimeout(() => {
					submenu.style.display = `none`;
				}, 200);
			}
		}

		i.addEventListener(`mouseenter`, onMouseEnter);
		i.addEventListener(`mouseout`, onMouseOut);
		submenu.addEventListener(`mouseenter`, onMouseEnter);
		submenu.addEventListener(`mouseout`, onMouseOut);
	}
}

// Calendar popup animations
if (document.location.href.includes(`/Family/Diary`)) {
	for (let calendarButton of document.querySelectorAll(`.selected-period.hidden-xs`)) {
		let calendar = calendarButton.parentElement.children[5];

		calendarButton.addEventListener(`click`, () => {
			if (calendarButton.parentElement.className.includes(`calendar-open`)) {
				calendar.style.opacity = `0`;
				calendar.style.transform = `translateY(-10px)`;
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