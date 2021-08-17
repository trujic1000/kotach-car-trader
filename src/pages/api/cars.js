import {getPaginatedCars} from "../../database/getPaginatedCars";

export default async function cars(req, res) {
  const cars = await getPaginatedCars(req.query);
  res.json(cars);
}
