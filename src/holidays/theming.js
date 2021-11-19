let headerCanvasElement;
let headerCanvasCtx;

window.addEventListener(`pageLoaded`, () => {
	/*
		Christmas
	*/
	if (isChristmasToday()) {
		let headerElement = document.querySelector(`.header-second-inner`);

		headerCanvasElement = document.createElement(`canvas`);
		headerCanvasElement.width = headerElement.clientWidth;
		headerCanvasElement.height = headerElement.clientHeight;
		headerElement.appendChild(headerCanvasElement);

		headerCanvasCtx = headerCanvasElement.getContext(`2d`);

		// Make the header dark
		headerElement.style.backgroundColor = `#161522`;

		// Add the snow
		headerElement.style.backgroundImage = `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjEyIiBoZWlnaHQ9IjE5NSIgdmlld0JveD0iMCAwIDYxMiAxOTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNjQuODY1IDE2NC41QzEwNC4xMTUgMTY0LjUgNzUuNDM4NCAxNTggMCAxNThWMTk1SDYxMlYxNThDNTgwLjAyNiAxNTggNTczLjYzMSAxNjIuMTEgNTI4LjA2OSAxNjEuNzc0QzQ3MS4xMTUgMTYxLjM1NSA0NzMuMTEzIDE1OCAzODcuMTg0IDE1OEMzMDEuMjU0IDE1OCAyNDAuODAzIDE2NC41IDE2NC44NjUgMTY0LjVaIiBmaWxsPSIjRThFOEU4Ii8+Cjwvc3ZnPgo=")`;
		headerElement.style.backgroundSize = `contain`;

		// Make the header icons light
		for (let element of document.querySelectorAll(`.header-second-menu-item`)) {
			element.className += ` dark-header`;
		}

		// Generate random snowflakes
		for (let i = 0; i < 25 + Math.random() * 10; i++) {
			christmasSnowflakePositions.push({
				x: Math.random() * headerCanvasElement.clientWidth,
				y: Math.random() * headerCanvasElement.clientHeight,
				sine: Math.random()
			});
		}

		// Start the animation
		drawChristmasCanvasFrame();
	}
	
	/*
		New Year
	*/
	if (isNewYearToday()) {
		let headerElement = document.querySelector(`.header-second-inner`);

		headerCanvasElement = document.createElement(`canvas`);
		headerCanvasElement.width = headerElement.clientWidth;
		headerCanvasElement.height = headerElement.clientHeight;
		headerElement.appendChild(headerCanvasElement);

		headerCanvasCtx = headerCanvasElement.getContext(`2d`);

		// Make the header dark
		headerElement.style.backgroundColor = `#161522`;

		// Make the header icons light
		for (let element of document.querySelectorAll(`.header-second-menu-item`)) {
			element.className += ` dark-header`;
		}

		// Start the animation
		drawNewYearCanvasFrame();
	}
	
	/*
		Proclamation Day of Latvia
	*/
	if (isPDLToday()) {
		// TODO
	}
	
	/*
		Jāņi
	*/
	if (isJaniToday()) {
		// TODO
	}
});

/*
	Christmas animation
*/
let christmasSnowflakePositions = [];
const drawChristmasCanvasFrame = () => {
	
	// Clear the canvas
	headerCanvasCtx.clearRect(0, 0, headerCanvasElement.clientWidth, headerCanvasElement.clientHeight);

	for (let i = 0; i < christmasSnowflakePositions.length; i++) {
		// Move the snowflakes lower
		christmasSnowflakePositions[i].y++;

		// Move the snowflakes horizontally along a sine wave
		christmasSnowflakePositions[i].x += Math.sin(christmasSnowflakePositions[i].sine) / 2;
		christmasSnowflakePositions[i].sine += 0.1;

		// Remove the snowflakes that have
		if (christmasSnowflakePositions[i].y >= 64) {
			christmasSnowflakePositions.splice(i, 1);
		}

		// Render the snowflakes
		headerCanvasCtx.fillStyle = `#ffffff`;
		headerCanvasCtx.beginPath();
		headerCanvasCtx.arc(
			christmasSnowflakePositions[i].x,
			christmasSnowflakePositions[i].y,
			1,
			0,
			2 * Math.PI
		);
		headerCanvasCtx.fill();
	}

	// Have a chance of creating a new snowflake
	if (Math.random() < 0.5) {
		christmasSnowflakePositions.push({ x: Math.random() * headerCanvasElement.clientWidth, y: 0, sine: 0 });
	}

	// Request the next frame
	setTimeout(drawChristmasCanvasFrame, 50);
}

/*
	New year animation
*/
let newYearFireworks = [];
let newYearFireworkColors = [`#ee3333`, `#fa5e21`, `#f8b525`, `#139e4a`, `#0088e3`, `#1c1fd1`, `#8c29dd`];
const drawNewYearCanvasFrame = () => {

	// Clear the canvas
	headerCanvasCtx.clearRect(0, 0, headerCanvasElement.clientWidth, headerCanvasElement.clientHeight);

	// Remove the fireworks that are too old
	for (let i = 0; i < newYearFireworks.length; i++) {
		if (newYearFireworks[i]?.animationProgress > 5.12) {
			newYearFireworks.splice(i, 1);
		}
	}

	// Render the fireworks
	for (let i = 0; i < newYearFireworks.length; i++) {
		// Increase the animation progress
		newYearFireworks[i].animationProgress += 0.01;

		// Render each point
		for (let o = 0; o < newYearFireworks[i].pointCount; o++) {
			let fireworkX = newYearFireworks[i].x;
			let fireworkY = newYearFireworks[i].y;

			let pointAngle = ((Math.PI * 2) / newYearFireworks[i].pointCount) * o;

			let xValue = 1 - Math.pow(1 - newYearFireworks[i].animationProgress, 3);
			let yValue = 1 - Math.pow(1 - newYearFireworks[i].animationProgress, 3);

			let pointX = fireworkX + Math.cos(pointAngle) * (xValue * 64);
			let pointY = fireworkY - Math.sin(pointAngle) * (yValue * 64);

			let opacity = Math.max(0, 255 - Math.floor(newYearFireworks[i].animationProgress * 512)).toString(16);

			headerCanvasCtx.fillStyle = `${newYearFireworkColors[newYearFireworks[i].color]}${opacity.length === 1 ? `0` : ``}${opacity}`;
			headerCanvasCtx.beginPath();
			headerCanvasCtx.arc(
				pointX,
				pointY,
				1,
				0,
				2 * Math.PI
			);
			headerCanvasCtx.fill();
		}
	}

	// Have a chance of creating a new firework
	if (Math.random() < 0.075) {
		newYearFireworks.push({
			x: Math.random() * headerCanvasElement.clientWidth,
			y: Math.random() * headerCanvasElement.clientHeight,
			animationProgress: 0,
			color: Math.floor(Math.random() * 7),
			pointCount: Math.floor(Math.random() * 10) + 15
		});
	}

	// Request the next frame
	setTimeout(drawNewYearCanvasFrame, 50);
}