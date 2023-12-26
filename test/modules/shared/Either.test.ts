import {assertEquals} from "asserts";
import {left, right} from "../../../src/modules/shared/domain/Either.ts";

Deno.test(
    "testing either",
    () => {
        const l = left("error")
        const r = right({
            street: "Evergreen 742",
            city: "Springfield",
            country: "USA",
            zip: 12345
        })
        assertEquals(l.tag == 'left', true)
        assertEquals(r.tag == 'right', true)
    }
)