window.addEventListener(`pageLoading`, () => {
	let isFamilyPlanActivated = false;
	if (document.querySelector(`.copyright`) !== null &&
		document.querySelector(`.copyright`).innerHTML.toLowerCase().includes(`ģimenes`)) {
		
		isFamilyPlanActivated = true;
	}

	if (!isFamilyPlanActivated) {
		// Change the "Pārskati" link in the header
		if (document.querySelector(`.header-second-menu-item.item-analytics`) !== null) {
			document.querySelector(`.header-second-menu-item.item-analytics a`).href = `/Family/ReportPupilMarks/Get`;
		}

		if (window.location.href.includes(`ReportPupilMarks`)) {
			// Remove the tabs in analytics
			document.querySelector(`.analytic ul.nav-tabs`).style.display = `none`;

			// Remove the mode switcher in analytics
			if (window.location.href.includes(`Get`)) document.querySelector(`.analytics-ratings-table-intro-right`).style.display = `none`;
		}
	}
});