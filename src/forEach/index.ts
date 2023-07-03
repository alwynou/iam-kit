/**
 * Executes a provided function once for each element in a collection.
 *
 * @param {object} collection - The collection to iterate over.
 * @param {Function} callback - The function to execute for each element, taking three arguments: the current value, the index, and the collection itself.
 * @return {void} This function does not return anything.
 */
export function forEach<T extends ForEachSource>(
  collection: T,
  callback: ForEachCallback<T>
) {
  const type = typeof collection
  if (Array.isArray(collection) || type === 'string' || type === 'number') {
    const isNumber = type === 'number'
    // @ts-expect-error
    const len = isNumber ? collection : collection.length
    for (let i = 0; i < len; i++) {
      // @ts-expect-error
      callback(isNumber ? i : collection[i], i, collection)
    }
  } else if (type === 'object' && collection !== null) {
    if (collection instanceof Map || collection instanceof Set) {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      for (const [key, value] of collection.entries()) {
        // @ts-expect-error
        callback(value, key, collection)
      }
    } else {
      const keys = Object.keys(collection as object)
      for (const key of keys) {
        // @ts-expect-error
        callback(collection[key], key, collection)
      }
    }
  }
}

export default forEach

type ForEachSource =
  | string
  | number
  // | Set<any>
  // | Map<any, any>
  | Array<any>
  | Record<any, any>

type ForEachCallback<T extends ForEachSource> = T extends string
  ? (value: string, key: number, collection: string) => void
  : T extends number
  ? (value: number, key: number, collection: string) => void
  : // : T extends Set<infer S>
  // ? (value: S, key: S, collection: T) => void
  // : T extends Map<infer K, infer V>
  // ? (value: V, key: K, collection: T) => void
  T extends Array<infer A>
  ? (value: A, key: number, collection: T) => void
  : T extends Record<infer K, infer V>
  ? (value: V, key: K, collection: T) => void
  : never
