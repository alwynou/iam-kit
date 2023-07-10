import { isArray } from '.'

describe('isArray', () => {
  it('should return true if the value is an array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(['apple', 'banana'])).toBe(true)
  })

  it('should return false if the value is not an array', () => {
    expect(isArray(123)).toBe(false)
    expect(isArray('hello')).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isArray(undefined)).toBe(false)
  })
})
