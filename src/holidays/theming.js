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
		headerElement.style.backgroundImage = `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjEyIiBoZWlnaHQ9IjE5NSIgdmlld0JveD0iMCAwIDYxMiAxOTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNjQuODY1IDE3Ni44NjVDMTA0LjExNSAxNzYuODY1IDc1LjQzODQgMTczIDAgMTczVjE5NUg2MTJWMTczQzU4MC4wMjYgMTczIDU3My42MzEgMTc1LjQ0NCA1MjguMDY5IDE3NS4yNDRDNDcxLjExNSAxNzQuOTk1IDQ3My4xMTMgMTczIDM4Ny4xODQgMTczQzMwMS4yNTQgMTczIDI0MC44MDMgMTc2Ljg2NSAxNjQuODY1IDE3Ni44NjVaIiBmaWxsPSIjRThFOEU4Ii8+Cjwvc3ZnPgo=")`;
		headerElement.style.backgroundSize = `contain`;

		// Add the trees
		treeImgElement = document.createElement(`img`);
		treeImgElement.height = `64`;
		treeImgElement.style.position = `fixed`;
		treeImgElement.style.top = `0`;
		treeImgElement.style.left = `150px`;
		treeImgElement.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjEyIiBoZWlnaHQ9IjE5NSIgdmlld0JveD0iMCAwIDYxMiAxOTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMCA5Nkg0MVYxNzYuNUM0MSAxNzkuNTM4IDM4LjUzNzYgMTgyIDM1LjUgMTgyVjE4MkMzMi40NjI0IDE4MiAzMCAxNzkuNTM4IDMwIDE3Ni41Vjk2WiIgZmlsbD0iIzQzMUYwQiIvPgo8cGF0aCBkPSJNOTIgMTA2SDEwM1YxNzguNUMxMDMgMTgxLjUzOCAxMDAuNTM4IDE4NCA5Ny41IDE4NFYxODRDOTQuNDYyNCAxODQgOTIgMTgxLjUzOCA5MiAxNzguNVYxMDZaIiBmaWxsPSIjNDMxRjBCIi8+CjxwYXRoIGQ9Ik0xNTggOTZIMTY5VjE3Ni41QzE2OSAxNzkuNTM4IDE2Ni41MzggMTgyIDE2My41IDE4MlYxODJDMTYwLjQ2MiAxODIgMTU4IDE3OS41MzggMTU4IDE3Ni41Vjk2WiIgZmlsbD0iIzQzMUYwQiIvPgo8cGF0aCBkPSJNNjggMTUzLjVIM0wyNCAxMzJIN0wyNCAxMDlIMTEuNUwzNS41IDgyTDU5LjUgMTA5SDQ3TDY0IDEzMkg0N0w2OCAxNTMuNVoiIGZpbGw9IiMxOTYyMjEiLz4KPHBhdGggZD0iTTEyNyAxNThINjhMODcuMDYxNSAxMzguNDU1SDcxLjYzMDhMODcuMDYxNSAxMTcuNTQ1SDc1LjcxNTRMOTcuNSA5M0wxMTkuMjg1IDExNy41NDVIMTA3LjkzOEwxMjMuMzY5IDEzOC40NTVIMTA3LjkzOEwxMjcgMTU4WiIgZmlsbD0iIzE5NjIyMSIvPgo8cGF0aCBkPSJNMTk2IDE1M0gxMzFMMTUyIDEzMS42NUgxMzVMMTUyIDEwOC44MTFIMTM5LjVMMTYzLjUgODJMMTg3LjUgMTA4LjgxMUgxNzVMMTkyIDEzMS42NUgxNzVMMTk2IDE1M1oiIGZpbGw9IiMxOTYyMjEiLz4KPC9zdmc+Cg==`;
		headerElement.appendChild(treeImgElement);

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

		// Generate random particles
		for (let i = 0; i < 25 + Math.random() * 10; i++) {
			janiFireParticles.push({
				x: Math.random() * headerCanvasElement.clientWidth,
				y: Math.random() * headerCanvasElement.clientHeight,
				age: 0,
				waveFrequency: Math.floor(Math.random() * 10),
				waveAmplitude: Math.floor(Math.random() * 20) + 5,
				color: `#fc7c32ff`
			});
		}

		// Start the animation
		drawJaniCanvasFrame();
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
let newYearFireworkTrails = [];
let newYearFireworks = [];
let newYearFireworkColors = [`#ee3333`, `#fa5e21`, `#f8b525`, `#139e4a`, `#0088e3`, `#1c1fd1`, `#8c29dd`];
const drawNewYearCanvasFrame = () => {

	// Clear the canvas
	headerCanvasCtx.clearRect(0, 0, headerCanvasElement.clientWidth, headerCanvasElement.clientHeight);

	// Remove the fireworks that are too old
	for (let i = 0; i < newYearFireworks.length; i++) {
		if (newYearFireworks[i]?.animationProgress > 2) {
			newYearFireworks.splice(i, 1);
		}
	}

	// Render the firework trails
	for (let i = 0; i < newYearFireworkTrails.length; i++) {
		// Decrease the Y position
		newYearFireworkTrails[i].y -= 4;

		// Draw the points
		for (let o = 0; o < Math.floor(Math.random() * 10 + 40); o++) {
			let opacity = Math.max(0, Math.floor(Math.random() * 30) + 220).toString(16);

			headerCanvasCtx.fillStyle = `#ffffff${opacity.length === 1 ? `0` : ``}${opacity}`;
			headerCanvasCtx.beginPath();
			headerCanvasCtx.arc(
				newYearFireworkTrails[i].x + ((Math.random() * 2) - 1),
				newYearFireworkTrails[i].y + o + (Math.random() * 4),
				1,
				0,
				2 * Math.PI
			);
			headerCanvasCtx.fill();
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

		// Render the explosion gradient
		let gradient = headerCanvasCtx.createRadialGradient(newYearFireworks[i].x, newYearFireworks[i].y, 1, newYearFireworks[i].x, newYearFireworks[i].y, 25);
		let opacity = Math.max(0, 255 - Math.floor(newYearFireworks[i].animationProgress * 4096)).toString(16);
		gradient.addColorStop(0, `${newYearFireworkColors[newYearFireworks[i].color]}${opacity.length === 1 ? `0` : ``}${opacity}`);
		gradient.addColorStop(1, `#00000000`);
		headerCanvasCtx.fillStyle = gradient;
		headerCanvasCtx.fillRect(newYearFireworks[i].x - 25, newYearFireworks[i].y - 25, 50, 50);
	}

	// Turn the trails that have reached their target Y into fireworks
	for (let i = 0; i < newYearFireworkTrails.length; i++) {
		if (newYearFireworkTrails[i]?.y - newYearFireworkTrails[i]?.targetY < 5) {

			newYearFireworks.push({
				x: newYearFireworkTrails[i]?.x,
				y: newYearFireworkTrails[i]?.y,
				animationProgress: 0,
				color: Math.floor(Math.random() * 7),
				pointCount: Math.floor(Math.random() * 10) + 15
			});

			newYearFireworkTrails.splice(i, 1);
		}
	}

	// Have a chance of creating a new firework trail
	if (Math.random() < 0.075) {
		newYearFireworkTrails.push({
			x: Math.floor(Math.random() * headerCanvasElement.clientWidth),
			y: headerCanvasElement.clientHeight,
			targetY: Math.floor(Math.random() * headerCanvasElement.clientHeight)
		});
	}

	// Request the next frame
	setTimeout(drawNewYearCanvasFrame, 50);
}

/*
	Jāņi animation
*/
let janiFireParticles = [];
const drawJaniCanvasFrame = () => {

	// Clear the canvas
	headerCanvasCtx.clearRect(0, 0, headerCanvasElement.clientWidth, headerCanvasElement.clientHeight);

	// Create the gradient
	let opacity = Math.max(0, Math.floor(Math.random() * 30) + 220).toString(16);
	let gradient = headerCanvasCtx.createLinearGradient(0, 0, headerCanvasElement.clientWidth * 0.4, headerCanvasElement.clientHeight * 0.5);
	gradient.addColorStop(0, `#fc7c32${opacity.length === 0 ? `0` : ``}${opacity}`);
	gradient.addColorStop(1, `#fc6f1e00`);

	// Fill with gradient
	headerCanvasCtx.fillStyle = gradient;
	headerCanvasCtx.fillRect(0, 0, headerCanvasElement.clientWidth, headerCanvasElement.clientHeight);

	for (let i = 0; i < janiFireParticles.length; i++) {

		// Increase the particle X and age
		janiFireParticles[i].x += 5;
		janiFireParticles[i].age += 0.01;

		// Render the particles
		headerCanvasCtx.fillStyle = janiFireParticles[i].color;
		headerCanvasCtx.beginPath();
		headerCanvasCtx.arc(
			janiFireParticles[i].x,
			janiFireParticles[i].y + (Math.sin(janiFireParticles[i].age * janiFireParticles[i].waveFrequency) * janiFireParticles[i].waveAmplitude),
			1,
			0,
			2 * Math.PI
		);
		headerCanvasCtx.fill();
	}

	// Have a chance of generating a particle
	if (Math.random() < 0.1) {
		janiFireParticles.push({
			x: 0,
			y: Math.random() * headerCanvasElement.clientHeight,
			age: 0,
			waveFrequency: Math.floor(Math.random() * 10),
			waveAmplitude: Math.floor(Math.random() * 20) + 5,
			color: `#fc7c32${opacity.length === 0 ? `0` : ``}${opacity}` // Make the color of the particle the same as the gradients at the moment of creation
		});
	}

	// Request the next frame
	setTimeout(drawJaniCanvasFrame, 50);
}