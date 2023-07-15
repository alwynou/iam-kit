/**
 * Checks if two values are equal.
 *
 * @param {*} a - The first value.
 * @param {*} b - The second value.
 * @param {boolean} [shallow] - Optional flag to indicate if shallow comparison should be performed.
 * @return {boolean} Returns true if the values are equal, false otherwise.
 */
export function isEqual<T, U>(a: T, b: U, shallow?: boolean): boolean {
  return shallow ? Object.is(a, b) : deepEqual(a, b)
}

export default isEqual

function deepEqual<T, U>(a: T, b: U): boolean {
  if (typeof a !== typeof b) return false

  if (typeof a !== 'object' || a === null || b === null) {
    return Object.is(a, b)
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b as any)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!deepEqual((a as any)[key], (b as any)[key])) {
      return false
    }
  }

  return true
}
