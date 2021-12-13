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