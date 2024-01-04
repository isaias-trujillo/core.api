import UncleanedRequest from "./UncleanedRequest.ts";

const spaces = /[\s\t\r\n]+/g

type Result = { empty: UncleanedRequest[]; nonEmpty: UncleanedRequest[]; }

/**
 * @description Cleans the request, removing all the extra spaces and trimming the strings
 * @param {UncleanedRequest[]} requests the unfixed requests
 * @return {{empty: UncleanedRequest[]; nonEmpty: UncleanedRequest[]}} the cleaned requests
 */
const clean = (requests: UncleanedRequest[]): Result => {
    return requests.map((request) => {
        return Object.entries(request as object).reduce((acc, [key, value]) => {
            acc[key as keyof UncleanedRequest] = value?.replace(spaces, ' ').trim() || undefined
            return acc
        }, {} as UncleanedRequest)
    }).reduce((acc, request) => {
        const emptyFields = Object.entries(request).filter(([_key, value]) => {
            return value === undefined || value === null || value === ''
        }).map(([key]) => key)

        if (emptyFields.length === 0) {
            acc.empty.push(request)
        } else {
            acc.nonEmpty.push(request)
        }

        return acc
    }, {empty: [], nonEmpty: []} as Result)
}

export default clean