const isChristmasToday = async () => {
	let isHolidayDesignOff = await checkIfHolidayDesignOff();
	if (isHolidayDesignOff) return false;

	let date = new Date();

	if ((date.getMonth() === 11 && date.getDate() === 24) ||
		(date.getMonth() === 11 && date.getDate() === 25) ||
		(date.getMonth() === 11 && date.getDate() === 26)) {

		return true;

	}

	return false;
}
const isNewYearToday = async () => {
	let isHolidayDesignOff = await checkIfHolidayDesignOff();
	if (isHolidayDesignOff) return false;

	let date = new Date();

	if ((date.getMonth() === 11 && date.getDate() === 31) ||
		(date.getMonth() === 0 && date.getDate() === 1)) {
		
		return true;
	}

	return false;
}
const isPDLToday = async () => {
	let isHolidayDesignOff = await checkIfHolidayDesignOff();
	if (isHolidayDesignOff) return false;

	let date = new Date();

	if ((date.getMonth() === 10 && date.getDate() === 18)) {
		return true;
	}

	return false;
}
const isJaniToday = async () => {
	let isHolidayDesignOff = await checkIfHolidayDesignOff();
	if (isHolidayDesignOff) return false;

	let date = new Date();

	if ((date.getMonth() === 5 && date.getDate() === 24)) {
		return true;
	}
 
	return false;
}

const isAHolidayToday = async () => {
	let isChristmasTodayValue = await isChristmasToday();
	let isNewYearTodayValue = await isNewYearToday();
	let isPDLTodayValue = await isPDLToday();
	let isJaniTodayValue = await isJaniToday();

	if (isChristmasTodayValue ||
		isNewYearTodayValue ||
		isPDLTodayValue ||
		isJaniTodayValue) {

		return true;
	}

	return false;
}

const checkIfHolidayDesignOff = async () => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get([`isHolidayDesignOn`], (res) => {
			resolve(res.isHolidayDesignOn === false);
		});
	});
}