import Field from "./src/modules/shared/Field.ts";
import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts"

const app = new Hono()

app.get('/', (c) => {
  const address: Field<{
    city: string,
    zip: string
  }> = {
    ok: true,
    value: {
        city: "Evergarden Springfield.",
        zip: "1234"
    }
  } 
  
  return c.json(address)
})

Deno.serve({
  port: 8787,
  onListen({ port, hostname }) {
    console.log(`Server started at http://${hostname}:${port}`);
  },

}, app.fetch)

