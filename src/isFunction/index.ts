/**
 * Checks if a value is a function.
 *
 * @param {unknown} fn - The value to be checked.
 * @return {boolean} Returns true if the value is a function, false otherwise.
 */
export function isFunction(fn: unknown): fn is Function {
  return typeof fn === 'function'
}

export default isFunction
