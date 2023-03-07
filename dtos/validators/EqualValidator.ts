import Validator from './Validator';

export default class EqualValidator extends Validator {
	private values : string[] = [];

	validationFunctions = [
		(value: string) => {
			this.values.push(value);

			let currentValue = this.values[0];

			for (const value of this.values) {
				if (currentValue !== value) return "Doesn't match."

				currentValue = value;
			}
		}
	];

	public reset = () => this.values = [];
}
