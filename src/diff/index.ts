import forEach from '../forEach/index'
import isArray from '../isArray/index'
import isDefined from '../isDefined/index'
import isObject from '../isObject/index'
import { typeIs } from '../typeIs/index'

const cycleSymbol = Symbol()
type Obj = Record<any, any>
function diffImpl<T extends Obj, U extends Obj>(
  obj1: T,
  obj2: U,
  cache = new Set()
): DeepPartial<T & U> {
  if ((!isObject(obj1) && !isObject(obj2)) || typeIs(obj1) !== typeIs(obj2))
    return obj2

  if (cache.has(obj2)) return cycleSymbol as any

  const result: Record<any, any> = isObject(obj1, true) ? {} : []

  cache.add(obj2)

  forEach(obj2, (value, key) => {
    if (typeIs(value) !== typeIs(obj1[key])) {
      result[key] = value
    } else if (isObject(value) && isObject(obj1[key])) {
      const ret = diffImpl(obj1[key], value, cache)
      if (ret !== (cycleSymbol as any)) result[key] = ret
    } else if (!Object.is(value, obj1[key])) {
      result[key] = value
    }
  })

  forEach(obj1, (_value, key) => {
    if (!isDefined(obj2[key])) {
      result[key] = undefined
    }
  })

  return (isArray(result) ? result.filter(isDefined) : result) as any
}

/**
 * Calculates the difference between two objects, obj1 and obj2.
 *
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @return {Object} The difference between obj1 and obj2.
 */
export function diff<T extends object, U extends object>(
  obj1: T,
  obj2: U
): DeepPartial<T & U> {
  return diffImpl(obj1, obj2)
}

type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export default diff
