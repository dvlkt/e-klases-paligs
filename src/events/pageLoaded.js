let pageLoadedEvent = new Event(`pageLoaded`);
window.addEventListener(`DOMContentLoaded`, (event) => {
	window.dispatchEvent(pageLoadedEvent);
});