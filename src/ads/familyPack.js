familyPlanActivated = false;
if (document.querySelector(`.copyright`).innerHTML.toLowerCase().includes(`ģimenes`)) {
	familyPlanActivated = true;
}

if (!familyPlanActivated) {
	// Change the "Pārskati" link in the header
	if (document.querySelector(`.header-second-menu-item.item-analytics`) !== null) {
		document.querySelector(`.header-second-menu-item.item-analytics a`).href = `/Family/ReportPupilMarks/Get`;
	}

	// Remove the menu for the "Pārskati" link in the header
	if (document.querySelector(`.header-second-menu-item.item-analytics .header-second-submenu`) !== null) {
		document.querySelector(`.header-second-menu-item.item-analytics`).removeChild(document.querySelector(`.header-second-menu-item.item-analytics .header-second-submenu`));
	}

	if (window.location.href.includes(`ReportPupilMarks`)) {
		// Remove the tabs in analytics
		document.querySelector(`.analytic ul.nav-tabs`).style.display = `none`;

		// Remove the mode switcher in analytics
		document.querySelector(`.analytics-ratings-table-intro-right`).style.display = `none`;
	}
}