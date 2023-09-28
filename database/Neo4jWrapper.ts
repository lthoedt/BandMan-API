import Guid from "../entities/Guid";
import NodeFactory from "../factories/NodeFactory";
import RelationFactory from "../factories/RelationFactory";
import { getSession } from "./dbl";
import Band from "./nodes/Band";
import Node from "./nodes/Node";
import Nodes from "./nodes/Nodes";
import Relation from "./relations/Relation";
import Relations from "./relations/Relations";
import { toNumber, Record } from "neo4j-driver-core";

export default abstract class Neo4jWrapper {
    static async executeQuery(query : string) {
        const session = getSession();
        await session.run(query);
        session.close();
    }

	/**
	 * Adds a node and its relations to the database.
	 * @param node 
	 */
	static async create(node: Node) {
		let query = ``;

		query += `CREATE (${node.id.toUniqueString()}:${
			node.type
		} {${node.toString()}}) \n`;

		if (node.hasRelations()) {
			query += `WITH (${node.id.toUniqueString()}) \n`;

			query += `MATCH `;

			for (const [id, relations] of node.relations) {
				query += `(${id.toUniqueString()} {id: '${id}'}) \n`; // TODO: get a unique name.

				for (const relation of relations) {
					query += `CREATE ${relation.toString()} \n`;
				}
			}
		}

        await this.executeQuery(query);
	}

	static parseRelationsFromQuery(records : Record[]) : Map<Guid, Node> {
		const cachedNodes :  Map<Guid, Node> = new Map<Guid, Node>();
		const resultNodes : Map<Guid, Node> = new Map<Guid, Node>();

        // Map.prototype.has = function(key : Guid) => 

		for (const record of records.values()) {
			let relation : Relation | null = null;
			
			let mainNode : Node | null = null;
			let otherNode : Node | null = null;

			let start : number | null = null;
			let end : number | null = null;

			for (const element of record.values()) {
				// Node is a relation
				if (element.hasOwnProperty("end") && element.hasOwnProperty("start")) {
					relation = RelationFactory.generate(Relations[element['type'] as keyof typeof Relations]);
					start = toNumber(element['start']);
					end = toNumber(element['end']);
					// Node is a Node.
				} else {
                    //@ts-ignore
					// This sucks but Map doesnt work with Guid as key.
					const nodeId : Guid = new Guid(element['properties']['id']).toString();

					let tempNode : Node;

					if (cachedNodes.has(nodeId)) {
						tempNode = cachedNodes.get(nodeId)!;
					} else {
						const nodeClass : typeof Node = NodeFactory.generate(Nodes[element['labels'][0] as keyof typeof Nodes]);

						tempNode = nodeClass.fromQuery(element['properties']);
						tempNode.identity = toNumber(element['identity']);
						
						cachedNodes.set(tempNode.id, tempNode);
					}

					if (mainNode == null) {
						mainNode = tempNode;
					} else {
						otherNode = tempNode;
					}

				}

				if (relation !== null && mainNode !== null && otherNode !== null) {
					switch (mainNode!.identity) {
						case start:
							relation.from = mainNode;
							relation.to = otherNode;
							break;
						case end:
							relation.from = otherNode;
							relation.to = mainNode;
							break;
					}
				}
				
			}
			mainNode!.addRelation(relation!);
			otherNode!.addRelation(relation!);

            // Order here might be important so this should maby be an array later.
			resultNodes.set(mainNode!.id, mainNode!);
		}

		return resultNodes;
	}

	// static parseRelationsFromQuery(mainNode : Node, records : Iterable<Iterable<Object>>) : Node {
	// 	const cachedNodes :  Map<Guid, Node> = new Map<Guid, Node>();

	// 	const relations : Relation[] = [];

	// 	for (const record of records) {
	// 		let relation : Relation | null = null;
	// 		let node : Node | null = null;
	// 		let identity : number | null = null;
	// 		let start : number | null = null;
	// 		let end : number | null = null;

	// 		for (const element of record) {
	// 			// Node is a relation
	// 			if (element.hasOwnProperty("end") && element.hasOwnProperty("start")) {
	// 				relation = RelationFactory.generate(Relations[element['type'] as keyof typeof Relations]);
	// 				start = toNumber(element['start']);
	// 				end = toNumber(element['end']);
	// 				// Node is a Node.
	// 			} else {
	// 				const nodeId : Guid = new Guid(element['properties']['id']);

	// 				if (nodeId.equals(mainNode.id)) continue;

	// 				if (cachedNodes.has(nodeId)) {
	// 					node = cachedNodes.get(nodeId)!;
	// 				} else {
	// 					const nodeClass : typeof Node = NodeFactory.generate(Nodes[element['labels'][0] as keyof typeof Nodes]);
	// 					node  = nodeClass.fromQuery(element['properties']);
	// 					cachedNodes.set(node.id, node);
	// 				}
					
	// 				identity = toNumber(element['identity']);
	// 			}

	// 			if (relation !== null && node !== null) {
	// 				switch (identity) {
	// 					case start:
	// 						relation.from = node;
	// 						relation.to = mainNode;
	// 						break;
	// 					case end:
	// 						relation.from = mainNode;
	// 						relation.to = node;
	// 						break;
	// 				}
	// 			}

	// 			// console.log(element);
	// 		}
	// 		relations.push(relation!);
	// 		mainNode.addRelation(relation!);
	// 	}

	// 	return mainNode;
	// }

}
