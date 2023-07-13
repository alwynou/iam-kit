/**
 * Checks if a value is empty.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} Returns true if the value is empty, otherwise returns false.
 */
export function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.length === 0)
  )
}

export default isEmpty
