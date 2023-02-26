import Nodes from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import Artist from "../database/nodes/Artist";

export async function artistExists(id: string, spotifyApiId: string, name: string): Promise<boolean> {
	if (!id) id="";
	if (!spotifyApiId) spotifyApiId="";
	if (!name) name="";
	try {
		const session = getSession();
		let query = `
			MATCH (a:${Nodes.Artist})
			WHERE a.spotifyApiId="${id}"
			OR a.id="${spotifyApiId}"
			OR a.name="${name}"
			RETURN a`;
		const result = await session.run(
			query
		)
		console.log(query);
		console.log(result);
		console.log(result.records.length);
		await session.close();
		return result.records.length != 0;
	} catch {
		return false;
	}
}

export async function createArtist(artist: Artist): Promise<Artist> {
	artist.generateId();

	try {
		let query = `
			CREATE
				(a:${Nodes.Artist} {${artist.toString()}})
		`
		if (artist.thumbnail) query += `, (th:${Nodes.Image} {${artist.thumbnail.toString()}})`;

		const session = getSession();
		const result = await session.run(query)
		await session.close();

		return artist;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createArtistsIfNotExist(artists: Array<Artist>): Promise<Artist[]> {
	return await Promise.all(
		artists.map(async (artist: Artist) =>
			(await artistExists(artist.id, artist.spotifyApiId, artist.name))
				? artist
				: await createArtist(artist)
		));
}