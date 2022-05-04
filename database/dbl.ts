import neo4j from 'neo4j-driver'

import { Band } from './nodes/Band'

const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('MusicMan', "Password123!"))
const session = driver.session({
  database: 'MusicMan'
})

const date: Date = new Date();
date.setFullYear(2020);
date.setMonth(9);
date.setDate(27);

const band1 = new Band();
band1.name = "50/50";
band1.originationDate = date;

export async function init() {
  try {

    await session.run(
      `CREATE OR REPLACE DATABASE MusicMan`
    )

    const result = await session.run(
      `CREATE (n:${band1.type} {${band1.toString()}})`
    )
  
  } finally {
    // await session.close()
  }
  // on application exit:
  // await driver.close()
}