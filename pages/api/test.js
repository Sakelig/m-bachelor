// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../lib/dbConnect";

export default async function test(req, res) {
  let test = await dbConnect()

  let result = await test.query('SELECT * FROM users;')

  let testing = JSON.parse(JSON.stringify(result.rows[0]))

  console.log("result:", testing)


  // console.log(test)
  res.status(200).json(result.rows[0]);
}
