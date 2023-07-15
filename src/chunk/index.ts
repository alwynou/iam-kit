/**
 * Splits an array into smaller chunks of the specified size.
 *
 * @param {Array} array - The array to be split.
 * @param {Number} size - The size of each chunk.
 * @return {Array} An array of chunks.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default chunk
