window.addEventListener(`pageLoading`, () => {
	// Edit the footer links
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
});