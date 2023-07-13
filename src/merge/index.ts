import forEach from '../forEach/index'
import isArray from '../isArray/index'
import _isObject from '../isObject/index'
import typeIs from '../typeIs/index'

/**
 * Merge multiple objects into a single object using a deep merge algorithm.
 *
 * @param {object[]} [...objs] - An array of objects to be merged.
 * @return  The merged object.
 */
export function merge<T extends MergeItem[]>(...objs: T): DeepMergeArr<T> {
  const firstValue = objs.find(v => isObject(v))
  if (!firstValue) return {} as any

  const firstValueType = typeIs(firstValue)
  objs = objs.filter(o => isObject(o) && typeIs(o) === firstValueType) as T

  let index = 0
  const argLen = objs.length
  let result = objs[index]

  while (index < argLen) result = mergeImp(result, objs[++index])

  return result as DeepMergeArr<T>
}

export default merge

function copyData(v: MergeItem) {
  return isArray(v) ? [...v] : _isObject(v, true) ? { ...v } : v
}

function mergeImp(_pre: any, next: any, cache = new WeakMap()) {
  if (!_pre) return copyData(next)

  if (cache.has(next)) return cache.get(next)
  const pre = copyData(_pre) as any

  if (next) {
    cache.set(next, pre)

    forEach(next, (value: any, keyOrIndex: any) => {
      const preValue = pre[keyOrIndex]
      if (
        isObject(value) &&
        (preValue ? typeIs(preValue) === typeIs(value) : true)
      ) {
        pre[keyOrIndex] = mergeImp(preValue, value, cache)
      } else {
        pre[keyOrIndex] = value
      }
    })
  }

  return pre
}

function isObject(v: unknown) {
  return _isObject(v, true) || isArray(v)
}

type MergeItem = {
  readonly [K: string]: any
}

type DeepMerge<T, U> = [T, U] extends [object, object] ? T & U : {}

type DeepMergeArr<T extends object[]> = T extends [
  infer A extends object,
  ...infer R extends object[]
]
  ? DeepMerge<A, DeepMergeArr<R>>
  : {}
