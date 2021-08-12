import {getAsString} from "../lib/getAsString";
import {openDB} from "../openDB";

const mainQuery = `
  FROM car
  WHERE (@make is NULL OR @make = make)
  AND (@model is NULL OR @model = model)
  AND (@minPrice is NULL OR @minPrice <= price)
  AND (@maxPrice is NULL OR @maxPrice >= price)
`;

export async function getPaginatedCars(query) {
  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    "@make": getValueStr(query.make),
    "@model": getValueStr(query.model),
    "@minPrice": getValueNumber(query.minPrice),
    "@maxPrice": getValueNumber(query.maxPrice),
  };

  const db = await openDB();
  const carsPromise = db.all(
    ` SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`,
    {
      ...dbParams,
      "@rowsPerPage": rowsPerPage,
      "@offset": offset,
    },
  );

  const totalRowsPromise = db.all(
    ` SELECT COUNT(*) as count ${mainQuery}`,
    dbParams,
  );

  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);
  return {cars, totalPages: Math.ceil(totalRows[0].count / rowsPerPage)};
}

function getValueStr(value) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : str;
}

function getValueNumber(value) {
  const str = getValueStr(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}
