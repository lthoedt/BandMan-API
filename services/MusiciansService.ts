import { session } from '../database/dbl';
import { Musician } from '../database/nodes/Musician'

export async function createMusician(musician: Musician): Promise<boolean> {

  // TODO: not very nice...
  try {
    const result = await session.run(
      `CREATE (n:${musician.type} {${musician.toString()}})`
    )
    return true;
  } catch {
    return false;
  }
}

export async function musicianExists(musicianId : string) : Promise<boolean> {
  try {
    const result = await session.run(
      `MATCH (m:Musician) WHERE m.id="${musicianId}" RETURN m`
    )
    return result.records.length != 0
  } catch {
    return false;
  }
}