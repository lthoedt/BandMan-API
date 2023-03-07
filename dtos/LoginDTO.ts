import DTO from "./DTO";
import { validateWith, applyValidators, buildDTO } from './decorators/FieldDecorator';
import EmailValidator from './validators/EmailValidator';
import RequiredValidator from "./validators/RequiredValidator";
export default class LoginDTO extends DTO {

	@validateWith(RequiredValidator, EmailValidator)
	email: string = "";

	@validateWith(RequiredValidator)
	password: string = "";

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any): LoginDTO | Error {}
}
