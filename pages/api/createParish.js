const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base("parishes");
console.log({ table });

export default async function createParish(req, res) {
  console.log({ req });
  const findParishRecords = await table
    .select({
      filterByFormula: `id="0"`,
    })
    .firstPage();
  if (findParishRecords.length > 0) {
    const records = findParishRecords.map((record) => {
      return {
        ...record.fields,
      };
    });
    res.status(200).json({ records, message: "Parish already exists" });
  } else {
    try {
      res.status(200).json({ message: "create a record" });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
