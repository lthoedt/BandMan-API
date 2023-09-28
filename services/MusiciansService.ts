import Nodes from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import Musician from "../database/nodes/Musician";
import DateBaseEntityExistsException from "../exceptions/dtos/DateBaseNotFoundException";
import DatabaseNoRecordsUpdated from "../exceptions/dtos/DatabaseNoRecordsUpdated";
import LoginEntity from "../entities/LoginEntity";
import Guid from "../entities/Guid";
import Neo4jWrapper from "../database/Neo4jWrapper";

export async function createMusician(
	musician: Musician,
	password: string
): Promise<void> {
	const session = getSession();

	await session.run(
		`CREATE (n:${
			musician.type
		} {${musician.toString()}, password: "${password}"})`
	);

	await session.close();
}

export async function loginMusician(
	login: LoginEntity
): Promise<Musician | null> {
	const session = getSession();

	const result = await session.run(
		`MATCH (m:${Nodes.Musician})-[r]-(b) WHERE m.email="${login.email}" AND m.password="${login.password}" RETURN m, r, b`
	);

	await session.close();

	if (result.records.length == 0) return null;

	const parsedResult =  Neo4jWrapper.parseRelationsFromQuery(result.records);

	return parsedResult.values().next().value;
}

export async function getMusician(id: Guid): Promise<Musician | Error> {
	const session = getSession();

	const result = await session.run(
		`MATCH (${Nodes.Musician}:${
			Nodes.Musician
		} {id: '${id.toString()}'}) RETURN ${Nodes.Musician}`
	);

	await session.close();

	if (result.records.length == 0) throw new DatabaseNoRecordsUpdated();

	const musician: Musician = Musician.fromQuery(
		result.records[0].toObject()[Nodes.Musician]["properties"]
	);

	return musician;
}

/**
 * Checks if a musician exists.
 * @param musicianId Either Guid or an email.
 * @param email Wether to use Id or Email.
 * @returns False if the musician doesnt exist.
 * @throws DateBaseEntityExistsException if the musician exists.
 */
export async function musicianExists(
	musicianId: string | Guid,
	email: boolean = false
): Promise<boolean | Error> {
	const session = getSession();

	const prop = email ? "email" : "id";
	const result = await session.run(
		`MATCH (m:${Nodes.Musician}) WHERE m.${prop}="${musicianId}" RETURN m`
	);

	await session.close();

	if (result.records.length > 0) {
		throw new DateBaseEntityExistsException(
			`Musician with ${prop} '${musicianId}' exists.`
		);
	}

	return false;
}
