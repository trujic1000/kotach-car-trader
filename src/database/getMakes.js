import {openDB} from "../openDB";
import {client} from "../lib/sanity";

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all(`
    SELECT make, COUNT(*) as count
    FROM car
    GROUP BY make
  `);
  return makes;
}

export async function getMakesSanity() {
  const query = "*[_type == 'car' ] | order(make) {make}";
  const res = await client.fetch(query);
  const map = res.reduce(
    (acc, curr) => acc.set(curr.make, (acc.get(curr.make) || 0) + 1),
    new Map(),
  );
  const data = [...map.entries()];
  return data;
}
