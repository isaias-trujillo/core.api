// deno-lint-ignore no-explicit-any
type Function = (...args: any) => any;

type Primitive = number | string | boolean | Date;

type Key = string | number | symbol;

type OnlyFunctions<T> = T extends object
	? {
		[K in keyof T as T[K] extends Function | Record<Key, Function | object>
			? K
			: never]: T[K] extends Function
			? T[K]
			: T[K] extends Record<Key, Function | object>
				? OnlyFunctions<T[K]>
				: never
	} : T extends Function
		? T
		: never

type OnlyNonFunctions<T> = T extends object
	? {
		[K in keyof T as T[K] extends Function
			? never
			: K]: T[K] extends object
			? OnlyNonFunctions<T[K]>
			: T[K]
	} : T extends Primitive
		? T
		: never

export type{OnlyFunctions, OnlyNonFunctions}