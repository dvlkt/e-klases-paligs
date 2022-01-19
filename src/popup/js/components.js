export class Switch {
	element = null;
	value = true;
	onClickFunction = null;

	constructor(element, defaultValue = true) {
		this.element = element;

		this.value = defaultValue;
		this.element.className = `switch switch-${this.value ? `on` : `off`}`;
		
		element.addEventListener(`click`, () => {
			this.value = !this.value;
			this.element.className = `switch switch-${this.value ? `on` : `off`}`;

			if (this.onClickFunction !== null) {
				this.onClickFunction();
			}
		});
	}

	setValue(newValue) {
		this.value = newValue;
		this.element.className = `switch switch-${this.value ? `on` : `off`}`;
	}

	setOnClickFunction(newFunction) {
		this.onClickFunction = newFunction;
	}
}

export class Slider {
	element = null;
	isGrabbed = false;

	minValue = 0;
	maxValue = 1;

	value = 0;
	percentage = 0;

	onChangeFunction = null;

	constructor(element, minValue, maxValue, defaultValue = 0) {
		this.element = element;

		this.minValue = minValue;
		this.maxValue = maxValue;
		this.value = defaultValue;

		this.element.children[0].addEventListener(`mousedown`, (event) => {
			this.isGrabbed = true;
		});
		document.addEventListener(`mousemove`, (event) => {
			if (this.isGrabbed) {
				if (event.clientX < this.element.offsetLeft) {
					this.value = 0;
				} else if (event.clientX > this.element.offsetLeft + this.element.clientWidth) {
					this.value = this.maxValue;
				} else {
					this.value = Math.round(((event.clientX - this.element.offsetLeft) / this.element.clientWidth) * this.maxValue);
				}

				this._update();
			}
		});
		window.addEventListener(`mouseup`, (event) => {
			if (this.isGrabbed) {
				this.isGrabbed = false;
			}
		});
	}

	_update() {
		this.percentage = this.value * (100 / this.maxValue);
		this.element.children[0].style.left = `${(this.element.clientWidth * (this.percentage / 100)) - 7.5}px`;

		this.onChangeFunction();
	}

	setValue(newValue) {
		this.value = newValue;
		this._update();
	}

	setOnChangeFunction(newFunction) {
		this.onChangeFunction = newFunction;
	}
}