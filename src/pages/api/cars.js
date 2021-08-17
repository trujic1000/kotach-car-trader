import {getCars} from "../../lib/api";

export default async function cars(req, res) {
  const data = await getCars(req.query);
  res.json(data);
}
