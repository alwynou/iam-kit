import { isObject } from '.'

describe('isObject', () => {
  it('should return true if the value is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(null)).toBe(false)
    //@ts-expect-error
    expect(isObject()).toBe(false)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isObject(() => {})).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject('string')).toBe(false)
  })

  it('should perform strict object checking if the strict parameter is provided', () => {
    expect(isObject({}, true)).toBe(true)
    expect(isObject([], true)).toBe(false)
    expect(isObject(null, true)).toBe(false)
    expect(isObject(undefined, true)).toBe(false)
    expect(isObject(123, true)).toBe(false)
    expect(isObject('string', true)).toBe(false)
  })
})
