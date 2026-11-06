import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from "drizzle-zod"

export const tasks = sqliteTable('tasks', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  done: int({ mode: "boolean" }).notNull().default(false),
  created_at: int().$defaultFn(() => Date.now()),
  updated_at: int()
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now())
})

export const InsertTasksSchema = createInsertSchema(
  tasks,
  {
    title: field => field.min(1).max(500)
  },
).omit({
  id: true,
  created_at: true,
  updated_at: true
})

export const PatchTasksSchema = InsertTasksSchema.partial()