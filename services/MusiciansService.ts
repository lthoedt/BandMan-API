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