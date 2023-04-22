import {
  findRecordByFilter,
  table,
  // getMinifiedRecords,
} from "../../lib/airtable";

export default async function voteParishById(req, res) {
  if (req.method === "PUT") {
    const { id } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length > 0) {
          const { recordId, votes } = records[0];
          const updateRecords = table.update(
            [
              {
                id: recordId,
                fields: {
                  votes: votes + 1,
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
          // const records = getMinifiedRecords(updateRecords);
          // console.log("minified records from voteParishById", records);
          res.status(200).json({
            message: `Updated votes for id ${id}`,
            // records,
          });
        } else {
          res.status(400).json({
            message: `No parish with id ${id}`,
          });
          return;
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
  } else {
    res.status(400).json({
      message: "Invalid request method",
    });
  }
}
