import {default as z} from "zod"

const uuid = z
    .string()
    .length(28)

const entityId = z
    .string()
    .length(20)

const name = z.string().max(16)
const max = z.number().positive().min(1)
const current = z.number().positive().min(0)

const postSchema = z.object({
    uuid: uuid,
    name: name,
    max: max
})

const putSchema = z.object({
    uuid: uuid,
    entityId: entityId,
    current: current 
})

export {
    postSchema,
    putSchema
}
