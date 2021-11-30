window.addEventListener(`pageLoading`, () => {
	/*
		 Add the "Remember me" checkbox
	*/
	// Check if the login box is on the page
	if (document.querySelector(`.login-form, form.li-LoginForm`) !== null) {
		let loginElementForm = document.querySelector(`aside.hidden-xs .login-form .form-content form, .li-LoginInputContainer_Layer form.li-LoginForm`);
		let loginButton = loginElementForm.querySelector(`.li-LoginInputContainer_Layer .li-LoginForm_Row:nth-child(3), button`);

		let showPasswordButtonElement = document.createElement(`div`);
		showPasswordButtonElement.className = `show-password-btn`;
		loginElementForm.querySelector(`.form-group.relative:nth-child(2), .li-LoginForm_Row:nth-child(3)`).appendChild(showPasswordButtonElement);

		showPasswordButtonElement.addEventListener(`click`, () => {
			let passwordInputElement = loginElementForm.querySelector(`input[placeholder="Parole"]`);

			if (passwordInputElement.type === `password`) {
				passwordInputElement.type = `text`;
				showPasswordButtonElement.classList.add(`active`);
			} else {
				passwordInputElement.type = `password`;
				showPasswordButtonElement.classList.remove(`active`);
			}
		});

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
	}

	/*
		Save and autofill the username & password if the "Remember me" checkbox has been checked
	*/
	if (document.querySelector(`.login-form, form.li-LoginForm`) !== null) {

		// Autofill
		chrome.storage.sync.get([`loginDetails`], (res) => {
			// For some reason when the page loads, the type of the password input is "private", not "password". Let's change that!
			if (document.querySelectorAll(`.login-form .form-control[type="private"]`)[1] !== undefined) {
				document.querySelectorAll(`.login-form .form-control[type="private"]`)[1].type = `password`;
			}
			if (document.querySelector(`form.li-LoginForm [type="private"]`) !== undefined) {
				document.querySelector(`form.li-LoginForm [type="private"]`).type = `password`;
			}

			// Apply the password
			if (document.querySelector(`.login-form`) !== null) {
				document.querySelectorAll(`.login-form .form-control[type="text"]`)[1].value = res.loginDetails?.username || ``;
				document.querySelector(`.login-form .form-control[type="password"]`).value = res.loginDetails?.password || ``;

			} else if (document.querySelector(`form.li-LoginForm`) !== null) {
				document.querySelector(`form.li-LoginForm [placeholder="Lietotājvārds"]`).value = res.loginDetails?.username || ``;
				document.querySelector(`form.li-LoginForm [placeholder="Parole"]`).value = res.loginDetails?.password || ``;
			}

			// If there is any information saved, that means the checkbox should be checked as well
			if (res.loginDetails !== null && (res.loginDetails?.username !== `` || res.loginDetails?.username !== ``)) {
				document.querySelector(`label[for="rememberPassword"]`).click();
			}
		});

		// Saving
		document.querySelectorAll(`.login-form .btn`)[1].addEventListener(`click`, () => {
			if (document.querySelector(`#rememberPassword`).checked) {
				chrome.storage.sync.set({
					loginDetails: {
						username: document.querySelectorAll(`.login-form .form-control[type="text"]`)[1].value,
						password: document.querySelector(`.login-form .form-control[type="password"]`).value
					}
				});
			} else {
				chrome.storage.sync.set({
					loginDetails: {
						username: ``,
						password: ``
					}
				});
			}
		});
	}
});