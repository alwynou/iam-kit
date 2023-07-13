import isFunction from '../isFunction/index'
import isObject from '../isObject/index'

/**
 * Checks if the given value is a Promise.
 *
 * @param {unknown} value - The value to check.
 * @return {boolean} Returns true if the value is a Promise, else false.
 */
export function isPromise<T>(value: unknown): value is Promise<T> {
  return (
    isObject(value) &&
    isFunction((value as any).then) &&
    isFunction((value as any).catch)
  )
}

export default isPromise
