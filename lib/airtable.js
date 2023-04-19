const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

export const table = base("parishes");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

export const getMinifiedRecords = (records) =>
  records.map((record) => getMinifiedRecord(record));

export const findRecordByFilter = async (id) => {
  const findParishRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getMinifiedRecords(findParishRecords);
};
