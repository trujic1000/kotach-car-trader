import client from "./sanity";
import {transformData} from "../utils";

export async function getMakes() {
  const query = `*[_type == 'car' ] | order(make) {make}`;
  const res = await client.fetch(query);
  const data = transformData({res, prop: "make"});
  return data;
}

export async function getModels(make) {
  console.log(make);
  const query = `*[_type == "car" && make == $make] | order(model) {model}`;
  const params = {make};
  const res = await client.fetch(query, params);
  const data = transformData({res, prop: "model"});
  return data;
}
