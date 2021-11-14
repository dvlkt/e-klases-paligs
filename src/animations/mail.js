let areEventListenersAddedToSidebarMenu = false;
const tryAddingMailAnimations = () => {
	if (!window.location.href.includes(`/SPA/Family#/mail`)) {
		return;
	}

	if (document.querySelector(`.communication-container .container .mailbox-data .wrapper`).children[1].innerHTML.includes(`Loading`)) {
		setTimeout(tryAddingMailAnimations, 20);
	} else {
		if (!areEventListenersAddedToSidebarMenu) {
			areEventListenersAddedToSidebarMenu = true;
			
			for (let element of document.querySelectorAll(`.NavItem`)) {
				element.addEventListener(`click`, () => {
					tryAddingMailAnimations();
				});
			}
		}

		/*
			Remove and add the mail action button in order to remove all event listeners
		*/
		let mailActionButtonWrapperElement = document.querySelector(`.MailActions`);
		let mailActionButtonHTML = `${mailActionButtonWrapperElement.innerHTML.split(`</button>`)[0]}</button>`;

		mailActionButtonWrapperElement.removeChild(mailActionButtonWrapperElement.children[0]);
		mailActionButtonWrapperElement.innerHTML += mailActionButtonHTML;
		mailActionButtonWrapperElement.innerHTML += `<ul
														class="MailActions__ActionList">
														
														<li
															class="MailActions__ActionOuter MailActions__ActionOuter--disabled">
															
															<button
																class="MailActions__ActionInner MailActions__ActionInner--delete">

																Dzēst atzīmētās vēstules
															</button>
														</li>
														<li
															class="MailActions__ActionOuter">
															
															<button
																class="MailActions__ActionInner MailActions__ActionInner--markAllAsRead">

																Atzīmet visas kā lasītas
															</button>
														</li>
														<li
															class="MailActions__ActionOuter MailActions__ActionOuter--disabled">
															
															<button
																class="MailActions__ActionInner MailActions__ActionInner--markAsRead">
																
																Atzīmēt izvēlētās kā lasītas
															</button>
														</li>
													</ul>`;
		
		/*
			Add an animation to the mail action dropdown
		*/
		let mailActionButtonElement = document.querySelector(`.MailActions__ToggleButton`);
		let isMailActionDropdownOpen = false;
		mailActionButtonElement.addEventListener(`click`, () => {
			if (document.querySelector(`ul.MailActions__ActionList`) !== null) {
				setTimeout(() => {
					let dropdown = document.querySelector(`ul.MailActions__ActionList`);

					if (!isMailActionDropdownOpen) {
						isMailActionDropdownOpen = true;

						dropdown.style.display = `block`;

						setTimeout(() => {
							dropdown.style.opacity = `1`;
							dropdown.style.transform = `translateY(0)`;
						}, 20);
					} else {
						isMailActionDropdownOpen = false;

						dropdown.style.opacity = `0`;
						dropdown.style.transform = `translateY(-10px)`;

						setTimeout(() => {
							dropdown.style.display = `none`;
						}, 200);
					}
				}, 20);
			}
		});

		/*
			Add an animation to the mail list when it loads
		*/
		if (document.querySelector(`.MessageItem`) !== null) {
			showMailListItem(0);
		} else {
			document.querySelector(`.Folder__NoMessages`).style.opacity = `1`;
		}
		document.querySelector(`.FetchMore__Text`).addEventListener(`click`, () => {
			tryAddingAdditionalMailLoadingAnimation();
		});
	}
}
const tryAddingAdditionalMailLoadingAnimation = () => {
	if (document.querySelector(`.ButtonIcon--loading.Folder__Loading`) === null) {
		showMailListItem(0);
		document.querySelector(`.FetchMore__Text`).addEventListener(`click`, () => {
			tryAddingAdditionalMailLoadingAnimation();
		});
	} else {
		setTimeout(tryAddingAdditionalMailLoadingAnimation, 20);
	}
}
const showMailListItem = (index) => {
	if (document.querySelectorAll(`.MessageItem`)[index] !== undefined) {
		if (document.querySelectorAll(`.MessageItem`)[index].style.opacity === `1`) {
			showMailListItem(index + 1);
		} else {
			document.querySelectorAll(`.MessageItem`)[index].style.opacity = `1`;
			setTimeout(() => showMailListItem(index), 4);
		}
	} else {
		document.querySelector(`.FetchMore__Text`).style.opacity = `1`;
	}
}

window.addEventListener(`pageLoading`, () => {
	tryAddingMailAnimations();
});
window.addEventListener(`urlChanged`, () => {
	tryAddingMailAnimations();
});