import Guid from "../../entities/Guid";
import Validator from "./Validator";
export default class GuidValidator extends Validator {
	validationFunctions = [
		(value: string) => {
			if (!Guid.isValid(value)) return "Not a valid GUID";
		},
	];
}
