import { isPromise } from '.'

describe('isPromise', () => {
  it('should return true if the value is a Promise', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isPromise(new Promise(() => {}))).toBe(true)
    expect(isPromise(Promise.resolve(1))).toBe(true)
  })

  it('should return false if the value is not a Promise', () => {
    expect(isPromise(123)).toBe(false)
    expect(isPromise('test')).toBe(false)
    expect(isPromise(null)).toBe(false)
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise({})).toBe(false)
  })
})
