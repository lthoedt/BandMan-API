import DTO from "./DTO";
import NameDTO from "./NameDTO";
import { applyValidators, validateWith, buildDTO } from './decorators/FieldDecorator';
import EmailValidator from "./validators/EmailValidator";
import RequiredValidator from "./validators/RequiredValidator";
import EqualValidator from "./validators/EqualValidator";
import DateValidator from './validators/DateValidator';

const pswValidator = new EqualValidator();

export default class CreateDTO extends DTO {
	id: string = "";

	name: NameDTO = new NameDTO();

	@validateWith(RequiredValidator, DateValidator)
	dateOfBirth: Date = new Date();

	@validateWith(RequiredValidator, EmailValidator)
	email: string = "";

	@validateWith(RequiredValidator, pswValidator)
	password: string = "";

	@validateWith(RequiredValidator, pswValidator)
	passwordRepeated: string = "";

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any) : CreateDTO | Error {};
}