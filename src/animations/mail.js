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
			
			for (let element of document.querySelectorAll(`.NavItem, .mail-list-view-header .search-button`)) {
				element.addEventListener(`click`, () => {
					tryAddingMailAnimations();
				});
			}
		}

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
		document.querySelector(`.mail-list-view-header .MailSearch__Input`).addEventListener(`focus`, () => {
			document.querySelector(`.mail-list-view-header .close-button`).addEventListener(`click`, () => {
				tryAddingAdditionalMailLoadingAnimation();
			});
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
		if (document.querySelector(`.FetchMore__Text`) !== undefined) {
			document.querySelector(`.FetchMore__Text`).style.opacity = `1`;
		} else {
			setTimeout(() => showMailListItem(index), 4);
		}
	}
}

window.addEventListener(`pageLoading`, () => {
	tryAddingMailAnimations();
});
window.addEventListener(`urlChanged`, () => {
	tryAddingMailAnimations();
});