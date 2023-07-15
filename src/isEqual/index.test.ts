import { isEqual } from '.'

describe('equal', () => {
  it('should return true for equal values', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('hello', 'hello')).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(isEqual({ name: 'John' }, { name: 'John' })).toBe(true)
  })

  it('should return false for different values', () => {
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual('hello', 'world')).toBe(false)
    expect(isEqual([1, 2, 3], [1, 3, 2])).toBe(false)
    expect(isEqual({ name: 'John' }, { name: 'Jane' })).toBe(false)
  })

  it('should perform shallow comparison when shallow flag is true', () => {
    expect(isEqual(1, 1, true)).toBe(true)
    expect(isEqual('hello', 'hello', true)).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3], true)).toBe(false)
    expect(isEqual({ name: 'John' }, { name: 'John' }, true)).toBe(false)
  })

  it('should perform deep comparison when shallow flag is false', () => {
    expect(isEqual(1, 1, false)).toBe(true)
    expect(isEqual('hello', 'hello', false)).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 3], false)).toBe(true)
    expect(isEqual({ name: 'John' }, { name: 'John' }, false)).toBe(true)
  })
})
