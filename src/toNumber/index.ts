/**
 * Converts the given value to a number.
 *
 * @param {unknown} numberLike - The value to be converted.
 * @param {boolean} [strict=true] - If true, only conversion from string type is permitted. Default is `true`.
 * @return {number} The converted number. If the conversion fails, NaN is returned.
 */
export function toNumber(numberLike: unknown, strict = true): number {
  const type = typeof numberLike
  if (type === 'number') return numberLike as number

  if ((strict && type !== 'string') || type === 'symbol') return NaN

  const num = Number(numberLike)
  if (isNaN(num) || !isFinite(num)) return NaN

  return num
}

export default toNumber
