import Either, {left, right} from "./Either.ts";

// deno-lint-ignore no-explicit-any
type This<P extends Property<T>, T> = new (...args: any[]) => P;

// value object following DDD practices using either
export default abstract class Property<T> {
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

    static from<P extends Property<T>, T>(this: This<P, T>, request: Partial<T>): Either<Error, P> {
        try {
            const property = new this(request);
            return right(property);
        } catch (error) {
            return left(error);
        }
    }
}
