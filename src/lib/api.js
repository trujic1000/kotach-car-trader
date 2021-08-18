import client from "./sanity";
import {getAsString, transformData} from "../utils";

// helper functions
function getValueStr(value) {
  const str = getAsString(value);
  return str || "all";
}

function getValueNumber(value) {
  const str = getValueStr(value);
  const number = parseInt(str);
  return isNaN(number) ? "all" : number;
}

// API
export async function getMakes() {
  const query = `*[_type == 'car' ] | order(make) {make}`;
  const res = await client.fetch(query);
  const data = transformData({res, prop: "make"});
  return data;
}

export async function getModels(make) {
  const query = `*[_type == "car" && make == $make] | order(model) {model}`;
  const params = {make};
  const res = await client.fetch(query, params);
  const data = transformData({res, prop: "model"});
  return data;
}

export async function getCars(query) {
  const page = parseInt(query.page) || 1;
  const rowsPerPage = parseInt(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const carQuery = `*[_type == "car" &&
  ($make == "all" || make == $make)&&
  ($model == "all" || model == $model) && 
  ($minPrice == "all" || $minPrice <= price) && 
  ($maxPrice == "all" || $maxPrice >= price)
 ] | order(price)`;
  const params = {
    make: getValueStr(query.make),
    model: getValueStr(query.model),
    minPrice: getValueNumber(query.minPrice),
    maxPrice: getValueNumber(query.maxPrice),
  };

  const carsPromise = client.fetch(`${carQuery} [$start...$end]`, {
    ...params,
    start: offset,
    end: offset + rowsPerPage,
  });
  const totalRowsPromise = client.fetch(`count(${carQuery})`, params);

  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);
  return {cars, totalPages: Math.ceil(totalRows / rowsPerPage)};
}

export async function getCarById(id) {
  const query = `*[_type == "car" && _id == $id]`;
  const params = {id};
  const data = await client.fetch(query, params);
  return data[0];
}

export async function getFAQ() {
  const query = `*[_type == "faq"] {_id, question, answer}`;
  const data = await client.fetch(query);
  return data;
}
