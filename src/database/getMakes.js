import {openDB} from "../openDB";

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all(`
    SELECT make, COUNT(*) as count
    FROM car
    GROUP BY make
  `);
  return makes;
}
