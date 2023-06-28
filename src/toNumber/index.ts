/**
 * Assisting you in converting to the actual numerical type.
 *
 * @param {unknown} numberLike
 * @param {boolean} [strict=false]
 * @return {number}
 */
export function toNumber(numberLike: unknown, strict?: boolean): number {
  if (typeof numberLike === 'number') return numberLike

  // In strict mode, only conversion from string type is permitted.
  if (strict && typeof numberLike !== 'string') return NaN

  const num = Number(numberLike)
  if (isNaN(num) || !isFinite(num)) return NaN

  return num
}

export default toNumber
