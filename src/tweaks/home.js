window.addEventListener(`pageLoading`, () => {
	if (document.querySelector(`.ekl__header`) !== null) { // If is in the home page
		
		/*
			Add the "Remember me" checkbox
		*/
		// Check if the login box is on the page
		if (document.querySelector(`.login-form`) !== null) {
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
		}

		/*
			Save and autofill the username & password if the "Remember me" checkbox has been checked
		*/
		if (document.querySelector(`.login-form`) !== null) {

			// Autofill
			chrome.storage.sync.get([`loginDetails`], (res) => {
				// For some reason when the page loads, the type of the password input is "private", not "password". Let's change that!
				if (document.querySelectorAll(`.login-form .form-control[type="private"]`)[1] !== undefined) {
					document.querySelectorAll(`.login-form .form-control[type="private"]`)[1].type = `password`;
				}

				document.querySelectorAll(`.login-form .form-control[type="text"]`)[1].value = res.loginDetails?.username || ``;
				document.querySelector(`.login-form .form-control[type="password"]`).value = res.loginDetails?.password || ``;

				// If there is any information saved, that means the checkbox should be checked as well
				if (res.loginDetails !== null && (res.loginDetails?.username !== `` || res.loginDetails?.username !== ``)) {
					document.querySelector(`label[for="rememberPassword"]`).click();
				}
			});

			// Saving
			document.querySelectorAll(`.login-form .btn`)[1].addEventListener(`click`, () => {
				if (document.querySelector(`#rememberPassword`).checked) {
					chrome.storage.sync.set({ loginDetails: {
						username: document.querySelectorAll(`.login-form .form-control[type="text"]`)[1].value,
						password: document.querySelector(`.login-form .form-control[type="password"]`).value
					}});
				} else {
					chrome.storage.sync.set({ loginDetails: {
						username: ``,
						password: ``
					}});
				}
			});
		}


		/*
			Add the stickied class to the header when needed
		*/
		// Code is sorta from https://www.w3schools.com/howto/howto_js_sticky_header.asp
		let firstHeaderElement = document.querySelector(`.main-header`);
		let secondaryHeaderElement = document.querySelector(`.secondary-header`);
		let secondaryHeaderElementOffset = secondaryHeaderElement.offsetTop;

		window.addEventListener(`scroll`, () => {
			if (window.scrollY > secondaryHeaderElementOffset) {
				firstHeaderElement.setAttribute(`data-is-stickied`, `true`)
				secondaryHeaderElement.setAttribute(`data-is-stickied`, `true`)
			} else {
				firstHeaderElement.setAttribute(`data-is-stickied`, `false`)
				secondaryHeaderElement.setAttribute(`data-is-stickied`, `false`)
			}
		});

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