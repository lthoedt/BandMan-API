import Relations from "../database/relations/Relations";
import Guid from "../entities/Guid";
import DTO from "./DTO";
import {
	applyValidators,
	buildDTO,
} from "./decorators/FieldDecorator";
import Node from "../database/nodes/Node";

export default class RelationDTO extends DTO {
	type: Relations;
	to? : DTO;
	from? : DTO;

	// @ts-ignore
	@applyValidators
	// @ts-ignore
	@buildDTO
	// @ts-ignore
	static fromJSON(json: any): RelationDTO | Error {}

	toJSON(originalId?: Guid) {
		const result: { type: string; from?: Object; to?: Object } = {
			type: this.type.toString(),
		};

		if (this.from != null && this.to != null) {
			result.from = this.from.id.toString();
			result.to = this.to.id.toString(); 
		}

		return result;
	}
}
