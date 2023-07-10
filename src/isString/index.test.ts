import { isString } from '.'

describe('isString', () => {
  it('should return true when testing a string value', () => {
    expect(isString('hello')).toBe(true)
  })

  it('should return false when testing a number value', () => {
    expect(isString(123)).toBe(false)
  })

  it('should return false when testing a boolean value', () => {
    expect(isString(true)).toBe(false)
  })

  it('should return false when testing an object value', () => {
    expect(isString({})).toBe(false)
  })

  it('should return false when testing an array value', () => {
    expect(isString([])).toBe(false)
  })

  it('should return false when testing a null value', () => {
    expect(isString(null)).toBe(false)
  })

  it('should return false when testing an undefined value', () => {
    // @ts-expect-error
    expect(isString()).toBe(false)
  })
})
