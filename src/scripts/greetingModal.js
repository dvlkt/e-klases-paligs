window.addEventListener(`pageLoading`, () => {
	let div = document.createElement(`div`);
	div.innerHTML += `
		<div class="modal modal-technical greetings-modal" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<a href="#" class="modal-close" data-dismiss="modal"></a>
						<h1>Sveicināts!</h1>

						<br />

						<h3>Tev tagad ir ieinstalēts E-klases palīgs!</h3>
						<p>Tā galvenās priekšrocības:</p>
						<ul>
							<li>Jauns, moderns dizains</li>
							<li>Tumšais režīms</li>
							<li>Statistika par katru nedēļu</li>
							<li>Paroļu saglabāšana sākumlapā</li>
						</ul>

						<br />

						<h3>Vēlies izmainīt kaut ko?</h3>

						<p>Iestatījumi ir pieejami, noklikšķinot uz E-klases Palīga ikonas ekrāna augšējā labajā stūrī!</p>

						<button class="modal-button">Sākt darbu</button>
					</div>
				</div>
			</div>
		</div>`;

	if (document.querySelector(`.modal-background`) === null) {
		div.innerHTML += `<div class="modal-background"></div>`;
	}

	document.body.appendChild(div);
});