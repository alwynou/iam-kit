import { pick } from '.'

describe('pick', () => {
  it('should return an empty object if no keys are provided', () => {
    const obj = { a: 1, b: 2 }
    expect(pick(obj)).toEqual({})
  })

  it('should return a new object with the selected keys', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = pick(obj, 'a', 'c')
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should return a new object with all keys if all keys are provided', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, 'a', 'b', 'c')
    expect(result).toEqual(obj)
  })

  it('should return a new object with the selected keys from an array of keys', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const keys = ['a', 'c']
    // @ts-expect-error
    const result = pick(obj, keys)
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should return a new object with the selected keys and ignore non-existing keys', () => {
    const obj = { a: 1, b: 2 }
    // @ts-expect-error
    const result = pick(obj, 'a', 'c')
    expect(result).toEqual({ a: 1 })
  })
})
