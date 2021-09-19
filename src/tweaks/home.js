window.addEventListener(`pageLoading`, () => {
	// In the home page on mobile, move the login box to the top
	if (window.location.pathname === `/`) {
		if (document.body.clientWidth <= 767) {
			let loginElement = document.querySelector(`aside.hidden-xs`);
			loginElement.parentNode.insertBefore(loginElement, loginElement.parentNode.firstChild);
		}
	}
});