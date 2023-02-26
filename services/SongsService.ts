import Song from '../database/nodes/Song';
import { getSession } from '../database/dbl';
import Nodes from "../database/nodes/Nodes";
import Relations from "../database/relations/Relations";
import { createArtistsIfNotExist as createArtistsIfNotExist } from './ArtistService';
import Artist from '../database/nodes/Artist';
import { createImageIfNotExist } from './ImageService';
import { createAlbumIfNotExist } from './AlbumService';

import SongDataApiInterface from '../SongDataApis/songDataApiInterface';

import SpotifyApi from '../SongDataApis/Spotify/SpotifyService';

const songDataApi: SongDataApiInterface = new SpotifyApi();

export async function songExists(id: string, spotifyApiId: string) {
	try {
		const session = getSession();
		const result = await session.run(
			`MATCH (a:${Nodes.Song}) WHERE a.id="${id}" OR a.spotifyApiId="${spotifyApiId}" RETURN a`
		)
		await session.close();
		return result.records.length != 0;
	} catch {
		return false;
	}
}

export async function createSong(song: Song): Promise<Song> {
	try {
		song.generateId();

		song.thumbnail = await createImageIfNotExist(song.thumbnail);
		song.artists = await createArtistsIfNotExist(song.artists);
		song.album = await createAlbumIfNotExist(song.album);

		let query = `
			CREATE
			(song:${song.type} {${song.toString()}})
		`;

		if (song.thumbnail) query += `
			WITH(song)

			MATCH (thumbnail:${Nodes.Image})
			WHERE thumbnail.url = "${song.thumbnail.url}"
			CREATE (song)-[rc:${Relations.Thumbnail}]->(thumbnail)
		`

		if (song.album) query += `
			WITH(song)
			
			MATCH (album:${Nodes.Album})
			WHERE album.id = "${song.album.id}" OR album.spotifyApiId = "${song.album.spotifyApiId}"
			CREATE (song)-[rc:${Relations.Album}]->(album)
		`

		if (song.artists) query += `
			WITH(song)

			${Artist.getArtistsRelationQuery(song.artists)}

			MERGE (artist)-[ras:${Relations.Player}]->(song)
		`
		const session = getSession();
		const result = await session.run(query)
		await session.close();

		return song;
	} catch (err) {
		console.log(err)
	}
	return null;
}

export async function createSongIfNotExist(song: Song): Promise<Song> {
	return (await songExists(song.id, song.spotifyApiId))
		? song
		: createSong(song);
}

export async function searchSong(search: string, resultType: number): Promise<Array<Song>> {

	let songsDB: Song[];
	let songsAPI: Song[]

	let errorCount = 0;

	if (resultType != 1) {
		try {
			const session = getSession();

			const result = await session.run(`
		MATCH(s: ${Nodes.Song})
		WHERE s.title =~ '.*${search}.*'
		RETURN s
			`)

			await session.close();

			songsDB = result.records.map((songRecord: any) => Song.fromQuery(songRecord));
		} catch (err) {
			console.log(err)
			errorCount++;
		}
	}

	if (resultType != 0) {
		try {
			songsAPI = await songDataApi.search(search);
		} catch (err) {
			console.log(err)
			errorCount++;
		}
	}

	if (errorCount == 2) return null;

	switch (resultType) {
		case 0:
			return songsDB;
		case 1:
			return songsAPI;
		case 2:
			return [
				...songsDB,
				...songsAPI
			]
	};
}