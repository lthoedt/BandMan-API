import Node from "../database/nodes/Node";
import Relation from "../database/relations/Relation";
import Guid from "../entities/Guid";
import { validateWith } from "./decorators/FieldDecorator";
import GuidValidator from "./validators/GuidValidator";
import RelationDTO from './RelationDTO';

export default abstract class DTO {
    @validateWith(GuidValidator)
	id: Guid = new Guid();

    relations: Map<Guid, RelationDTO[]>;

	static fromJSON(json: any) : DTO | Error {
        throw new Error("Method not implemented.");
    }

    protected toJSONNodeElements() {
		const result: { id: string; relations: Object[] } = {
			id: this.id.toString(),
			relations: [],
		};

		for (const [id, relations] of this.relations)
			for (const relation of relations)
				result.relations.push(relation.toJSON(this.id));

		return result;
	}

    abstract toJSON(): Object;
}