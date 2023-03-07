import neo4j, { Session } from "neo4j-driver";

export const driver = neo4j.driver(
  "neo4j://localhost:7687",
  neo4j.auth.basic("MusicMan", "Password123!")
);

export function getSession(): Session {
  return driver.session({
    database: "BandMan",
  });
}

export async function init() {
  try {
  } finally {
    // await session.close()
  }
  // on application exit:
  // await driver.close()
}