import db from '../db';

export default async (record) => {
  console.log('add ezuiry api called', record);
  const res = await db.execute(async ({ insert }) => {
    const insertRes = await insert('UserEnquiry', record);
    return insertRes;
  });
  return res;
};
