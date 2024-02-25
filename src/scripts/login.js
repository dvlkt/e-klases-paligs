window.addEventListener("pageLoading", () => {
	/**
	 * Add the "Remember me" check
	 */
	// Check if the login box is on the page
	if (document.querySelector(".layout_index__aside .login__form, form.li-LoginForm, .MainBody .InputForm") !== null) {
		let loginElementForm = document.querySelector(".layout_index__aside .login__form, .li-LoginInputContainer_Layer form.li-LoginForm, .MainBody .InputForm form");
		let loginButton = loginElementForm.querySelector(".li-LoginInputContainer_Layer .li-LoginForm_Row:nth-child(3), .InputForm_ButtonContainer, button");

		let showPasswordButtonElement = document.createElement("div");
		showPasswordButtonElement.className = "show-password-btn";
		loginElementForm.querySelector(".password-field .form-control-wrapper, .li-LoginForm_Row:nth-child(3), .InputForm_Row:nth-child(2)").appendChild(showPasswordButtonElement);

		showPasswordButtonElement.addEventListener("click", () => {
			let passwordInputElement = loginElementForm.querySelector("input[placeholder='Parole']");

			if (passwordInputElement.type === "password") {
				passwordInputElement.type = "text";
				showPasswordButtonElement.classList.add("active");
			} else {
				passwordInputElement.type = "password";
				showPasswordButtonElement.classList.remove("active");
			}
		});

		let checkboxElement = document.createElement("div");
		checkboxElement.className = "checkbox";
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

	/**
	 * Save and autofill the username & password if the "Remember me" checkbox has been checked
	 */
	if (document.querySelector(".layout_index__aside .login__form, form.li-LoginForm, .MainBody .InputForm") !== null) {
		// Autofill
		chrome.storage.sync.get(["loginDetails"], (res) => {
			let usernameInput = document.querySelector(".layout_index__aside .login__form input[type='text'], form.li-LoginForm [placeholder='Lietotājvārds'], .InputForm_Row [placeholder='Lietotājs']");
			let passwordInput = document.querySelector(".layout_index__aside .login__form input[type='password'], form.li-LoginForm [placeholder='Parole'], .InputForm_Row [placeholder='Parole']")
			
			// Apply the information
			usernameInput.value = res.loginDetails?.username || ``;
			passwordInput.value = res.loginDetails?.password || ``;

			// Make the send button clickable
			let button = document.querySelector(".layout_index__aside .login__form button");
			if (button !== null) {
				button.removeAttribute("disabled");
			}

			// If there is any information saved, that means the checkbox should be checked as well
			if (res.loginDetails !== null && (res.loginDetails?.username !== "" || res.loginDetails?.username !== "")) {
				document.querySelector("label[for='rememberPassword']").click();
			}
		});

		// Saving
		document.querySelector(".layout_index__aside .login__form .btn, form.li-LoginForm button.li-ButtonDefault-login, .InputForm_ButtonContainer .ButtonDefault").addEventListener("click", () => {
			if (document.querySelector("#rememberPassword").checked) {
				chrome.storage.sync.set({
					loginDetails: {
						username: document.querySelector(".layout_index__aside .login__form input[type='text'], form.li-LoginForm [placeholder='Lietotājvārds'], .InputForm_Row [placeholder='Lietotājs']").value,
						password: document.querySelector(".layout_index__aside .login__form input[type='password'], form.li-LoginForm [placeholder='Parole'], .InputForm_Row [placeholder='Parole']").value
					}
				});
			} else {
				chrome.storage.sync.set({
					loginDetails: {
						username: "",
						password: ""
					}
				});
			}
		});
	}
});