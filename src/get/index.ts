import { isObject } from '../isObject'

/**
 * Returns the value at the specified path in the given object.
 *
 * @param {T} obj - The object to retrieve the value from.
 * @param {K} path - The path to the value.
 * @return {Get<T, K>} The value at the specified path.
 */
export function get<T extends object, K extends string>(
  obj: T,
  path: K
): Get<T, K> {
  const pathArr = path?.split('.').filter(Boolean) ?? []
  let curValue = obj as unknown as any
  while (pathArr.length > 0 && isObject(curValue)) {
    const curKey = pathArr.shift()!
    curValue = (curValue as any)[curKey]
  }
  return curValue
}

type Get<T, K> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? Get<T[L], R>
    : undefined
  : K extends keyof T
  ? T[K]
  : undefined
