/**
 * Checks if the given value is a string.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} Returns true if the value is a string, otherwise false.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
