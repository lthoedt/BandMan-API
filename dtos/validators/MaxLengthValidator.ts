import Validator from './Validator';
export default class MaxLengthValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			if (value.length > 8) return "Cannot be more then 8 characters.";
		}
	];
}
