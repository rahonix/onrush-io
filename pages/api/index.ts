// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createProgressEntity, setEntityProgress } from "../../core/firebase"
import { postSchema, putSchema } from "../../core/schemas"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            var postBody = postSchema.parse(JSON.parse(req.body))
        } catch (err) {
            return res.status(400).json({ error: err })
        }

        try {
            var entityId = await createProgressEntity(postBody.uuid, postBody.name, postBody.max)
        } catch (err) {
            return res.status(400).json({})
        }
        return res.status(200).json({ entityId: entityId })
    }
    else if (req.method === "PUT") {
        try {
            var putBody = putSchema.parse(JSON.parse(req.body))
        } catch (err: any) {
            return res.status(400).json(err.message)
        }

        try {
            await setEntityProgress(putBody.uuid, putBody.entityId, putBody.current)
        } catch (err: any) {
            return res.status(400).json(err.message)
        }
        return res.status(200)
    }
    else {
        return res.status(400).json({})
    }
}
