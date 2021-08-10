import {openDB} from "../openDB";

// TODO: define propTypes here and export it -- fails for no reason now
// export const makeType = PropTypes.shape({
//   make: PropTypes.string,
//   count: PropTypes.number,
// });

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all(`
    SELECT make, COUNT(*) as count
    FROM car
    GROUP BY make
  `);
  return makes;
}
