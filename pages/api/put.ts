// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setEntityProgress }  from "../../core/firebase"
import { putSchema } from "../../core/schemas"

type Data = {
  progress_id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var parsedBody = putSchema.parse(JSON.parse(req.body))
  } catch(err){
    return res.status(400).json({error: err})
  }

  try {
    var entityId = await setEntityProgress(parsedBody.uuid, parsedBody.entityId, parsedBody.current)
  } catch(err) {
    return res.status(400).json({})
  }

  return res.status(200).json({entityId: entityId})
}
