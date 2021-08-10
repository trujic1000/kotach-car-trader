import {getModels} from "../../database/getModels";
import {getAsString} from "../../lib/getAsString";

export default async function models(req, res) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
