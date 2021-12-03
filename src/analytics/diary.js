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

					// Look only at the newest grade
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

					if (res.treatNVAsZero) {
						// If the grade is NV, make it equal to 0
						if (gradeText[0] === `n` &&
							gradeText[1] === `v`) {
							
							gradeValue = `0`;
						}
					}

					if (res.treatNAsZero) {
						// If the grade is N and it hasn't been justified, make it equal to 0
						if (gradeText[0] === `n` &&
							gradeText[1] !== `v` &&
							gradeText[1] !== `c` &&
							gradeText[1] !== `s`) {
							
							gradeValue = `0`;
						}
					}

					if (res.treatPercentagesAsGrades) {
						// Convert % grades into regular ones
						if (gradeText.includes(`%`)) {
							gradeValue = convertPercentToGrade(gradeText.split(`%`)[0]).toString();
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


			/*
				Add the panel element
			*/
			if (grades.length > 0) {
				let parent = document.querySelector(`.student-journal-lessons-table-holder`);

				let titleElement = document.createElement(`h2`);
				titleElement.innerText = `Statistika par šo nedēļu`;
				titleElement.style.textTransform = `none`;

				parent.appendChild(titleElement);
				parent.appendChild(containerElement);
			} else {
				return;
			}


			/*
				Calculate the average grade
			*/
			let gradeSum = 0;
			for (let i = 0; i < grades.length; i++) {
				gradeSum += grades[i].value;
			}

			let averageGrade = Math.floor((gradeSum / grades.length) * 100) / 100;

			let averageGradeTextElement = document.createElement(`h2`);
			averageGradeTextElement.innerHTML = `<span class="name">Vidējā atzīme:</span> <span class="grade no-pointer">${averageGrade}</span>`;
			containerElement.appendChild(averageGradeTextElement);


			/*
				Calculate the average grade for each subject
			*/
			let averageSubjectGrades = {};
			
			// Organise the grades into subjects
			let subjectGrades = {};
			for (let i = 0; i < grades.length; i++) {
				if (subjectGrades[grades[i].subject] === undefined) {
					subjectGrades[grades[i].subject] = [grades[i].value];
				} else {
					subjectGrades[grades[i].subject].push(grades[i].value);
				}
			}
			
			for (let i in subjectGrades) {
				let subjectGradeSum = 0;
				for (let o = 0; o < subjectGrades[i].length; o++) {
					subjectGradeSum += subjectGrades[i][o];
				}

				let averageSubjectGrade = Math.floor((subjectGradeSum / subjectGrades[i].length) * 100) / 100;

				averageSubjectGrades[i] = averageSubjectGrade;
			}


			/*
				Display the best subject(s)
			*/
			let bestAverageGrade = 0;
			let bestSubjects = [];
			for (let i in averageSubjectGrades) {
				if (averageSubjectGrades[i] > bestAverageGrade) {
					bestAverageGrade = averageSubjectGrades[i];
					bestSubjects = [i];
				} else if (averageSubjectGrades[i] === bestAverageGrade) {
					if (!bestSubjects.includes(i)) {
						bestSubjects.push(i);
					}
				}
			}

			let bestSubjectTextElement = document.createElement(`h2`);
			bestSubjectTextElement.innerHTML = `<span class="name">${bestSubjects.length === 1 ? `Labākais priekšmets` : `Labākie priekšmeti`}:</span> `;
			if (bestSubjects.length <= 3) {
				bestSubjectTextElement.innerHTML += `${bestSubjects.join(`<span class="low-priority"> & </span>`)}`;
			} else {
				bestSubjectTextElement.innerHTML += `${bestSubjects[bestSubjects.length - 1]} <span class="low-priority">&</span> ${bestSubjects.length - 1} citi`;
			}
			bestSubjectTextElement.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer">${bestAverageGrade}</span>)</span>`;

			containerElement.appendChild(bestSubjectTextElement);


			/*
				Display the best grade
			*/
			let bestGrade = 0;
			let bestGradeText = ``;
			let bestGradeElement = null;
			let subjectsWithBestGrade = [];
			for (let i in grades) {
				if (grades[i].value > bestGrade) {
					bestGrade = grades[i].value;
					bestGradeText = grades[i].originalValue;
					bestGradeElement = grades[i].element;
					subjectsWithBestGrade = [grades[i].subject];
				} else if (grades[i].value === bestGrade) {
					if (!subjectsWithBestGrade.includes(grades[i].subject)) {
						subjectsWithBestGrade.push(grades[i].subject);
					}
					bestGradeText = bestGrade.toString();
					bestGradeElement = null;
				}
			}

			let bestGradeTextElement = document.createElement(`h2`);
			bestGradeTextElement.innerHTML = `<span class="name">Labākā atzīme:</span> `;
			bestGradeTextElement.innerHTML += `<span id="analytics-best-grade" class="grade">${bestGradeText}</span>`;
			if (subjectsWithBestGrade.length <= 3) {
				bestGradeTextElement.innerHTML += ` <span class="low-priority">(saņemta ${subjectsWithBestGrade.length === 1 ? `priekšmetā` : `priekšmetos`} ${subjectsWithBestGrade.join(` & `)})</span>`;
			} else {
				bestGradeTextElement.innerHTML += ` <span class="low-priority">(saņemta ${subjectsWithBestGrade[subjectsWithBestGrade.length - 1]} & ${subjectsWithBestGrade.length - 1} citos priekšmetos)`;
			}

			containerElement.appendChild(bestGradeTextElement);

			let analyticsBestGradeElement = document.querySelector(`#analytics-best-grade`);
			if (subjectsWithBestGrade.length === 1) {
				analyticsBestGradeElement.addEventListener(`click`, () => {
					bestGradeElement.click();
				});
			} else {
				analyticsBestGradeElement.classList += ` no-pointer`;
			}


			/*
				Display the worst subject(s)
			*/
			let worstAverageGrade = 10;
			let worstSubjects = [];
			for (let i in averageSubjectGrades) {
				if (averageSubjectGrades[i] < worstAverageGrade) {
					worstAverageGrade = averageSubjectGrades[i];
					worstSubjects = [i];
				} else if (averageSubjectGrades[i] === worstAverageGrade) {
					if (!worstSubjects.includes(i)) {
						worstSubjects.push(i);
					}
				}
			}

			let worstSubjectTextElement = document.createElement(`h2`);
			worstSubjectTextElement.innerHTML = `<span class="name">${worstSubjects.length === 1 ? `Sliktākais priekšmets` : `Sliktākie priekšmeti`}:</span> `;
			if (worstSubjects.length <= 3) {
				worstSubjectTextElement.innerHTML += `${worstSubjects.join(`<span class="low-priority"> & </span>`)}`;
			} else {
				worstSubjectTextElement.innerHTML += `${worstSubjects[worstSubjects.length - 1]} <span class="low-priority">&</span> ${worstSubjects.length - 1} citi`;
			}
			worstSubjectTextElement.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer">${worstAverageGrade}</span>)</span>`;

			containerElement.appendChild(worstSubjectTextElement);


			/*
				Display the worst grade
			*/
			let worstGrade = 10;
			let worstGradeText = ``;
			let worstGradeElement = null;
			let subjectsWithWorstGrade = [];
			for (let i in grades) {
				if (grades[i].value < worstGrade) {
					worstGrade = grades[i].value;
					worstGradeText = grades[i].originalValue;
					worstGradeElement = grades[i].element;
					subjectsWithWorstGrade = [grades[i].subject];
				} else if (grades[i].value === worstGrade) {
					if (!subjectsWithWorstGrade.includes(grades[i].subject)) {
						subjectsWithWorstGrade.push(grades[i].subject);
					}
					worstGradeText = worstGrade.toString();
					worstGradeElement = null;
				}
			}

			let worstGradeTextElement = document.createElement(`h2`);
			worstGradeTextElement.innerHTML = `<span class="name">Sliktākā atzīme:</span> `;
			worstGradeTextElement.innerHTML += `<span id="analytics-worst-grade" class="grade">${worstGradeText}</span>`;
			if (subjectsWithWorstGrade.length <= 3) {
				worstGradeTextElement.innerHTML += ` <span class="low-priority">(saņemta ${subjectsWithWorstGrade.length === 1 ? `priekšmetā` : `priekšmetos`} ${subjectsWithWorstGrade.join(` & `)})</span>`;
			} else {
				worstGradeTextElement.innerHTML += ` <span class="low-priority">(saņemta ${subjectsWithWorstGrade[subjectsWithWorstGrade.length - 1]} & ${subjectsWithWorstGrade.length - 1} citos priekšmetos)`;
			}

			containerElement.appendChild(worstGradeTextElement);

			let analyticsWorstGradeElement = document.querySelector(`#analytics-worst-grade`);
			if (subjectsWithWorstGrade.length === 1) {
				analyticsWorstGradeElement.addEventListener(`click`, () => {
					worstGradeElement.click();
				});
			} else {
				analyticsWorstGradeElement.classList += ` no-pointer`;
			}
		});
	}
});

const convertPercentToGrade = (percentage) => {
	if (percentage <= 19) {
		return 1;
	} else if (percentage >= 95) {
		return 10;
	} else {
		return Math.floor(percentage / 10);
	}
}