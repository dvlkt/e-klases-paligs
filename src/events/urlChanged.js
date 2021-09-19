// Most of the code is from here: https://phpcoder.tech/detect-url-change-in-javascript-without-refresh/
let urlChangedEvent = new Event(`urlChanged`);
let lastUrl = location.href;
new MutationObserver(() => {
	const url = location.href;
	if (url !== lastUrl) {
		lastUrl = url;
		window.dispatchEvent(urlChangedEvent);
	}
}).observe(document, { subtree: true, childList: true });

document.addEventListener(`pageLoading`, () => {
	window.dispatchEvent(urlChangedEvent);
});