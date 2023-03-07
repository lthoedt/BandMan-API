import DTO from "./DTO";
import "reflect-metadata";
import StringAndSpaceOnlyValidator from "./validators/stringAndSpaceOnlyValidator";
import RequiredValidator from "./validators/RequiredValidator";
import MaxLengthValidator from "./validators/MaxLengthValidator";
import { validateWith, applyValidators, buildDTO } from "./decorators/FieldDecorator";

export default class NameDTO extends DTO {

	@validateWith(RequiredValidator, StringAndSpaceOnlyValidator)
	firstname: string = "";

	@validateWith(StringAndSpaceOnlyValidator)
	insertion: string = "";

	@validateWith(
		RequiredValidator,
		StringAndSpaceOnlyValidator,
		MaxLengthValidator
	)
	lastname: string = "";

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any) : NameDTO | Error {};
}