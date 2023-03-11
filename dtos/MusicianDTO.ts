import DTO from "./DTO";
import NameDTO from './NameDTO';
import { applyValidators, validateWith, buildDTO } from './decorators/FieldDecorator';
import EmailValidator from "./validators/EmailValidator";
import RequiredValidator from './validators/RequiredValidator';

export default class MusicianDTO extends DTO {
	name: NameDTO = new NameDTO();

	@validateWith(RequiredValidator)
	dateOfBirth: Date;

	@validateWith(RequiredValidator, EmailValidator)
	email: string;

	@validateWith(RequiredValidator)
	password: string;

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any): MusicianDTO | Error {}
}
