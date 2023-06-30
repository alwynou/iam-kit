/**
 * Clones a value, optionally performing a deep clone.
 *
 * @param {T} value - The value to be cloned.
 * @param {boolean} [deep] - Whether to perform a deep clone. Default is `true`.
 * @return {T} - The cloned value.
 */
export function clone<T>(value: T, deep = true): T {
  if (value === null || typeof value !== 'object') return value

  if (deep) return cloneDeep(value)

  return Array.isArray(value)
    ? cloneArray(value as any)
    : cloneObj(value as any)
}

function cloneDeep<T>(value: T, clonedObjects = new WeakMap()): T {
  const type = typeof value

  if (value === null || (type !== 'object' && type !== 'function')) {
    return value
  }

  if (clonedObjects.has(value as any)) {
    return clonedObjects.get(value as any) as T
  }

  if (Array.isArray(value)) {
    return cloneArray(value as any, clonedObjects) as unknown as T
  }

  if (value instanceof Map) {
    const clonedMap = new Map()
    clonedObjects.set(value, clonedMap)
    for (const [key, val] of value.entries()) {
      clonedMap.set(key, cloneDeep(val, clonedObjects))
    }
    return clonedMap as unknown as T
  }

  if (value instanceof Set) {
    const clonedSet = new Set()
    clonedObjects.set(value, clonedSet)
    for (const val of value) {
      clonedSet.add(cloneDeep(val, clonedObjects))
    }
    return clonedSet as unknown as T
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T
  }

  if (value instanceof RegExp) {
    return new RegExp(value) as unknown as T
  }

  if (typeof value === 'function') {
    return cloneFn(value) as unknown as T
  }

  return cloneObj(value as any, clonedObjects)
}

function cloneObj<T extends object>(obj: T, cache?: WeakMap<any, any>): T {
  const Ctor = (obj as any).__proto__.constructor
  const clonedObject = new Ctor() as T
  cache?.set(obj, clonedObject)
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObject[key] = cache ? cloneDeep(obj[key], cache) : obj[key]
    }
  }
  return clonedObject
}

function cloneArray<T extends []>(arr: T, cache?: WeakMap<any, any>): T {
  // eslint-disable-next-line unicorn/no-new-array
  const clonedArray = new Array(arr.length)
  cache?.set(arr, clonedArray)
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < arr.length; index++) {
    clonedArray[index] = cache ? cloneDeep(arr[index], cache) : arr[index]
  }

  return clonedArray as T
}

function cloneFn<T extends Function>(fn: T): T {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const clonedFn = Object.assign(function () {}, fn)
  Object.setPrototypeOf(clone, Object.getPrototypeOf(fn))
  return clonedFn
}
