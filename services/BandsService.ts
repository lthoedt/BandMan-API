import { getSession } from '../database/dbl';
import { Band } from '../database/nodes/Band'
import { Nodes } from "../database/nodes/Nodes";
import Relations from "../database/relations/Relations";

export async function createBand(band: Band, musicianId: string): Promise<boolean> {
  try {
    const session = getSession();

    const result = await session.run(`
		CREATE (b:${band.type} {${band.toString()}})
		WITH (b)
		MATCH (m:${Nodes.Musician})
		WHERE m.id="${musicianId}"
		CREATE (m)-[rc:${Relations.Creator}]->(b), (m)-[rm:${Relations.Member}]->(b)
		`)

    session.close();
    
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
}