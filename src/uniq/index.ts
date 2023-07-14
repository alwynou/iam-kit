/**
 * Returns a new array with unique elements from the input array.
 *
 * @param {Array} arr - The input array.
 * @return {Array} The new array with unique elements.
 */
export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

export default uniq
