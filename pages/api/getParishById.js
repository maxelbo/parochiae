import { table, getMinifiedRecords } from "../../lib/airtable";

export default async function getParishById(req, res) {
  const { id } = req.query;
  console.log({ id });
  try {
    if (id) {
      const findParishRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      console.log({ findParishRecords });
      if (findParishRecords.length > 0) {
        const records = getMinifiedRecords(findParishRecords);
        res.status(200).json({ message: `Retrieved parish ${id}`, records });
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
