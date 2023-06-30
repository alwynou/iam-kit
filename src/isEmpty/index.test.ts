import { isEmpty } from '.'

describe('isEmpty', () => {
  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  it('should return true for undefined', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty([])).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return false for non-empty object', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false)
  })

  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it('should return false for non-empty number', () => {
    expect(isEmpty(42)).toBe(false)
  })

  it('should return false for non-empty boolean', () => {
    expect(isEmpty(true)).toBe(false)
  })
})
