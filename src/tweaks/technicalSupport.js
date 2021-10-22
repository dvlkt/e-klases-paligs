window.addEventListener(`pageLoading`, () => {
	if (!window.location.href.includes(`TechnicalSupport`)) {
		return;
	}

	/*
		Add the warning popup
	*/
	document.body.innerHTML += `
		<div class="modal modal-technical technical-support-warning-modal" tabindex="-1" role="dialog" style="display: block; opacity: 1; transform: scale(1);">
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
					</div>
				</div>
			</div>
		</div>
		<div class="modal-background"></div>`;

	/*
		Show the modal background
	*/
	document.querySelector(`.modal-background`).style.display = `block`;
	document.querySelector(`.modal-background`).style.opacity = `0.5`;
});