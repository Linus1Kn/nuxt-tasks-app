import { drizzle } from 'drizzle-orm/libsql/node'

import * as schema from './schema'

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL!,
    authToken: undefined
  },
  casing: "snake_case",
  schema,
})