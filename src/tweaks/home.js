window.addEventListener(`pageLoading`, () => {
	if (document.querySelector(`.ekl__header`) !== null) { // If is in the home page
		
		/*
			Add the "remember me" checkbox
		*/
		let loginElementForm = document.querySelector(`aside.hidden-xs .login-form .form-content form`);
		let loginButton = loginElementForm.querySelector(`button`);

		let checkboxElement = document.createElement(`div`);
		checkboxElement.className = `checkbox`;
		checkboxElement.innerHTML = `
			<div class="print-checkbox">
				<input id="rememberPassword" type="checkbox" class="css-checkbox">
				<label class="css-label" for="rememberPassword">
					Atcerēties mani
				</label>
			</div>
		`;

		loginElementForm.insertBefore(checkboxElement, loginButton);
		/*
		<div class="checkbox text-xs-center">
							<div class="print-checkbox">
								<input id="highlightNegatives2" type="checkbox" class="css-checkbox highlight-negatives">
								<label class="css-label" for="highlightNegatives2">
									Izcelt negatīvās atzīmes
								</label>
							</div>
						</div>
		*/


		/*
			Add the stickied class to the header when needed
		*/

	}


	/*
		In the home page on mobile, move the login box to the top
	*/
	if (window.location.pathname === `/`) {
		if (document.body.clientWidth <= 767) {
			let loginElement = document.querySelector(`aside.hidden-xs`);
			loginElement.parentNode.insertBefore(loginElement, loginElement.parentNode.firstChild);
		}
	}
});