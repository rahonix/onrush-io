import {default as z} from "zod"

const uuid = z
    .string()
    .length(28)

const entityId = z
    .string()
    .length(20)

const number = z.number()


const postSchema = z.object({
    uuid: uuid,
    max: number
})

const putSchema = z.object({
    uuid: uuid,
    entityId: entityId,
    current: number 
})

export {
    postSchema,
    putSchema
}
