// Either monad implementation
// only left or right can be defined, otherwise the type is 'never'
type Left<L> = {
    tag: 'left',
    value: L
}

type Right<R> = {
    tag: 'right',
    value: R
}

type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(l: L): Either<L, R> => ({tag: 'left', value: l})

export const right = <L, R>(r: R): Either<L, R> => ({tag: 'right', value: r})

export default Either