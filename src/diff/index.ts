import forEach from '../forEach/index'
import isArray from '../isArray/index'
import isDefined from '../isDefined/index'
import isObject from '../isObject/index'
import { typeIs } from '../typeIs/index'

const cycleSymbol = Symbol()

function diffImpl<T extends object, U extends object>(
  obj1: T,
  obj2: U,
  cache = new Set()
): any {
  if ((!isObject(obj1) && !isObject(obj2)) || typeIs(obj1) !== typeIs(obj2))
    return obj2

  if (cache.has(obj2)) return cycleSymbol

  const result: any = isObject(obj1, true) ? {} : []

  cache.add(obj2)

  forEach(obj2 as any, (value: any, key: any) => {
    if (typeIs(value) !== typeIs((obj1 as any)[key])) {
      result[key] = value
    } else if (isObject(value) && isObject((obj1 as any)[key])) {
      const ret = diffImpl((obj1 as any)[key], value, cache)
      if (ret !== cycleSymbol) result[key] = ret
    } else if (!Object.is(value, (obj1 as any)[key])) {
      result[key] = value
    }
  })

  forEach(obj1 as any, (_value: any, key: any) => {
    if (!isDefined((obj2 as any)[key])) {
      result[key] = undefined
    }
  })

  return isArray(result) ? result.filter(isDefined) : result
}

/**
 * Calculates the difference between two objects, obj1 and obj2.
 *
 * @param {T} obj1 - The first object to compare.
 * @param {U} obj2 - The second object to compare.
 * @return {any} The difference between obj1 and obj2.
 */
export function diff<T extends object, U extends object>(obj1: T, obj2: U) {
  return diffImpl(obj1, obj2)
}

export default diff
