import { isFalsey } from '.'

describe('isFalsey', () => {
  it('should return true for null', () => {
    expect(isFalsey(null)).toBe(true)
  })

  it('should return true for undefined', () => {
    // @ts-expect-error
    expect(isFalsey()).toBe(true)
  })

  it('should return true for false', () => {
    expect(isFalsey(false)).toBe(true)
  })

  it('should return true for 0', () => {
    expect(isFalsey(0)).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isFalsey('')).toBe(true)
  })

  it('should return false for true', () => {
    expect(isFalsey(true)).toBe(false)
  })

  it('should return false for any non-falsey value', () => {
    expect(isFalsey(1)).toBe(false)
    expect(isFalsey('hello')).toBe(false)
    expect(isFalsey([])).toBe(false)
    expect(isFalsey({})).toBe(false)
  })
})
