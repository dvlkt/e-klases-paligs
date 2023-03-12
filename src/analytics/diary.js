window.addEventListener(`pageLoading`, () => {
	if (document.location.href.includes(`/Family/Diary`)) {
		chrome.storage.sync.get([`isStatisticsPanelOn`, `treatNVAsZero`, `treatNAsZero`, `treatPercentagesAsGrades`], (res) => { try {
			if (!res.isStatisticsPanelOn) {
				return;
			}

			// Parse the grades
			let grades = [];
			for (let diaryRow of document.querySelectorAll(`.lessons-table tbody tr`)) {
				let currentSubject = diaryRow.querySelector(`.first-column span.title`).innerHTML;
				currentSubject = currentSubject.split(`<`)[0]; // Removes the room tag
				currentSubject = currentSubject.replaceAll(`\n`, ``);
				currentSubject = currentSubject.trim();
				
				for (let subjectGrade of diaryRow.querySelectorAll(`td:last-child span.score`)) {
					grades.push({
						text: subjectGrade.innerText,
						subject: currentSubject,
						id: subjectGrade.getAttribute(`data-id`)
					});
				}
			}

			let parsedGrades = AnalyticsManager.parseGrades(grades, res.treatNVAsZero, res.treatNAsZero, res.treatPercentagesAsGrades);
			if (parsedGrades === null) {
				return;
			}

			// Show the analytics box
			let analyticsTitleEl = document.createElement(`h2`);
			analyticsTitleEl.innerText = `Statistika par šo nedēļu`;
			analyticsTitleEl.style.textTransform = `none`;

			let analyticsEl = document.createElement(`div`);
			analyticsEl.className = `diary-analytics`;

			let averageGradeTextEl = document.createElement(`h2`);
			averageGradeTextEl.innerHTML +=`<span class="name">Vidējā atzīme:</span> <span class="grade no-pointer${parsedGrades.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.averageGrade.toString().replaceAll(`.`, `,`)}</span>`;
			analyticsEl.appendChild(averageGradeTextEl);

			let bestSubjectTextEl = document.createElement(`h2`);
			bestSubjectTextEl.innerHTML = `<span class="name">${parsedGrades.bestSubjects.names.length === 1 ? `Labākais priekšmets` : `Labākie priekšmeti`}:</span> `;
			if (parsedGrades.bestSubjects.names.length <= 3) {
				bestSubjectTextEl.innerHTML += `${parsedGrades.bestSubjects.names.join(`<span class="low-priority"> & </span>`)}`;
			} else {
				bestSubjectTextEl.innerHTML += `${parsedGrades.bestSubjects.names[parsedGrades.bestSubjects.names.length - 1]} <span class="low-priority">&</span> ${parsedGrades.bestSubjects.names.length - 1} citi`;
			}
			bestSubjectTextEl.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer${parsedGrades.bestSubjects.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.bestSubjects.averageGrade.toString().replaceAll(`.`, `,`)}</span>)</span>`;
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
			worstSubjectTextEl.innerHTML += ` <span class="low-priority">(vidējā atzīme: <span class="grade no-pointer${parsedGrades.worstSubjects.averageGrade <= 3 ? ` low` : ``}">${parsedGrades.worstSubjects.averageGrade.toString().replaceAll(`.`, `,`)}</span>)</span>`;
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

			let wrapperEl = document.querySelector(`.student-journal-lessons-table-holder`);
			wrapperEl.appendChild(analyticsTitleEl);
			wrapperEl.appendChild(analyticsEl);
		} catch(e) { console.error(e) }
		});
	}
});