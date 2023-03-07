import Validator from './Validator';

export default class StringAndSpaceOnlyValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			if (value.match(/^([a-zA-Z]+ *)+$/g) == null) {
				return "Can only contain letters and spaces.";
			}
		}
	];
}
