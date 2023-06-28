/**
 * Pick part of `obj`'props
 *
 * @param {object} obj
 * @param {Array<string>} keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K>
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  if (Array.isArray(keys[0])) keys = keys[0]

  if (Object.keys(obj).length === keys.length) return { ...obj }

  const result = {} as Pick<string, any>

  for (const k of keys) {
    if (k in obj) result[k] = obj[k]
  }

  return result
}

export default pick
