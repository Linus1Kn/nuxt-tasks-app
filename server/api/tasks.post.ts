import { InsertTasksSchema } from "../db/schema"
import { db } from "../db"
import { tasks } from "../db/schema"

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, InsertTasksSchema.safeParse)

    if (!result.success) {
        return sendError(event, createError({
            statusCode: 422,
            statusMessage: "Invalid task"
        }))
    }

    const [created] = await db.insert(tasks)
        .values(result.data).returning()

    return created
})
