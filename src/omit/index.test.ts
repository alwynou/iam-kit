import { omit } from '.'

describe('omit', () => {
  const obj = { a: 1, b: 2, c: 3 }

  it('should omit specified keys from the object', () => {
    const result = omit(obj, 'a', 'c')
    expect(result).toEqual({ b: 2 })
  })

  it('should not modify the original object', () => {
    omit(obj, 'a')
    expect(obj).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should return the same object when all keys are omitted', () => {
    const result = omit(obj, 'a', 'b', 'c')
    expect(result).toEqual({})
  })

  it('should return a new object when no keys are omitted', () => {
    const result = omit(obj)
    expect(result).not.toBe(obj)
    expect(result).toEqual(obj)
  })

  it('should handle empty object', () => {
    // @ts-expect-error
    const result = omit({}, 'a')
    expect(result).toEqual({})
  })

  it('should handle empty keys array', () => {
    const result = omit(obj, [])
    expect(result).toEqual(obj)
  })

  it('should handle array of keys', () => {
    const result = omit(obj, ['a', 'c'])
    expect(result).toEqual({ b: 2 })
  })
})
