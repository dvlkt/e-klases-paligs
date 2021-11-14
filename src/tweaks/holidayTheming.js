let headerCanvasElement;
let headerCanvasCtx;

window.addEventListener(`pageLoaded`, () => {
	let date = new Date();

	if ((date.getMonth() === 11 && date.getDate() === 24) ||
		(date.getMonth() === 11 && date.getDate() === 25) ||
		(date.getMonth() === 11 && date.getDate() === 26)) {

		/*
			Christmas
		*/
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
	} else if ((date.getMonth() === 11 && date.getDate() === 31) ||
		(date.getMonth() === 0 && date.getDate() === 1)) {

		/*
			New Year
		*/

	} else if ((date.getMonth() === 10 && date.getDate() === 18)) {
		/*
			Proclamation Day of Latvia
		*/

	} else if (date.getMonth() === 5 && date.getDate() === 24) {
		/*
			Jāņi
		*/

	}
});

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
		headerCanvasCtx.arc(christmasSnowflakePositions[i].x,
							christmasSnowflakePositions[i].y,
							1,
							0,
							2 * Math.PI);
		headerCanvasCtx.fill();
	}

	// Have a chance of creating a new snowflake
	if (Math.random() < 0.5) {
		christmasSnowflakePositions.push({ x: Math.random() * headerCanvasElement.clientWidth, y: 0, sine: 0 });
	}

	// Request the next frame
	setTimeout(drawChristmasCanvasFrame, 50);
}