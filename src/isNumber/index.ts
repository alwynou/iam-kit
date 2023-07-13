/**
 * Checks if the given value is a number.
 *
 * @param {unknown} value - The value to check.
 * @return {boolean} Returns true if the value is a number, false otherwise.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export default isNumber
