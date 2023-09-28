import Node from "../nodes/Node";
import Relations from "./Relations";
import RelationDTO from '../../dtos/RelationDTO';
import CreatorRelation from './CreatorRelation';
import MemberRelation from './MemberRelation';

export default abstract class Relation {
	abstract type: Relations;

	from: Node
	to: Node

	nodeInRelation = (node: Node): boolean => [this.from, this.to].some((n) => n.id === node.id);

	getOtherNodeInRelation = (node: Node): Node =>
		this.from.id === node.id ? this.to : this.from;

	toString(): string {
		return `(${this.from.id.toUniqueString()})-[${this.type}:${
			this.type
		}]->(${this.to.id.toUniqueString()})`;
	}

	toDTO(depth : number): RelationDTO {
		const dto: RelationDTO = new RelationDTO();

		dto.type = this.type;

		if (depth == 1) return dto;

		dto.from = this.from.toDTO(depth + 1);
		dto.to = this.to.toDTO(depth + 1);

		return dto;
	}

}