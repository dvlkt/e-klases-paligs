let headerCanvasElement;
let headerCanvasCtx;

window.addEventListener(`pageLoaded`, async () => {
	/*
		Christmas
	*/
	if (await isChristmasToday()) {
		let headerElement = document.querySelector(`.header-second-inner`);

		headerCanvasElement = document.createElement(`canvas`);
		headerCanvasElement.width = headerElement.clientWidth;
		headerCanvasElement.height = headerElement.clientHeight;
		headerElement.appendChild(headerCanvasElement);

		headerCanvasCtx = headerCanvasElement.getContext(`2d`);

		// Make the header dark
		headerElement.className += ` dark-header`;

		// Generate random snowflakes
		for (let i = 0; i < 3; i++) {
			let christmasSnowflakeLayer = [];

			for (let o = 0; o < 25 + Math.random() * 10; o++) {
				christmasSnowflakeLayer.push({
					x: Math.random() * headerCanvasElement.clientWidth,
					y: Math.random() * headerCanvasElement.clientHeight,
					sine: Math.random()
				});
			}

			christmasSnowflakePositions.push(christmasSnowflakeLayer);
		}

		// Start the animation
		drawChristmasCanvasFrame();
	}
	
	/*
		New Year
	*/
	if (await isNewYearToday()) {
		let headerElement = document.querySelector(`.header-second-inner`);

		headerCanvasElement = document.createElement(`canvas`);
		headerCanvasElement.width = headerElement.clientWidth;
		headerCanvasElement.height = headerElement.clientHeight;
		headerElement.appendChild(headerCanvasElement);

		headerCanvasCtx = headerCanvasElement.getContext(`2d`);

		// Make the header dark
		headerElement.className += ` dark-header`;

		// Start the animation
		drawNewYearCanvasFrame();
	}
	
	/*
		Proclamation Day of Latvia
	*/
	if (await isPDLToday()) {
		// TODO
	}
	
	/*
		Jāņi
	*/
	if (await isJaniToday()) {
		let headerElement = document.querySelector(`.header-second-inner`);

		headerCanvasElement = document.createElement(`canvas`);
		headerCanvasElement.width = headerElement.clientWidth;
		headerCanvasElement.height = headerElement.clientHeight;
		headerElement.appendChild(headerCanvasElement);

		headerCanvasCtx = headerCanvasElement.getContext(`2d`);

		// Make the header dark
		headerElement.className += ` dark-header`;

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
	
	const opacityValues = [`30`, `6b`, `ad`, `ff`];

	for (let i = 0; i < christmasSnowflakePositions.length; i++) {
		for (let o = 0; o < christmasSnowflakePositions[i].length; o++) {
			// Move the snowflakes lower
			christmasSnowflakePositions[i][o].y++;

			// Move the snowflakes horizontally along a sine wave
			christmasSnowflakePositions[i][o].x += Math.sin(christmasSnowflakePositions[i][o].sine) / 2;
			christmasSnowflakePositions[i][o].sine += 0.1;

			// Remove the snowflakes that are out of screen
			if (christmasSnowflakePositions[i][o].y >= 66) {
				christmasSnowflakePositions[i].splice(o, 1);
			}

			// Render the snowflakes
			if (christmasSnowflakePositions[i][o] !== undefined) {
				headerCanvasCtx.fillStyle = `#ffffff${opacityValues[i]}`;
				headerCanvasCtx.beginPath();
				headerCanvasCtx.arc(
					christmasSnowflakePositions[i][o].x,
					christmasSnowflakePositions[i][o].y,
					2 - (i * 0.25),
					0,
					2 * Math.PI
				);
				headerCanvasCtx.fill();
			}
		}
	}

	// Have a chance of creating a new snowflake
	if (Math.random() < 0.75) {
		christmasSnowflakePositions[Math.round(Math.random() * 2)].push({ x: Math.random() * headerCanvasElement.clientWidth, y: -2, sine: 0 });
	}

	// Request the next frame
	setTimeout(drawChristmasCanvasFrame, 50);
}

/*
	New year animation
*/
let newYearFireworkTrails = [];
let newYearFireworkTrailParticles = [];
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

	// Update the firework trails
	for (let i = 0; i < newYearFireworkTrails.length; i++) {
		if (newYearFireworkTrails[i] === undefined) {
			break;
		}

		// Turn the trails that have reached their target Y into fireworks
		if (newYearFireworkTrails[i]?.y - newYearFireworkTrails[i]?.targetY < 5) {
			newYearFireworks.push({
				x: newYearFireworkTrails[i]?.x,
				y: newYearFireworkTrails[i]?.y,
				animationProgress: 0,
				color: Math.floor(Math.random() * 7),
				pointCount: Math.floor(Math.random() * 10) + 15
			});

			newYearFireworkTrails.splice(i, 1);

			continue;
		}

		// Decrease the Y position
		newYearFireworkTrails[i].y -= 4;

		// Make the trail spawn in particles
		for (let o = 0; o < Math.floor(Math.random() * 25) + 5; o++) {
			newYearFireworkTrailParticles.push({
				x: newYearFireworkTrails[i]?.x + Math.floor(Math.random() * 4) - 2,
				y: newYearFireworkTrails[i]?.y + Math.floor(Math.random() * 10) - 5,
				opacity: 255,
				xVelocity: Math.floor(Math.random() * 6) - 3
			});
		}
	}

	// Render the firework trail particles
	for (let i = 0; i < newYearFireworkTrailParticles.length; i++) {
		if (newYearFireworkTrailParticles[i] === undefined) {
			break;
		}

		newYearFireworkTrailParticles[i].y += 1;
		newYearFireworkTrailParticles[i].x += newYearFireworkTrailParticles[i].xVelocity / 12;

		if (newYearFireworkTrailParticles[i].opacity >= 10) {
			newYearFireworkTrailParticles[i].opacity -= 10;
		} else {
			newYearFireworkTrailParticles[i].opacity = 0;
		}

		let opacity = newYearFireworkTrailParticles[i].opacity.toString(16);

		headerCanvasCtx.fillStyle = `#ffffff${opacity.length === 1 ? `0` : ``}${opacity}`;
		headerCanvasCtx.beginPath();
		headerCanvasCtx.arc(
			newYearFireworkTrailParticles[i].x,
			newYearFireworkTrailParticles[i].y,
			1,
			0,
			2 * Math.PI
		);
		headerCanvasCtx.fill();

		if (newYearFireworkTrailParticles[i].opacity <= 0) {
			newYearFireworkTrailParticles.splice(i, 1);
			continue;
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