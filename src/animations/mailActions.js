// This code checks if the mail layout has been loaded every 20 milliseconds until it has and then it applies the animation
const tryAddingMailActionDropdownAnimation = () => {
	if (!window.location.href.includes(`/SPA/Family#/mail`)) {
		return;
	}

	if (document.querySelector(`.communication-container .container .mailbox-data .wrapper`).children[1].innerHTML.includes(`Loading`)) {
		setTimeout(tryAddingMailActionDropdownAnimation, 20);
	} else {
		let toggleButton = document.querySelector(`span button.MailActions__ToggleButton`);

		toggleButton.addEventListener(`click`, () => {
			if (document.querySelector(`ul.MailActions__ActionList`) === null) {

			} else {
				setTimeout(() => {
					let dropdown = document.querySelector(`ul.MailActions__ActionList`);

					dropdown.style.opacity = `1`;
					dropdown.style.transform = `translateY(0)`;
				}, 200);
			}
		});
	}
}
window.addEventListener(`pageLoading`, () => {
	tryAddingMailActionDropdownAnimation();
});
window.addEventListener(`urlChanged`, () => {
	tryAddingMailActionDropdownAnimation();
});