window.addEventListener(`pageLoading`, () => {
	if (document.location.href.includes(`/Family/Diary`)) {
		chrome.storage.sync.get([`isStatisticsPanelOn`, `treatNVAsZero`, `treatNAsZero`, `treatPercentagesAsGrades`], (res) => {
			if (!res.isStatisticsPanelOn) {
				return;
			}

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
					let gradeText = ``;
					let gradeValue = ``;

					// Remove the old grade
					for (let i = 0; i < grade.innerText.length; i++) {
						if (grade.innerText.toLowerCase()[i] === `|`) {
							gradeText = ``;
						} else {
							gradeText += grade.innerText[i];
						}
					}

					// Parse numbers
					for (let i = 0; i < gradeText.length; i++) {
						if (!isNaN(parseInt(gradeText[i]))) {
							gradeValue += gradeText[i];
						} else {
							break;
						}
					}

					// If the grade is NV, make it equal to 0
					if (res.treatNVAsZero) {
						if (gradeText[0] === `n` &&
							gradeText[1] === `v`) {
							
							gradeValue = `0`;
						}
					}

					// If the grade is N, make it equal to 0
					if (res.treatNAsZero) {
						if (gradeText[0] === `n` &&
							gradeText[1] !== `v` &&
							gradeText[1] !== `c` &&
							gradeText[1] !== `s`) {
							
							gradeValue = `0`;
						}
					}

					// If the grade was written out in %, it should be either divided by 10 or just discarded
					if (res.treatPercentagesAsGrades) {
						if (gradeText.includes(`%`)) {
							gradeValue = Math.round(parseInt(gradeText.split(`%`)[0]) / 10).toString();
						}
					} else {
						gradeValue = ``;
					}
					
					if (gradeValue !== ``) {
						grades.push({
							subject,
							value: parseInt(gradeValue),
							originalValue: gradeText,
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
			let bestGradeText = ``;
			let bestGradeSubjects = [];
			let bestGradeElement = null;
			for (let i = 0; i < grades.length; i++) {
				if (grades[i].value > bestGrade) {
					bestGrade = grades[i].value;
					bestGradeText = grades[i].originalValue;
					bestGradeSubjects = [grades[i].subject];
					bestGradeElement = grades[i].element;
				} else if (grades[i].value === bestGrade) {
					bestGradeSubjects.push(grades[i].subject);
					bestGradeElement = null;
					bestGradeText = bestGrade.toString();
				}
			}
			let bestGradeTextElement = document.createElement(`h2`);
			bestGradeTextElement.innerHTML = `<span class="name">Labākā atzīme:</span> <span id="statistics-best-grade" class="grade">${bestGradeText}</span> <span class="low-priority">(saņemta ${bestGradeSubjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${bestGradeSubjects.join(` & `)})</span>`;
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
			let worstGradeText = ``;
			let worstGradeSubjects = [];
			let worstGradeElement = null;
			for (let i = 0; i < grades.length; i++) {
				if (grades[i].value < worstGrade) {
					worstGrade = grades[i].value;
					worstGradeText = grades[i].originalValue;
					worstGradeSubjects = [grades[i].subject];
					worstGradeElement = grades[i].element;
				} else if (grades[i].value === worstGrade) {
					worstGradeSubjects.push(grades[i].subject);
					worstGradeText = worstGrade.toString();
					worstGradeElement = null;
				}
			}
			let worstGradeTextElement = document.createElement(`h2`);
			worstGradeTextElement.innerHTML = `<span class="name">Sliktākā atzīme:</span> <span id="statistics-worst-grade" class="grade">${worstGradeText}</span> <span class="low-priority">(saņemta ${worstGradeSubjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${worstGradeSubjects.join(` & `)})</span>`;
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
		});
	}
});