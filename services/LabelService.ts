import { Nodes } from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import { Label } from "../database/nodes/Label";

export async function labelExists(id: string): Promise<boolean> {
	try {
		const session = getSession();

		const result = await session.run(
			`MATCH (a:${Nodes.Label}) WHERE a.id="${id}" RETURN a`
		)

		session.close();

		return result.records.length != 0;
	} catch {
		return false;
	}
}

export async function createLabel(label: Label): Promise<Label> {
    label.generateId();

	try {
		const session = getSession();

		const result = await session.run(`
			CREATE
                (lb:${Nodes.Label} {${label.toString()}})
		`)
		
		session.close();

		return label;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createLabelIfNotExist(label: Label): Promise<Label> {
	if (!label) return null;
    return (await labelExists(label.id))
	? label
	: createLabel(label);   
}