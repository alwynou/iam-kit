/**
 * Executes a provided function once for each element in the array.
 *
 * @param {Array<any>} collection - The array to iterate over.
 * @param {function} callback - The function to execute for each element.
 */
export function forEach<
  T extends Array<any>,
  V = T extends Array<infer VV> ? VV : unknown
>(
  collection: T,
  callback: (value: V, index: number, collection: T) => void
): void
/**
 * Executes a provided function once for each element in a collection.
 *
 * @param {string} collection - The collection to iterate over.
 * @param {function} callback - The function to execute for each element, taking three arguments: the current value, the index, and the collection itself.
 * @return {void} This function does not return anything.
 */
export function forEach(
  collection: string,
  callback: (value: string, index: number, collection: string) => void
): void
/**
 * Executes a provided function once for each key-value pair in a collection.
 *
 * @param {object} collection - The collection to iterate over.
 * @param {function} callback - The function to execute for each key-value pair.
 * @return {void} This function does not return anything.
 */
export function forEach<T>(
  collection: { [key: string]: T },
  callback: (value: T, key: string, collection: { [key: string]: T }) => void
): void
/**
 * Iterates over a Map and applies a callback function to each key-value pair.
 *
 * @param {Map<any, T>} collection - The Map to iterate over.
 * @param {function} callback - The function to apply to each key-value pair.
 * @return {void} This function does not return anything.
 */
export function forEach<T>(
  collection: Map<any, T>,
  callback: (value: T, key: any, collection: Map<any, T>) => void
): void
/**
 * A function that iterates over a set and applies a callback function to each element.
 *
 * @param {Set<T>} collection - The set to iterate over.
 * @param {function} callback - The function to apply to each element.
 * @return {void} This function does not return anything.
 */
export function forEach<T>(
  collection: Set<T>,
  callback: (value: T, value2: T, collection: Set<T>) => void
): void
export function forEach(collection: any, callback: any) {
  if (Array.isArray(collection) || typeof collection === 'string') {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection)
    }
  } else if (typeof collection === 'object' && collection !== null) {
    if (collection instanceof Map || collection instanceof Set) {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      for (const [key, value] of collection.entries()) {
        callback(value, key, collection)
      }
    } else {
      const keys = Object.keys(collection)
      for (const key of keys) {
        callback(collection[key], key, collection)
      }
    }
  }
}

export default forEach
