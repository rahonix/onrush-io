// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { app } from "../../core/firebase"
import PostSchema from "../../core/schemas"

type Data = {
  progress_id: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const parsed_body = PostSchema.parse(JSON.parse(req.body))
  } catch(err){
    console.log(err)
    return res.status(400).json({error: err.issues[0].message})
  }
  return res.status(200).json({})
}
