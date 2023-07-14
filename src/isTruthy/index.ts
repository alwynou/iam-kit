import isFalsey from '../isFalsey/index'

/**
 * Checks if the given value is truthy.
 *
 * @param {*} value - The value to be checked.
 * @return {boolean} Returns true if the value is truthy, otherwise returns false.
 */
export function isTruthy(value: unknown): boolean {
  return !isFalsey(value)
}

export default isTruthy
