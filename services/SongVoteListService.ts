import { Nodes } from "../database/nodes/Nodes";
import { session } from "../database/dbl";
import { SongVoteList } from "../database/nodes/SongVoteList";
import Relations from "../database/relations/Relations";

export async function createSongVoteList(songVoteList: SongVoteList, bandId: string): Promise<boolean> {
    try {
        const result = await session.run(`
          	CREATE (svl:${songVoteList.type} {${songVoteList.toString()}})
        	WITH (svl)
			MATCH (b:${Nodes.Band})
			WHERE b.id="${bandId}"
			CREATE (svl)-[rc:${Relations.VotingList}]->(b)
        `)
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
}

export async function bandExists(bandId: string): Promise<boolean> {
  try {
    const result = await session.run(
      `MATCH (b:${Nodes.Band}) WHERE b.id="${bandId}" RETURN b`
    )
    return result.records.length != 0;
  } catch(err) {
    console.log(err)
    return false;
  }
}