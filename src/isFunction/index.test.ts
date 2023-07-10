import { isFunction } from '.'

describe('isFunction', () => {
  it('should return true when the input is a function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(() => {})).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(function () {})).toBe(true)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(function namedFunction() {})).toBe(true)
  })

  it('should return false when the input is not a function', () => {
    expect(isFunction(null)).toBe(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction('')).toBe(false)
    expect(isFunction(123)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(true)).toBe(false)
    expect(isFunction(false)).toBe(false)
  })
})
