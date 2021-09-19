window.addEventListener(`pageLoading`, () => {
	for (let i of document.querySelectorAll(`.header-first-menu-item, .header-second-menu-item`)) {
		if (i.querySelector(`.header-first-submenu, .header-second-submenu`) !== null) {
			let submenu = i.querySelector(`.header-first-submenu, .header-second-submenu`);

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
});