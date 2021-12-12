const setTitle = () => {
	if (window.location.pathname === `/`) {
		document.title = `E-klase`;
	} else if (window.location.href.includes(`/Family/Home`)) {
		document.title = `Sākums | E-klase`;
	} else if (window.location.href.includes(`/Family/Diary`)) {
		document.title = `Dienasgrāmata | E-klase`;
	} else if (window.location.href.includes(`/Family/ReportTest`)) {
		document.title = `Darba pārskats | E-klase`;
	} else if (window.location.href.includes(`/SPA/Family#/mail`)) {
		document.title = `Pasts | E-klase`;
	} else if (window.location.href.includes(`/SPA/Family#/video-communication`)) {
		document.title = `Video saziņa | E-klase`;
	} else if (window.location.href.includes(`/Family/ReportMarkRatings`)) {
		document.title = `Sekmju reitingi | Pārskati | E-klase`;
	} else if (window.location.href.includes(`/Family/ReportMarkTable`)) {
		document.title = `Žurnāli | Pārskati | E-klase`;
	} else if (window.location.href.includes(`/Family/ReportNonAttendances`)) {
		document.title = `Kavējumi | Pārskati | E-klase`;
	} else if (window.location.href.includes(`/Family/ReportPupilMarks`)) {
		document.title = `Sekmju izraksts | Pārskati | E-klase`;
	} else if (window.location.href.includes(`/Family/Settings/Profiles`)) {
		document.title = `Ģimenes uzstādījumi | Iestatījumi | E-klase`;
	} else if (window.location.href.includes(`/Family/ActionLog`)) {
		document.title = `Darbību vēsture | Iestatījumi | E-klase`;
	} else if (window.location.href.includes(`/Family/MessageLog`)) {
		document.title = `Ziņojumu vēsture | Iestatījumi | E-klase`;
	} else if (window.location.href.includes(`/Family/MessageLog`)) {
		document.title = `Ziņojumu vēsture | Iestatījumi | E-klase`;
	} else if (window.location.href.includes(`/Family/FAQ`)) {
		document.title = `Biežāk uzdotie jautājumi | Palīdzība | E-klase`;
	} else if (window.location.href.includes(`/Family/TechnicalSupport`)) {
		document.title = `Tehniskais atbalsts | Palīdzība | E-klase`;
	} else if (window.location.href.includes(`/Family/FamilyPlanInformation`)) {
		document.title = `Ģimenes komplekts | E-klase`;
	} else if (window.location.href.includes(`/Payments`)) {
		document.title = `Ģimenes komplekts | E-klase`;
	}
}


window.addEventListener(`pageLoading`, () => {
	setTitle();
});
window.addEventListener(`pageLoaded`, () => {
	setTitle();
});
window.addEventListener(`urlChanged`, () => {
	setTitle();
});