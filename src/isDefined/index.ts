/**
 * Checks if a value is defined, i.e., not null or undefined.
 *
 * @param {T | null | undefined} value - The value to check.
 * @returns {boolean} - Returns true if the value is defined, false otherwise.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export default isDefined
