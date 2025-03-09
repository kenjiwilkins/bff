import 'dotenv/config'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serve } from "@hono/node-server"
import { graphqlServer, RootResolver } from "@hono/graphql-server"
import { handleBookShelf, getBooksLength } from '../cache/books'
import { getSchema } from '../schema/schema'
  
const randomNumberCache:{number:number | null, expiredAt: number | null} = {
  number: null,
  expiredAt: null
}

handleBookShelf()

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')
app.use(logger())

app.use("/graphql", graphqlServer({
  schema: getSchema,
  graphiql: true
}))

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || "") || 3000
}, (info) => {
  console.log(`Server running at ${info.port}`)
})
