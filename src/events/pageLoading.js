let pageLoadingEvent = new Event(`pageLoading`);
document.addEventListener(`readystatechange`, (event) => {
	if (document.readyState === `interactive`) {
		window.dispatchEvent(pageLoadingEvent);
	}
});