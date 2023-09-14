/**
 * Picks the specified keys from an object and returns a new object
 * with only the selected keys.
 *
 * @param {object} obj - The object from which to pick the keys.
 * @param {Array} keys - The keys to pick from the object.
 * @return {object} - A new object with only the selected keys.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K>
/**
 * Picks the specified keys from an object and returns a new object
 * with only the selected keys.
 *
 * @param {object} obj - The object from which to pick the keys.
 * @param {...Array} keys - The keys to pick from the object.
 * @return {object} - A new object with only the selected keys.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K>
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  if (Array.isArray(keys[0])) keys = keys[0]

  const result = {} as Pick<T, K>

  for (const k of keys) {
    if (k in obj) result[k] = obj[k]
  }

  return result
}

export default pick
