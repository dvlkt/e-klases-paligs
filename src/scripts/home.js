window.addEventListener(`pageLoading`, () => {
	if (document.querySelector(`.ekl__header`) !== null) { // If is in the home page
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

window.addEventListener(`pageLoaded`, () => {
	/*
		Add the custom login help modal
	*/
	if (document.querySelector(`aside.hidden-xs .login-form`) !== null) {
		document.querySelector(`aside.hidden-xs .login-links .special-link .title`).innerText = `Neizdodas pieslēgties?`;

		let modalWrapper = document.createElement(`div`);
		modalWrapper.innerHTML += `
			<div class="modal modal-technical login-help-modal">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<a href="#" class="modal-close" data-dismiss="modal"></a>
							<h1>Neizdodas pieslēgties?</h1>

							<h3>Lietotājvārds</h3>
							<p>Skolēnam un vecākiem lietotājvārds ir skolēna personas kods (xxxxxx-xxxxx). Katram lietotājam jāpieslēdzas ar savu paroli.</p>
							<p>Darbiniekiem - savs personas kods.</p>

							<h3>Parole</h3>
							<p>Lai saņemtu jaunu paroli, sūtiet SMS no konkrētā lietotāja (skolēns, mamma, tētis) telefona ar tekstu: EK xxxxxx-xxxxx uz numuru 1800 (xxxxxx-xxxxx vietā jāraksta skolēna personas kods).</p>
							<p>Ja telefona numurs nav reģistrēts E-klasē, sazinieties ar klases audzinātāju, lai iegūtu pieejas paroli E-klasei.</p>
							<p>Darbiniekiem paroli atjauno un izsniedz skolas virslietotājs.</p>

							<h3>Tehniskais atbalsts</h3>
							<p>Ja vēl joprojām neizdodas pieslēgties, rakstiet mums, izmantojot <a href="https://my.e-klase.lv/Pieteikums_tehnisk%C4%81_atbalsta_dienestam">saziņas formu</a>.</p>
						</div>
					</div>
				</div>
			</div>`;
		if (document.querySelector(`.modal-background`) === null) {
			modalWrapper.innerHTML += `<div class="modal-background"></div>`;
		}
		document.body.appendChild(modalWrapper);

		let modal = document.querySelector(`.login-help-modal`);
		let modalBg = document.querySelector(`.modal-background`);

		let button = document.querySelectorAll(`.login-form .form-content .special-link .title`)[1];
		button.addEventListener(`click`, () => {
			modal.style.display = `block`;
			modalBg.style.display = `block`;

			// Resize
			modal.style.height = `${modal.children[0].children[0].children[0].clientHeight}px`;
			modal.style.top = `calc(50vh - ${modal.children[0].children[0].children[0].clientHeight / 2}px)`;

			setTimeout(() => {
				modal.style.opacity = `1`;
				modal.style.transform = `none`;
				modalBg.style.opacity = `1`;
			}, 50);
		});

		let closeButton = document.querySelector(`.login-help-modal .modal-close`);
		closeButton.addEventListener(`click`, () => {
			modal.style.opacity = `0`;
			modal.style.transform = `scale(0.75)`;
			modalBg.style.opacity = `0`;

			setTimeout(() => {
				modal.style.display = `none`;
				modalBg.style.display = `none`;
			}, 200);
		});
		modalBg.addEventListener(`click`, () => {
			modal.style.opacity = `0`;
			modal.style.transform = `scale(0.75)`;
			modalBg.style.opacity = `0`;

			setTimeout(() => {
				modal.style.display = `none`;
				modalBg.style.display = `none`;
			}, 200);
		});
	}
});