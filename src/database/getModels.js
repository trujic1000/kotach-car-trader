import {openDB} from "../openDB";

export async function getModels(make) {
  const db = await openDB();
  const model = await db.all(
    `
    SELECT model, COUNT(*) as count
    FROM car
    WHERE make = @make
    GROUP BY model
  `,
    {"@make": make},
  );
  return model;
}
