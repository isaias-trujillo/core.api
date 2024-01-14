type Result<P> = ({
    ok: true
} & P)
| {
    ok: false,
    error: string
}

// deno-lint-ignore no-explicit-any
type This<P extends BasicProperty<T>, T> = new (...args: any[]) => P;

// value object following DDD practices using either
export default abstract class BasicProperty<T> {
    public readonly value: T;

    /*
    * Initializes the property
    * @param request
    * @throws Error if the request is invalid
     */
    public constructor(request: Partial<T>) {
        this.value = this.ensure(request)
    }

    /*
    * Validates the request and returns the value
    * @throws Error
    * @param request
    * @return T
    * */
    protected abstract ensure(request: Partial<T>): T | never

    static from<P extends BasicProperty<T>, T>(this: This<P, T>, request: Partial<T>): Result<P> {
        try {
            const property = new this(request);
            return {
                ok: true,
                ...property
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message as string
            }
        }
    }
}
