import { Nodes } from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import { Artist } from "../database/nodes/Artist";

export async function artistExists(id: string, spotifyApiId: string): Promise<boolean> {
	try {
		const session = getSession();
		const result = await session.run(
			`MATCH (a:${Nodes.Artist}) WHERE a.spotifyApiId="${id}" OR a.id="${spotifyApiId}" RETURN a`
		)
		session.close();
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
		session.close();

		return artist;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createArtistsIfNotExist(artists: Array<Artist>): Promise<Artist[]> {
	return await Promise.all(
		artists.map(async (artist: Artist) =>
			(await artistExists(artist.id, artist.spotifyApiId))
				? artist
				: await createArtist(artist)
		));
}