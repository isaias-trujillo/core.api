type Primitive = string | number | boolean | Date

type Rules<T> = T extends Primitive
    ? PrimitiveRules<T>
    : T extends Array<infer U>
        ? {
            // if U is same as T, it will be infinite loop
            // So, if U is same as T, then, only define one level
            length?: number | { min?: number, max?: number },
            items?: U extends T ? never : Rules<U>,
        }
        : T extends object
            ? {
                [K in keyof T]?: Rules<T[K]>
            }
            : never

type PrimitiveRules<T extends Primitive> = Readonly<
    T extends string
        ? StringRules
        : T extends number
            ? NumberRules
            : T extends boolean
                ? BooleanRules
                : T extends Date
                    ? DateRules
                    : never
>

type StringRules = Readonly<{
    length?: number | { min?: number, max?: number },
    pattern?: RegExp,
}>

type NumberRules = Readonly<number | { min?: number, max?: number }>

type BooleanRules = Readonly<boolean>

type DateRules = Readonly<{ from?: Date, to?: Date } | Date>

export default Rules