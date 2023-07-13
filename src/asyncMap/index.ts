import { psequence } from '../psequence'

/**
 * Executes an asynchronous map operation on a given collection.
 *
 * @param collection - The collection to iterate over.
 * @param callback - The async callback function to apply to each element.
 * @param [sequence=true] - Determines whether the async operations should be executed in sequence or in parallel. Default is true.
 * @return A promise that resolves to an array of the results of each async operation.
 */
export function asyncMap<T extends Array<any>, U>(
  collection: T,
  callback: (value: T[number], key: keyof T, source: T) => U | Promise<U>,
  sequence = true
): Promise<U[]> {
  return new Promise((resolve, reject) => {
    const results: U[] = []
    if (sequence) {
      const wrapFns = collection.map(
        (value, key) => async () => await callback(value, key, collection)
      )
      resolve(psequence(wrapFns))
    } else {
      collection.forEach(async (value, key) => {
        try {
          const result = await callback(value, key, collection)
          results.push(result)
          if (results.length === collection.length) resolve(results)
        } catch (error) {
          reject(error)
        }
      })
    }
  })
}
