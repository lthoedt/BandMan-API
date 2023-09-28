import Nodes from "./Nodes";
import Relation from "../relations/Relation";
import Guid from "../../entities/Guid";
import DTO from "../../dtos/DTO";
import Relations from "../relations/Relations";
import RelationDTO from "../../dtos/RelationDTO";

export default abstract class Node {
	id: Guid;
	identity: Number; // Internal neo4j value.

	type: Nodes;

	relations: Map<Guid, Relation[]> = new Map();

	static fromDTO(dto: DTO): Node {
		throw new Error("Unimplemented");
	}

	// TODO: Convert id.
	static fromQuery(result : any) :  Node {
		throw new Error("Unimplemented");
	}

	protected toDTO<T extends DTO>(dto : T, depth : number) : T {
		// TODO: Auto convert relations.
		dto.id = this.id;
		dto.relations = new Map<Guid, RelationDTO[]>;

		for (const entry of this.relations.entries()) {
			const guid : Guid = entry[0];
			const relations : Relation[] = entry[1];
			dto.relations.set(guid, relations.map((r) => r.toDTO(depth)))
		}

		return dto;
	}

	// protected relationsToDTO = () : Map<Guid, RelationDTO> => this.relations.map()

	hasRelations = (): boolean => this.relations.size > 0;

	addRelation(relation: Relation) {
		if (!relation.nodeInRelation(this)) return; // Only keep relations related to this node.

		const otherNode: Node = relation.getOtherNodeInRelation(this);

		const relations: Relation[] = this.relations.get(otherNode.id) ?? [];

		relations.push(relation);

		this.relations.set(otherNode.id, relations);
	}

	equals = (other : Node) : boolean => this.id.equals(other.id);
	
	abstract toString(): string;
	
	public generateId(): Guid {
		this.id = new Guid();
		return this.id;
	}
}