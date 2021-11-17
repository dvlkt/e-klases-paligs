window.addEventListener(`pageLoading`, () => {
	if (document.location.href.includes(`/Family/Diary`)) {
		let containerElement = document.createElement(`div`);
		containerElement.className = `diary-analytics`;

		// Get the grades
		let grades = [];
		for (let diaryRow of document.querySelectorAll(`.lessons-table tbody tr`)) {
			let subject = diaryRow.querySelector(`.first-column span.title`).innerHTML;
			subject = subject.split(`<`)[0]; // Removes the room tag
			subject = subject.replaceAll(`\n`, ``);
			subject = subject.trim();

			for (grade of diaryRow.querySelectorAll(`span.score`)) {
				let gradeValue = ``;

				for (let i = 0; i < grade.innerText.length; i++) {
					if (!isNaN(parseInt(grade.innerText[i]))) {
						gradeValue += grade.innerText[i];
					} else if (grade.innerText[i] === `|`) {
						// Handle edited grades
						gradeValue = ``;
					} else {
						break;
					}
				}

				// If the grade is NV, make it equal to 0
				if (grade.innerText.toLowerCase() === `nv`) {
					gradeValue = `0`;
				}

				// If the grade was written out in %, it should be divided by 10
				if (grade.innerText.includes(`%`)) {
					gradeValue = (parseInt(gradeValue) / 10).toString();
				}
				
				if (gradeValue !== ``) {
					grades.push({
						subject,
						value: parseInt(gradeValue),
						originalValue: gradeValue,
						element: grade
					});
				}
			}
		}

		// Calculate the average grade
		let gradeSum = 0;
		for (let i = 0; i < grades.length; i++) {
			gradeSum += grades[i].value;
		}
		let avgGradeTextElement = document.createElement(`h2`);
		avgGradeTextElement.innerHTML = `<span class="name">Vidējā atzīme:</span> <span class="grade no-pointer">${Math.round(gradeSum / grades.length * 100) / 100}</span>`;
		if (grades.length > 0) {
			containerElement.appendChild(avgGradeTextElement);
		}

		// Calculate average grades for all subjects
		let subjectGrades = {};
		for (let i = 0; i < grades.length; i++) {
			if (subjectGrades[grades[i].subject] === undefined) {
				subjectGrades[grades[i].subject] = [grades[i].value];
			} else {
				subjectGrades[grades[i].subject].push(grades[i].value);
			}
		}
		let subjectAvgGrades = {};
		for (let i in subjectGrades) {
			subjectAvgGrades[i] = subjectGrades[i].reduce((a, b) => (a + b)) / subjectGrades[i].length;
		}

		// Find the best subject(s)
		let bestSubjects = [];
		let bestSubjectAvgGrade = 0;
		for (let i in subjectAvgGrades) {
			if (subjectAvgGrades[i] > bestSubjectAvgGrade) {
				bestSubjects = [i];
				bestSubjectAvgGrade = subjectAvgGrades[i];
			} else if (subjectAvgGrades[i] === bestSubjectAvgGrade) {
				bestSubjects.push(i);
			}
		}
		let bestSubjectTextElement = document.createElement(`h2`);
		bestSubjectTextElement.innerHTML = `<span class="name">${bestSubjects.length === 1 ? `Labākais priekšmets` : `Labākie priekšmeti`}:</span> ${bestSubjects.join(`<span class="low-priority"> & </span>`)} <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer">${bestSubjectAvgGrade}</span> )</span>`;
		if (bestSubjects.length > 0) {
			containerElement.appendChild(bestSubjectTextElement);
		}

		// Find the best grade(s)
		let bestGrade = 0;
		let bestGradeSubjects = [];
		let bestGradeElement = null;
		for (let i = 0; i < grades.length; i++) {
			if (grades[i].value > bestGrade) {
				bestGrade = grades[i].value;
				bestGradeSubjects = [grades[i].subject];
				bestGradeElement = grades[i].element;
			} else if (grades[i].value === bestGrade) {
				bestGradeSubjects.push(grades[i].subject);
				bestGradeElement = null;
			}
		}
		let bestGradeTextElement = document.createElement(`h2`);
		bestGradeTextElement.innerHTML = `<span class="name">Labākā atzīme:</span> <span id="statistics-best-grade" class="grade">${bestGrade}</span> <span class="low-priority">(saņemta ${bestGradeSubjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${bestGradeSubjects.join(` & `)})</span>`;
		if (bestGradeSubjects.length > 0) {
			containerElement.appendChild(bestGradeTextElement);
		}

		// Find the worst subject(s)
		let worstSubjects = [];
		let worstSubjectAvgGrade = 10;
		for (let i in subjectAvgGrades) {
			if (subjectAvgGrades[i] < worstSubjectAvgGrade) {
				worstSubjects = [i];
				worstSubjectAvgGrade = subjectAvgGrades[i];
			} else if (subjectAvgGrades[i] === worstSubjectAvgGrade) {
				worstSubjects.push(i);
			}
		}
		let worstSubjectTextElement = document.createElement(`h2`);
		worstSubjectTextElement.innerHTML = `<span class="name">${worstSubjects.length === 1 ? `Sliktākais priekšmets` : `Sliktākie priekšmeti`}:</span> ${worstSubjects.join(`<span class="low-priority"> & </span>`)} <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer">${worstSubjectAvgGrade}</span> )</span>`;
		if (worstSubjects.length > 0) {
			containerElement.appendChild(worstSubjectTextElement);
		}

		// Find the worst grade(s)
		let worstGrade = 10;
		let worstGradeSubjects = [];
		let worstGradeElement = null;
		for (let i = 0; i < grades.length; i++) {
			if (grades[i].value < worstGrade) {
				worstGrade = grades[i].value;
				worstGradeSubjects = [grades[i].subject];
				worstGradeElement = grades[i].element;
			} else if (grades[i].value === worstGrade) {
				worstGradeSubjects.push(grades[i].subject);
				worstGradeElement = null;
			}
		}
		let worstGradeTextElement = document.createElement(`h2`);
		worstGradeTextElement.innerHTML = `<span class="name">Sliktākā atzīme:</span> <span id="statistics-worst-grade" class="grade">${worstGrade}</span> <span class="low-priority">(saņemta ${worstGradeSubjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${worstGradeSubjects.join(` & `)})</span>`;
		if (worstGradeSubjects.length > 0) {
			containerElement.appendChild(worstGradeTextElement);
		}

		// Show the analytics
		if (containerElement.children.length !== 0) {
			let parent = document.querySelector(`.student-journal-lessons-table-holder`);

			let titleElement = document.createElement(`h2`);
			titleElement.innerText = `Statistika par šo nedēļu`;
			titleElement.style.textTransform = `none`;

			parent.appendChild(titleElement);
			parent.appendChild(containerElement);

			// On best grade click, open more information about  it
			let analyticsBestGradeElement = document.querySelector(`#statistics-best-grade`);
			if (bestGradeSubjects.length === 1) {
				analyticsBestGradeElement.onclick = () => {
					bestGradeElement.click();
				}
			} else {
				analyticsBestGradeElement.classList += ` no-pointer`;
			}
			// On worst grade click, open more information about it
			let analyticsWorstGradeElement = document.querySelector(`#statistics-worst-grade`);
			if (worstGradeSubjects.length === 1) {
				analyticsWorstGradeElement.onclick = () => {
					worstGradeElement.click();
				}
			} else {
				analyticsWorstGradeElement.classList += ` no-pointer`;
			}
		}
	}
});