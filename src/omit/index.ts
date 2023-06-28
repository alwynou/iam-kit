/**
 * Omit part of `obj`'s prop
 *
 * @param {object} obj
 * @param {Array<string>} keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K>
/**
 * Omit part of `obj`'s prop
 *
 * @param {object} obj
 * @param {Array<string>} keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K>
export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  if (Array.isArray(keys[0])) keys = keys[0]

  const result = { ...obj }

  if (Object.keys(obj).length === keys.length) return result

  for (const key of keys) {
    if (key in obj) Reflect.deleteProperty(result, key)
  }

  return result
}

export default omit
