import Nodes from "../database/nodes/Nodes";
import { getSession } from "../database/dbl";
import Album from "../database/nodes/Album";
import { createArtistsIfNotExist } from "./ArtistService";
import { createLabelIfNotExist } from "./LabelService";
import { createGenreIfNotExist } from "./GenreService";
import { createImageIfNotExist } from "./ImageService";
import Relations from "../database/relations/Relations";
import Artist from "../database/nodes/Artist";
import Guid from "../entities/Guid";

export async function albumExists(id: Guid, spotifyApiId: string) {
	const session = getSession();

	if (!id) id=new Guid();
	if (!spotifyApiId) spotifyApiId="";

	try {
		const result = await session.run(
			`MATCH (a:${Nodes.Album}) WHERE a.id="${id}" OR a.spotifyApiId="${spotifyApiId}" RETURN a`
		)
		await session.close();
		return result.records.length != 0;
	} catch {
		return false;
	}
}

export async function createAlbum(album: Album): Promise<Album> {
	album.generateId();

	album.cover = await createImageIfNotExist(album.cover);
	album.artists = await createArtistsIfNotExist(album.artists);
	album.label = await createLabelIfNotExist(album.label);
	album.genre = await createGenreIfNotExist(album.genre);

	try {
		let query = `
		CREATE
			(album:${Nodes.Album} {${album.toString()}})
		`;

		if (album.cover) query += `
			WITH(album)
			MATCH (cover:${Nodes.Image})
			WHERE cover.url = "${album.cover.url}"
			CREATE (album)-[rc:${Relations.Cover}]->(cover)
		`;

		if (album.label) query += `
			WITH(album)
			MATCH (label:${Nodes.Label})
			WHERE label.id = "${album.label.id}"
			CREATE (album)-[rl:${Relations.Label}]->(label)
		`;

		if (album.genre) query += `
			WITH(album)
			MATCH (genre:${Nodes.Genre})
			WHERE genre.name = "${album.genre.name}"
			CREATE (album)-[rg:${Relations.Genre}]->(genre)
		`;

		if (album.artists) query += `
			WITH(album)

			${Artist.getArtistsRelationQuery(album.artists)}

			WITH(album)

			CREATE (artist)-[raa:${Relations.Player}]->(album)
		`;

		const session = getSession();
		const result = await session.run(query);
		await session.close();
		return album;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createAlbumIfNotExist(album: Album): Promise<Album> {
	return (await albumExists(album.id, album.spotifyApiId))
		? album
		: createAlbum(album);
}