import { Login } from '../database/entities/Login';
import { Nodes } from '../database/nodes/Nodes';
import { session } from '../database/dbl';
import { Musician } from '../database/nodes/Musician'

export async function createMusician(musician: Musician, password: string): Promise<boolean> {

  // TODO: not very nice...
  try {
    const result = await session.run(
      `CREATE (n:${musician.type} {${musician.toString()}, password: "${password}"})`
    )
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function loginMusician(login : Login): Promise<Musician> {
  try {
    const result = await session.run(
      `MATCH (m:${Nodes.Musician}) WHERE m.email="${login.email}" AND m.password="${login.password}" RETURN m`
    )

    if (result.records.length == 0) return null;
    
    const musician:Musician = Musician.fromQuery(result.records[0].toObject()['m']['properties']);

    return musician;
  } catch(err) {
    console.log(err);
  }
  return null;
}

export async function musicianExists(musicianId : string, email : boolean = false) : Promise<boolean> {
  try {
    const prop = ( email ) ? "email" : "id";
    const result = await session.run(
      `MATCH (m:Musician) WHERE m.${prop}="${musicianId}" RETURN m`
    )
    return result.records.length != 0;
  } catch {
    return false;
  }
}