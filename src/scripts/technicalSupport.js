window.addEventListener(`pageLoading`, () => {
	if (!window.location.href.includes(`TechnicalSupport`)) {
		return;
	}

	/*
		Add the warning popup
	*/
	let modalEl = document.createElement("div");
	modalEl.className = "modal modal-technical technical-support-warning-modal";
	modalEl.role = "dialog";
	modalEl.style.display = "block";
	modalEl.style.opacity = "1";
	modalEl.style.transform = "scale(1)";
	modalEl.innerHTML += `
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<a href="#" class="modal-close" data-dismiss="modal"></a>
					<h1>Vai Tev tiešām vajag tehnisko atbalstu?</h1>
					
					<br />

					<h3>Tev ir ieinstalēts E-klases palīgs.</h3>
					<p>E-klases Palīgs izmaina ļoti daudz ko par E-klases funkcionalitāti.</p>
					<p>Ja Tev ir kāda problēma ar E-klasi, tad ir iespēja, ka tā ir E-klases Palīga vaina.</p>
					<p>Pamēģini izslēgt E-klases Palīgu un tad mēģināt darīt savu darbību vēlreiz.</p>

					<br />

					<h3>Šī lapa ir saziņai tikai ar E-klases tehniskā atbalsta dizainu.</h3>
					<p>Ja Tev ir kādi jautājumi par mācību procesu, tad tas ir jāuzdod skolotājiem.</p>

					<br />

					<h3>Eksistē arī Biežāk uzdoto jautājumu lapa.</h3>
					<p>Varbūt Tavs jautājums jau ir atbildēts pie <a href="https://my.e-klase.lv/Family/FAQ/Student">Biežāk uzdotajiem jautājumiem</a>!</p>

					<br />

					<button class="modal-button">Sapratu!</button>
				</div>
			</div>
		</div>`;
	document.body.appendChild(modalEl);
	
	let modalBackgroundEl = document.createElement("div");
	modalBackgroundEl.className = "modal-background";
	document.body.appendChild(modalBackgroundEl);

	/*
		Show the modal background
	*/
	modalBackgroundEl.style.display = `block`;
	modalBackgroundEl.style.opacity = `0.5`;
});