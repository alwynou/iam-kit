export function forEach<T extends number>(
  collection: T,
  callback: (value: number, key: number, source: T) => void
): void
export function forEach<T extends string>(
  collection: T,
  callback: (value: string, key: number, source: T) => void
): void
export function forEach<T extends Array<any>>(
  collection: T,
  callback: (value: T[number], key: keyof T, source: T) => void
): void
// export function forEach<T extends Set<any>>(
//   collection: T,
//   callback: T extends Set<infer V>
//     ? (value: V, key: V, source: T) => void
//     : never
// ): void
// export function forEach<T extends Map<any, any>>(
//   collection: T,
//   callback: T extends Map<infer K, infer V>
//     ? (value: V, key: K, source: T) => void
//     : never
// ): void
export function forEach<T extends Record<any, any>>(
  collection: T,
  callback: T extends Record<infer K, infer V>
    ? (value: V, key: K, source: T) => void
    : never
): void
export function forEach(collection: any, callback: (...args: any[]) => void) {
  const type = typeof collection
  if (Array.isArray(collection) || type === 'string' || type === 'number') {
    const isNumber = type === 'number'
    const len = isNumber ? collection : collection.length
    for (let i = 0; i < len; i++) {
      callback(isNumber ? i : collection[i], i, collection)
    }
  } else if (type === 'object' && collection !== null) {
    if (collection instanceof Map || collection instanceof Set) {
      // eslint-disable-next-line unicorn/no-array-callback-reference
      for (const [key, value] of collection.entries()) {
        callback(value, key, collection)
      }
    } else {
      const keys = Object.keys(collection as object)
      for (const key of keys) {
        callback(collection[key], key, collection)
      }
    }
  }
}

export default forEach

// type NiceCallBack<T> = (value: any, key: any, collection: T) => void
// type ObjectCallBack<T> = T extends Set<infer V>
//   ? (value: V, key: V, source: T) => void
//   : T extends Map<infer K, infer V> | Record<infer K, infer V>
//   ? (value: V, key: K, source: T) => void
//   : NiceCallBack<T>
