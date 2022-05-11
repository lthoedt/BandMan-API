import { Song } from '../database/nodes/Song';
import { session } from '../database/dbl';
import { Nodes } from "../database/nodes/Nodes";
import Relations from "../database/relations/Relations";

export async function searchSong(search: string): Promise<Array<Song>> {

  try {
    const result = await session.run(`
		MATCH (s:${Nodes.Song})
		WHERE s.title=~ '.*${search}.*'
		RETURN s
	`)
    return result.records.map((songRecord: any) => Song.fromQuery(songRecord));
  } catch (err) {
    console.log(err)
    return null;
  }
}