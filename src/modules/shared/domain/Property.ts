import Either, {left, right} from "./Either.ts";

// deno-lint-ignore no-explicit-any
type This<P extends Property<T>, T> = new (...args: any[]) => P & Property<T>;

// value object following DDD practices using either
export default abstract class Property<T> {
    private _value: T = {} as T;

    // getter for the value
    get value(): T {
        return this._value;
    }

    protected abstract ensure(request: Partial<T>): Either<Error, T>;

    static from<P extends Property<T>, T>(this: This<P, T>, request: Partial<T>): Either<Error, P> {
        const property = new this();
        const result = property.ensure(request);

        if (result.tag === 'left') {
            return left(result.value);
        }
        property._value = result.value;
        return right(property);
    }

    static test<P extends Property<T>, T>(this: This<P, T>, request: Partial<T>): boolean {
        const property = new this();
        const result = property.ensure(request);
        return result.tag === 'right';
    }
}
