// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import app, { getUserDocument }  from "../../core/firebase"
import PostSchema from "../../core/schemas"

type Data = {
  progress_id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var parsedBody = PostSchema.parse(JSON.parse(req.body))
  } catch(err){
    return res.status(400).json({error: err.issues[0].message})
  }

  try {
    var user_doc = await getUserDocument(parsedBody.uuid)
    console.log(user_doc)
  } catch(err) {
    return res.status(400).json({error: err.message})
  }

  return res.status(200).json({})
}
