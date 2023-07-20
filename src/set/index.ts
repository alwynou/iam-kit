import { isObject } from '../isObject/index'

/**
 * Sets a value at the specified path in an object.
 *
 * @param {*} obj - The object on which to set the value.
 * @param {string} path - The path to the property where the value should be set.
 * @param {*} value - The value to set.
 * @return {*} - The modified object with the value set at the specified path.
 */
export function set<T, K>(obj: T, path: string, value: K): T {
  if (!isObject(obj) || !path) return obj

  const pathArr = path.split('.').filter(Boolean)
  let curValue = obj as unknown as any

  while (pathArr.length > 0) {
    const curKey = pathArr.shift()!
    const oldValue = (curValue as any)[curKey]
    if (pathArr.length) {
      if (!isObject(oldValue)) {
        // don't care whether if it's defined value or not, just set it
        ;(curValue as any)[curKey] = {}
      }
      curValue = (curValue as any)[curKey]
    } else {
      ;(curValue as any)[curKey] = value
      return obj
    }
  }

  return obj
}

export default set
