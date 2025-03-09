import 'dotenv/config'
import app from './api'
import { serve } from "@hono/node-server"

serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || "") || 3000
}, (info) => {
  console.log(`Server running at ${info.port}`)
})