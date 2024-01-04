type Field<T> = {
    ok: false,
    error: string,
} | {
    ok: true,
    value: T,
}

export default Field
