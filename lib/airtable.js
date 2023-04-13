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
