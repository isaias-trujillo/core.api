import {Hono} from "https://deno.land/x/hono@v3.11.8/hono.ts";
import UncleanedRequest from "./steps/cleaning/UncleanedRequest.ts";
import clean from "./steps/cleaning/index.ts";
import sanitize from "./steps/sanitizing/index.ts";
import restructure from "./steps/restructuring/index.ts";
import group from "./steps/grouping/index.ts";

const app = new Hono()

app.post('/', async (c) => {
    try {
        const requests = await c.req.json() as UncleanedRequest[]
        const {empty, nonEmpty} = clean(requests)
        const {sanitized, nonSanitized} = sanitize(nonEmpty)
        const restructured = restructure(sanitized)
        const grouped = group(restructured)

        return c.json({
            total: requests.length,
            empty: empty.length,
            'no sanitized': nonSanitized.length,
            validated: restructured.length,
            grouped: grouped.length,
        })

    } catch (_e) {
        return c.json({error: "Las solicitudes no tienen el formato correcto."}, 400,)
    }
})

export default app