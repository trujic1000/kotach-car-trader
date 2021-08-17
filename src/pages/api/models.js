import {getModels} from "../../lib/api";
import {getAsString} from "../../utils";

export default async function models(req, res) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
