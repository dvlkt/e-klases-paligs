// Rewrite the focus/unfocus handlers for the top links for a better popup animation
for (let i of document.querySelectorAll(`.header-first-menu-item`)) {
	let submenu = i.querySelector(`.header-first-submenu`);

	i.addEventListener(`onmouseenter`, () => {
		submenu.style.display = "block";
		submenu.style.opacity = "1";
		submenu.style.transform = "scale(1) translateY(0)";
	});
	i.addEventListener(`onmouseout`, () => {
		submenu.style.opacity = `0`;
		submenu.style.transform = `scale(0.75) translateY(-30px)`;

		setTimeout(() => submenu.style.display = `none`, 200);
	});

	/* i.setAttribute(`onclick`, `alert("lol")`);
	i.setAttribute(`onmouseenter`, `() => {
		let submenu = i.querySelector(".header-first-submenu");
		submenu.style.display = "block";
		submenu.style.opacity = "1";
		submenu.style.transform = "scale(1) translateY(0)";
	}`);
	i.setAttribute(`onmouseleave`, `() => {
		let submenu = i.querySelector(".header-first-submenu");
		submenu.style.opacity = "0";
		submenu.style.transform = "scale(0.75) translateY(-30px)";

		setTimeout(() => submenu.style.display = "none", 200);
	}`);
 */
	/* console.log(i);
	i.addEventListener(`onmouseenter`, );
	i.addEventListener(`onmouseout`, () => {
		submenu.style.opacity = `0`;
		submenu.style.transform = `scale(0.75) translateY(-30px)`;

		setTimeout(() => submenu.style.display = `none`, 200);
	}); */
}

// Edit the bottom copyright text
document.querySelector(`.copyright`).innerHTML = 
`SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}
<br />
Aktivizēts <i>E-klases Modernais Dizains</i>`;