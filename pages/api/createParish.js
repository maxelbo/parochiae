import {
  findRecordByFilter,
  table,
  getMinifiedRecords,
} from "../../lib/airtable";

export default async function createParish(req, res) {
  console.log({ req });
  if (req.method === "POST") {
    const { id, name, address, ward, distance, imgUrl, votes } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length > 0) {
          res.status(200).json({
            // message: "This parish already exists",
            records,
          });
        } else {
          if (name) {
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
              function (err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
                records.forEach(function (record) {
                  console.log(record.getId());
                });
              }
            );
            console.log({ createRecords });
            const records = getMinifiedRecords(createRecords);
            res.status(200).json({
              message: "Created a new parish",
              records,
            });
          } else {
            res.status(400).json({
              message: "Missing required fields: name",
            });
            return;
          }
        }
      } else {
        res.status(400).json({
          message: "Missing required fields: id",
        });
        return;
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
