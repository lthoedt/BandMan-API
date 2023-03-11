import DTO from "./DTO";
import {
	validateWith,
	applyValidators,
	buildDTO,
} from "./decorators/FieldDecorator";
import RequiredValidator from "./validators/RequiredValidator";
import DateValidator from "./validators/DateValidator";

export default class BandDTO extends DTO {
	@validateWith(RequiredValidator)
	name: string = "";

	@validateWith(RequiredValidator, DateValidator)
	originateDate: Date = new Date();

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any): BandDTO {};
}
