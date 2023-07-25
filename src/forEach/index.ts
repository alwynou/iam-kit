export function forEach<T extends number>(
  collection: T,
  callback: (value: number, key: number, source: T) => void
): void
export function forEach<T extends string>(
  collection: T,
  callback: (value: string, key: number, source: T) => void
): void
export function forEach<T>(
  collection: T[],
  callback: (value: T, key: number, source: T[]) => void
): void
export function forEach<T>(
  collection: Set<T>,
  callback: (value: T, key: T, source: Set<T>) => void
): void
export function forEach<K, V>(
  collection: Map<K, V>,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  callback: (value: V, key: K, source: Map<K, V>) => void
): void
export function forEach<K extends string | number, V>(
  collection: Record<K, V>,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  callback: (value: V, key: K, source: Record<K, V>) => void
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
