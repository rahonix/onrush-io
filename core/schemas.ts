import {default as z} from "zod"

const uuid = z
    .string()
    .length(28)

const postSchema = z.object({
    uuid: uuid
})

export default postSchema
