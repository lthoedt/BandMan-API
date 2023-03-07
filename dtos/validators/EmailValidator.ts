import Validator from "./Validator";
export default class EmailValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			var validRegex =
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if (!value.match(validRegex)) {
				// TODO: actually check via ze webs.
				return "Invalid email address";
			}
		},
	];
}
