import client from "./sanity";

export async function getMakes() {
  const query = "*[_type == 'car' ] | order(make) {make}";
  const res = await client.fetch(query);
  const map = res.reduce(
    (acc, curr) => acc.set(curr.make, (acc.get(curr.make) || 0) + 1),
    new Map(),
  );
  const data = [...map.entries()];
  return data;
}
