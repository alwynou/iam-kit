import { isDefined } from '.'

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined(0)).toBe(true)
    expect(isDefined('')).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined([])).toBe(true)
    expect(isDefined({})).toBe(true)
  })

  it('should return false for null', () => {
    expect(isDefined(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    // @ts-expect-error
    expect(isDefined()).toBe(false)
  })
})
