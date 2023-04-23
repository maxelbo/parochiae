import { findRecordByFilter } from "../../lib/airtable";

export default async function getParishById(req, res) {
  const { id } = req.query;
  console.log({ id });
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length > 0) {
        res.status(200).json({
          statusCode: 200,
          message: `Retrieved parish with id ${id}`,
          records,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: `No parish with id ${id}`,
        });
        return;
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Missing required fields: id",
      });
      return;
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
