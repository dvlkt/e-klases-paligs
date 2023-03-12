window.addEventListener(`pageLoading`, () => {
	if (document.location.href.includes(`Family/ReportPupilMarks`)) {
		chrome.storage.sync.get([`isStatisticsPanelOn`, `treatNVAsZero`, `treatNAsZero`, `treatPercentagesAsGrades`], (res) => {
			if (!res.isStatisticsPanelOn) {
				return;
			}

			// Parse the grades
			let grades = [];
			for (let tableRow of document.querySelectorAll(`.analytics-report-print-table-holder tbody tr`)) {
				let currentSubject = tableRow.querySelector(`td:first-child`).innerText;

				for (let cell of tableRow.querySelectorAll(`td:not(:first-child)`)) {
					let cellGrades = cell.innerText.split(` `);

					for (let i = 0; i < cellGrades.length; i++) {
						if (cellGrades[i] === ``) {
							continue;
						}

						grades.push({
							text: cellGrades[i],
							subject: currentSubject,
							id: null
						});
					}
				}
			}

			let parsedGrades = AnalyticsManager.parseGrades(grades, res.treatNVAsZero, res.treatNAsZero, res.treatPercentagesAsGrades);
			if (parsedGrades === null) {
				return;
			}

			// Show the analytics box
			let analyticsEl = document.createElement(`div`);
			analyticsEl.className = `report-analytics`;
			analyticsEl.innerHTML = `<h1>Statistika skatītajam laika periodam</h1>`;

			let averageGradeTextEl = document.createElement(`h2`);
			averageGradeTextEl.innerHTML +=`<span class="name">Vidējā atzīme:</span> <span class="grade${parsedGrades.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.averageGrade.toString().replaceAll(`.`, `,`)}</span>`;
			analyticsEl.appendChild(averageGradeTextEl);

			let bestSubjectTextEl = document.createElement(`h2`);
			bestSubjectTextEl.innerHTML = `<span class="name">${parsedGrades.bestSubjects.names.length === 1 ? `Labākais priekšmets` : `Labākie priekšmeti`}:</span> `;
			if (parsedGrades.bestSubjects.names.length <= 3) {
				bestSubjectTextEl.innerHTML += `${parsedGrades.bestSubjects.names.join(`<span class="low-priority"> & </span>`)}`;
			} else {
				bestSubjectTextEl.innerHTML += `${parsedGrades.bestSubjects.names[parsedGrades.bestSubjects.subjects.length - 1]} <span class="low-priority">&</span> ${parsedGrades.bestSubjects.names.length - 1} citi`;
			}
			bestSubjectTextEl.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade${parsedGrades.bestSubjects.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.bestSubjects.averageGrade.toString().replaceAll(`.`, `,`)}</span>)</span>`;
			analyticsEl.appendChild(bestSubjectTextEl);

			let bestGradeTextEl = document.createElement(`h2`);
			bestGradeTextEl.innerHTML = `<span class="name">Labākā atzīme:</span> `;
			bestGradeTextEl.innerHTML += `<span id="analytics-best-grade" class="grade${parsedGrades.bestGrade.value <= 3 ? ` low` : ``}">${parsedGrades.bestGrade.text}</span>`;
			if (parsedGrades.bestGrade.subjects.length <= 3) {
				bestGradeTextEl.innerHTML += ` <span class="low-priority">(saņemta ${parsedGrades.bestGrade.subjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${parsedGrades.bestGrade.subjects.join(` & `)})</span>`;
			} else {
				bestGradeTextEl.innerHTML += ` <span class="low-priority">(saņemta priekšmetā ${parsedGrades.bestGrade.subjects[0]} & ${parsedGrades.bestGrade.subjects.length - 1} citos)`;
			}
			analyticsEl.appendChild(bestGradeTextEl);

			let worstSubjectTextEl = document.createElement(`h2`);
			worstSubjectTextEl.innerHTML = `<span class="name">${parsedGrades.worstSubjects.names.length === 1 ? `Sliktākais priekšmets` : `Sliktākie priekšmeti`}:</span> `;
			if (parsedGrades.worstSubjects.names.length <= 3) {
				worstSubjectTextEl.innerHTML += `${parsedGrades.worstSubjects.names.join(`<span class="low-priority"> & </span>`)}`;
			} else {
				worstSubjectTextEl.innerHTML += `${parsedGrades.worstSubjects.names[parsedGrades.worstSubjects.subjects.length - 1]} <span class="low-priority">&</span> ${parsedGrades.worstSubjects.names.length - 1} citi`;
			}
			worstSubjectTextEl.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade${parsedGrades.worstSubjects.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.worstSubjects.averageGrade.toString().replaceAll(`.`, `,`)}</span>)</span>`;
			analyticsEl.appendChild(worstSubjectTextEl);

			let worstGradeTextEl = document.createElement(`h2`);
			worstGradeTextEl.innerHTML = `<span class="name">Sliktākā atzīme:</span> `;
			worstGradeTextEl.innerHTML += `<span id="analytics-best-grade" class="grade${parsedGrades.worstGrade.value <= 3 ? ` low` : ``}">${parsedGrades.worstGrade.text}</span>`;
			if (parsedGrades.worstGrade.subjects.length <= 3) {
				worstGradeTextEl.innerHTML += ` <span class="low-priority">(saņemta ${parsedGrades.worstGrade.subjects.length === 1 ? `priekšmetā` : `priekšmetos`} ${parsedGrades.worstGrade.subjects.join(` & `)})</span>`;
			} else {
				worstGradeTextEl.innerHTML += ` <span class="low-priority">(saņemta priekšmetā ${parsedGrades.worstGrade.subjects[0]} & ${parsedGrades.worstGrade.subjects.length - 1} citos)`;
			}
			analyticsEl.appendChild(worstGradeTextEl);

			let wrapperEl = document.querySelector(`.analytics-report-print-table-holder`);
			wrapperEl.insertBefore(analyticsEl, wrapperEl.querySelector(`.analytics-report-table-tools`));

			// Add the average column
			if (document.querySelector(`.analytics-report-print-table-holder th:last-child span`).innerText !== `Vid.`) {
				let avgHeadCell = document.createElement(`th`);
				avgHeadCell.innerHTML = `<span>Vid.</span>`;
				document.querySelector(`.analytics-report-print-table-holder tr:first-child`).appendChild(avgHeadCell);

				for (let tableRow of document.querySelectorAll(`.analytics-report-print-table-holder tbody tr`)) {
					let avgCell = document.createElement(`td`);
					if (parsedGrades.subjectAverageGrades[tableRow.children[0].innerText] !== undefined) {
						avgCell.innerHTML = `<span>${Math.round(parsedGrades.subjectAverageGrades[tableRow.children[0].innerText] * 10) / 10}</span>`;
					}
					tableRow.appendChild(avgCell);
				}
			}
		});
	}
});