import UncleanedRequest from "../../../../src/api/treatment and linkage/scheduling/steps/cleaning/UncleanedRequest.ts";
import clean from "../../../../src/api/treatment and linkage/scheduling/steps/cleaning/index.ts";
import sanitize from "../../../../src/api/treatment and linkage/scheduling/steps/sanitizing/index.ts";
import restructure from "../../../../src/api/treatment and linkage/scheduling/steps/restructuring/index.ts";
import group from "../../../../src/api/treatment and linkage/scheduling/steps/grouping/index.ts";
import data from "./data.json" with {type: "json"}
import { assertEquals } from "asserts";

Deno.test({
        name: "Data Cleaning",
        fn: () => {
            try {
                const requests = data as UncleanedRequest[]
                const {empty, nonEmpty} = clean(requests)
                const {sanitized, nonSanitized} = sanitize(nonEmpty)
                const restructured = restructure(sanitized)
                const grouped = group(restructured)

                const expected = {
                    total: requests.length,
                    empty: 0,
                    'no sanitized': 0,
                    validated: requests.length,
                    grouped: 514,
                }

                const actual = {
                    total: requests.length,
                    empty: empty.length,
                    'no sanitized': nonSanitized.length,
                    validated: restructured.length,
                    grouped: grouped.length,
                }

                assertEquals(actual, expected)

            } catch (_e) {
                assertEquals(false, true)
            }
        }
    }
)