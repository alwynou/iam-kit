/**
 * Checks if a value is of type symbol.
 *
 * @param {unknown} value - The value to check.
 * @return {boolean} Returns true if the value is of type symbol, false otherwise.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export default isSymbol
