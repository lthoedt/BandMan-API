import { Nodes } from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import { Genre } from "../database/nodes/Genre";

export async function genreExists(name: string): Promise<boolean> {
	try {
		const session = getSession();
		const result = await session.run(
			`MATCH (g:${Nodes.Genre}) WHERE g.name="${name}" RETURN g`
		)
		session.close();
		return result.records.length != 0;
	} catch(err) {
		console.log(err);
	}
	return false;
}

export async function createGenre(genre: Genre): Promise<Genre> {
	try {
		const session = getSession();

		const result = await session.run(`
			CREATE
                (lb:${Nodes.Genre} {${genre.toString()}})
		`)
		
		session.close();

		return genre;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createGenreIfNotExist(genre: Genre): Promise<Genre> {
	if (!genre) return null;
    return (await genreExists(genre.id))
	? genre
	: createGenre(genre);   
}