const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base("parishes");
console.log({ table });

export default async function createParish(req, res) {
  console.log({ req });
  if (req.method === "POST") {
    const { id, name, address, ward, distance, imgUrl, votes } = req.body;
    try {
      const findParishRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      if (findParishRecords.length > 0) {
        const records = findParishRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res
          .status(200)
          .json({ message: "This parish already exists", records });
      } else {
        if (!id || !name || !address || !ward || !distance || !imgUrl) {
          res.status(400).json({
            message: "Missing one or more required fields",
          });
          return;
        }
        const createRecords = table.create(
          [
            {
              fields: {
                id,
                name,
                address,
                ward,
                distance,
                imgUrl,
                votes,
              },
            },
          ],
          function (err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(record.getId());
          }
        );
        // const records = createRecords.map((record) => {
        //   return {
        //     ...record.fields,
        //   };
        // });
        res.status(200).json({
          message: "Created a new parish",
          // records
        });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
