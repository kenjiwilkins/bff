import 'dotenv/config'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { graphqlServer } from "@hono/graphql-server"
import { handleBookShelf } from '../cache/books'
import { getSchema } from '../schema/schema'

handleBookShelf()

const app = new Hono().basePath('/api')
app.use(logger())

app.use("/graphql", graphqlServer({
  schema: getSchema,
  graphiql: true
}))

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

export default app