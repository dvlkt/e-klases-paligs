const gradeToNumber = (gradeString, treatNVAsZero, treatNAsZero, treatPercentagesAsGrades) => {
	let grade = gradeString.split(`|`).pop();
	grade = grade.split(` `)[0];
	
	if (grade.slice(-1) === `%`) {
		if (treatPercentagesAsGrades) {
			return parseFloat(grade.slice(0, -1).replace(`,`, `.`)) / 10;
		} else {
			return null;
		}
	} else if (grade === `nv`) {
		if (treatNVAsZero) {
			return 0;
		} else {
			return null;
		}
	} else if (grade === `n`) {
		if (treatNAsZero) {
			return 0;
		} else {
			return null;
		}
	} else {
		let parsed = parseInt(grade.split(` `)[0]);

		if (Number.isNaN(parsed)) {
			return null;
		} else {
			return parsed;
		}
	}
}
const parseGrades = (inputGrades, treatNVAsZero, treatNAsZero, treatPercentagesAsGrades) => {
	// Collect all of the grades
	let grades = [];
	for (let i = 0; i < inputGrades.length; i++) {
		let grade = gradeToNumber(inputGrades[i].text, treatNVAsZero, treatNAsZero, treatPercentagesAsGrades);
		if (grade === null) {
			continue;
		}

		grades.push({
			grade,
			text: inputGrades[i].text,
			subject: inputGrades[i].subject,
			id: inputGrades[i].id
		});
	}

	// Calculate the average grade in total
	let averageGrade = 0;
	for (let i = 0; i < grades.length; i++) {
		averageGrade += grades[i].grade / grades.length;
	}

	// Seperate grades into subjects
	let subjectGrades = {};
	for (let i = 0; i < grades.length; i++) {
		if (subjectGrades[grades[i].subject] === undefined) {
			subjectGrades[grades[i].subject] = [];
		}
		subjectGrades[grades[i].subject].push(grades[i]);
	}

	// Calculate the average grades for each subject
	let subjectAverageGrades = {};
	for (let i in subjectGrades) {
		subjectAverageGrades[i] = 0;
		for (let o = 0; o < subjectGrades[i].length; o++) {
			subjectAverageGrades[i] += subjectGrades[i][o].grade / subjectGrades[i].length;
		}
	}

	// Find the best & worst subjects based on subjectAverageGrades
	let bestSubjects, bestSubjectGrade;
	let worstSubjects, worstSubjectGrade;
	for (let i in subjectAverageGrades) {
		if (bestSubjectGrade === undefined || subjectAverageGrades[i] > bestSubjectGrade) {
			bestSubjects = [i];
			bestSubjectGrade = subjectAverageGrades[i];
		} else if (subjectAverageGrades[i] === bestSubjectGrade) {
			bestSubjects.push(i);
		}

		if (worstSubjectGrade === undefined || subjectAverageGrades[i] < worstSubjectGrade) {
			worstSubjects = [i];
			worstSubjectGrade = subjectAverageGrades[i];
		} else if (subjectAverageGrades[i] === worstSubjectGrade) {
			worstSubjects.push(i);
		}
	}

	// Find the best & worst grades
	let bestGrade, bestGradeText, bestGradeSubjects, bestGradeID;
	let worstGrade, worstGradeText, worstGradeSubjects, worstGradeID;
	for (let i in subjectGrades) {
		for (let o = 0; o < subjectGrades[i].length; o++) {
			if (bestGrade === undefined || subjectGrades[i][o].grade > bestGrade) {
				bestGrade = subjectGrades[i][o].grade;
				bestGradeText = subjectGrades[i][o].text;
				bestGradeSubjects = [subjectGrades[i][o].subject];
				bestGradeID = subjectGrades[i][o].id;
			} else if (subjectGrades[i][o].grade === bestGrade) {
				bestGradeSubjects.push(subjectGrades[i][o].subject);
			}

			if (worstGrade === undefined || subjectGrades[i][o].grade < worstGrade) {
				worstGrade = subjectGrades[i][o].grade;
				worstGradeText = subjectGrades[i][o].text;
				worstGradeSubjects = [subjectGrades[i][o].subject];
				worstGradeID = subjectGrades[i][o].id;
			} else if (subjectGrades[i][o].grade === worstGrade) {
				worstGradeSubjects.push(subjectGrades[i][o].subject);
			}
		}
	}
	
	// If the best/worst grade appears in multiple subjects, make it look like a general grade instead of a specific one from a specific subject
	if (bestGradeSubjects.length > 1) {
		bestGradeText = (Math.floor(bestGrade * 10) / 10).toString();
	}
	if (worstGradeSubjects.length > 1) {
		worstGradeText = (Math.floor(worstGrade * 10) / 10).toString();
	}
	
	// Return the data
	return {
		averageGrade: Math.round(averageGrade * 10) / 10,
		bestSubjects: {
			names: bestSubjects,
			averageGrade: Math.round(bestSubjectGrade * 10) / 10
		},
		bestGrade: {
			text: bestGradeText,
			value: bestGrade,
			subjects: bestGradeSubjects,
			id: bestGradeID
		},
		worstSubjects: {
			names: worstSubjects,
			averageGrade: Math.round(worstSubjectGrade * 10) / 10
		},
		worstGrade: {
			text: worstGradeText,
			value: worstGrade,
			subjects: worstGradeSubjects,
			id: worstGradeID
		},
		subjectAverageGrades
	};
}

const AnalyticsManager = {
	gradeToNumber,
	parseGrades
}