import Validator from './Validator';
export default class RequiredValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			if (value == null) return "Cannot be null.";
			if (value == undefined) return "Cannot be undefined.";
			if (value.length == 0) return "Cannot be empty.";
		}
	];
}
