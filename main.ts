import {Hono} from "https://deno.land/x/hono@v3.11.8/mod.ts";
import routes from "./src/api/treatment and linkage/scheduling/routes.ts";

const app = new Hono();

app.get('/', (c) => {
    return c.json({message: "Hello world!"});
});


app.route('/treatment-and-linkage/scheduling', routes);

Deno.serve({
    port: 8787,
    onListen({port, hostname}) {
        console.log(`Server started at http://${hostname}:${port}`);
    },
}, app.fetch);
