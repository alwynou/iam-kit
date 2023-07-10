/**
 * Checks if a given value is an array.
 *
 * @param {unknown} value - The value to be checked.
 * @return {value is Array<unknown>} Returns true if the value is an array, false otherwise.
 */
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

export default isArray
