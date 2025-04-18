/**
 * Splits an array into smaller chunks of the specified size.
 *
 * @param {Array} array - The array to be split.
 * @param {Number} size - The size of each chunk.
 * @return {Array} An array of chunks.
 * @throws {Error} If size is not a positive integer.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!Array.isArray(array)) {
    return []
  }

  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('Size must be a positive integer')
  }

  if (array.length === 0) {
    return []
  }

  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default chunk
