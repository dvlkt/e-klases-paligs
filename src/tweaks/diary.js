window.addEventListener(`pageLoading`, () => {
	// Remove the different column colors from the table header in diary when there is no data
	if (document.location.href.includes(`/Family/Diary`)) {
		for (let i of document.querySelectorAll(`table.lessons-table`)) {
			if (i.children[1].children[0].children[0].className.includes(`no-data`)) {
				for (let o of i.querySelectorAll(`thead tr td`)) {
					o.innerHTML = ``;
					o.style.background = `var(--background-middle-dark-color)`;
				}
			}
		}
	}
});