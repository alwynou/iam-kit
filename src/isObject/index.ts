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
 * @param {boolean} [strict=false] - If true, the function will only return true for objects and not arrays.
 * @return {boolean} - Returns true if the value is an object or an array, false otherwise.
 */
export function isObject(
  obj: unknown,
  strict?: false
): obj is object | Array<any>
/**
 * Checks if the given value is an object or an array.
 *
 * @param {unknown} obj - The value to check.
 * @param {boolean} [strict=false] - If true, the function will only return true for objects and not arrays.
 * @return {boolean} - Returns true if the value is an object or an array, false otherwise.
 */
export function isObject(obj: unknown): obj is object | Array<any>
export function isObject(obj: unknown, strict?: boolean) {
  return strict
    ? Object.prototype.toString.call(obj) === '[object Object]'
    : obj !== null && typeof obj === 'object'
}

export default isObject
