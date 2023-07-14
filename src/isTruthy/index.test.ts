import { isTruthy } from '.'

describe('isTruthy', () => {
  it('should return true for truthy values', () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy({})).toBe(true)
    expect(isTruthy(1)).toBe(true)
    expect(isTruthy(-1)).toBe(true)
    expect(isTruthy([])).toBe(true)
  })

  it('should return false for falsey values', () => {
    expect(isTruthy(false)).toBe(false)
    expect(isTruthy(null)).toBe(false)
    // @ts-expect-error
    expect(isTruthy()).toBe(false)
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy('')).toBe(false)
    expect(isTruthy(NaN)).toBe(false)
  })
})
