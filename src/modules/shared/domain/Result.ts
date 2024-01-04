type Result<S, F extends Error = Error> = <T, U>(onSuccess: (value: S) => T, onFailure: (error: F) => U) => T | U;

export default Result;