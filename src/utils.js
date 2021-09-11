// Add the locationchange event, code is from here: https://phpcoder.tech/detect-url-change-in-javascript-without-refresh/
let lastUrl = location.href;
new MutationObserver(() => {
	const url = location.href;
	if (url !== lastUrl) {
		lastUrl = url;
		window.dispatchEvent(new Event(`locationchange`));
	}
}).observe(document, { subtree: true, childList: true });