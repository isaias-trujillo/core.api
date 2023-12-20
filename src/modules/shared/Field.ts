// give me field for ddd value object implementation
export type Field<T> = {
    ok: true,
    value: T
} | {
    ok: false,
    error: string
}

export default Field