window.addEventListener(`pageLoading`, () => {
	/*
		Edit the footer links
	*/
	if (document.querySelector(`footer nav.footer-nav ul`) !== null) {
		document.querySelector(`footer nav.footer-nav ul`).innerHTML = `
			<li class="footer-nav-item">
				<a href="/Family/Settings/Profiles">Iestatījumi</a>
			</li>
			<li class="footer-nav-item">
				<a href="/Family/FamilyPlanInformation">Ģimenes komplekts</a>
			</li>
			<li class="footer-nav-item">
				<a href="/Family/TechnicalSupport">Tehniskais atbalsts</a>
			</li>`;
	}

	
	/*
		Edit the bottom copyright text
	*/
	if (document.querySelector(`.copyright`) !== null) {
		if (document.querySelector(`.ekl__header`) !== null) { // If on the homepage
			document.querySelector(`.copyright`).innerHTML = `&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}`;
		} else {
			document.querySelector(`.copyright`).innerHTML =
				`&copy; SIA “Izglītības sistēmas” 2004-${new Date().getFullYear()}
			<br />
			Aktivizēts <i>E-klases Palīgs</i>`;
		}
	}
});