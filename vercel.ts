import {handle} from "hono/vercel";
import app from "./api";

export const config = {
  runtime: 'edge'
}

export default handle(app);