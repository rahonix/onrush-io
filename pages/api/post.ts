// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createProgressEntity }  from "../../core/firebase"
import { postSchema } from "../../core/schemas"

type Data = {
  progress_id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var parsedBody = postSchema.parse(JSON.parse(req.body))
  } catch(err){
    return res.status(400).json({error: err})
  }

  try {
    var entityId = await createProgressEntity(parsedBody.uuid, parsedBody.max)
  } catch(err) {
    return res.status(400).json({})
  }
  console.log(entityId)
  return res.status(200).json({entityId: entityId})
}
