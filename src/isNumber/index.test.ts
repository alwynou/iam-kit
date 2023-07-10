import { isNumber } from '.'

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(42)).toBe(true)
    expect(isNumber(-1.5)).toBe(true)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber('')).toBe(false)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber(null)).toBe(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isNumber(() => {})).toBe(false)
  })
})
