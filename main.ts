import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import MySqlRepository from "./src/modules/shared/infrastructure/MySqlRepository.ts";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const r = new MySqlRepository();
  const client = await r.connect();
  const rows = await client.query("show databases");
  return c.json({
    rows,
    request: c.req
  });
  } catch (error) {
    return c.json({
      host : Deno.env.get("MYSQL_HOST") ?? "none",
      error: error.toString()
    })
  }
});

Deno.serve({
  port: 8787,
  onListen({ port, hostname }) {
    console.log(`Server started at http://${hostname}:${port}`);
  },
}, app.fetch);
