import { fetchParishes } from "../../lib/parishes";

export default async function getParishesByLocation(req, res) {
  try {
    const { latLong, limit } = req.query;
    const parishes = await fetchParishes(latLong, limit);
    res.status(200).json(parishes);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
