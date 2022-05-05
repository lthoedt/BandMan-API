import { session } from '../database/dbl';
import { Band } from '../database/nodes/Band'

export async function createBand(band : Band) : Promise<boolean> {
    
    const result = await session.run(
      `CREATE (n:${band.type} {${band.toString()}})`
    )

    return true;
}