/**
 * Check if the given value is an object.
 *
 * @param {unknown} obj - The value to be checked.
 * @param {boolean} [strict] - Whether to perform strict object checking or not. Default is `false`.
 * @return {boolean} - Returns true if the value is an object, otherwise false.
 */
export function isObject(obj: unknown, strict?: true): obj is object
/**
 * Checks if the given value is an object or an array.
 *
 * @param {unknown} obj - The value to check.
 * @return {boolean} - Returns true if the value is an object or an array, false otherwise.
 */
export function isObject(obj: unknown): obj is object | any[]
export function isObject(obj: unknown, strict?: boolean) {
  return strict
    ? Object.prototype.toString.call(obj) === '[object Object]'
    : obj !== null && typeof obj === 'object'
}

export default isObject
