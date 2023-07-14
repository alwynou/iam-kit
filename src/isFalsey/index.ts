const falseyValues = [false, 0, '', NaN, null, undefined] as const

/**
 * Checks if a value is considered falsey.
 *
 * @param {*} value - The value to be checked.
 * @return {boolean} Returns true if the value is falsey, false otherwise.
 */
export function isFalsey(value: unknown): value is FalseyTypes {
  return falseyValues.includes(value as any)
}

export default isFalsey

type FalseyTypes = (typeof falseyValues)[number]
