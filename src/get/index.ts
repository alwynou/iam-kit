import { isObject } from '../isObject/index'

/**
 * Retrieves the value at a given path from an object.
 *
 * @param {T} obj - The object from which to retrieve the value.
 * @param {K} path - The path to the value in dot notation.
 * @param {D} [defValue] - The default value to return if the path does not exist.
 * @return {Get<T, K, D>} - The value at the given path or the default value.
 */
export function get<T extends object, K extends string, D = undefined>(
  obj: T,
  path: K,
  defValue?: D
): Get<T, K, D> {
  const pathArr = path?.split('.').filter(Boolean) ?? []
  let curValue = obj as unknown as any
  while (pathArr.length > 0 && isObject(curValue)) {
    const curKey = pathArr.shift()!
    curValue = (curValue as any)[curKey]
  }
  return curValue === undefined ? defValue : curValue
}

export default get

type Get<T, K, D> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? Get<T[L], R, D>
    : D
  : K extends keyof T
  ? T[K]
  : D
