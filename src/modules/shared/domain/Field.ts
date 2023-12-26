export type Field<T> = {
    ok: true,
    value: T
} | {
    ok: false,
    error: string
}

export default Field