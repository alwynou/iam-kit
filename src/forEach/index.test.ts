import { forEach } from '.'

describe('forEach', () => {
  it('should iterate over an array and call the callback function', () => {
    const arr = [1, 2, 3]
    const callback = vitest.fn()
    forEach(arr, callback)
    expect(callback.mock.calls.length).toBe(arr.length)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[2][0]).toBe(3)
  })

  it('should iterate over a string and call the callback function', () => {
    const str = 'hello'
    const callback = vitest.fn()
    forEach(str, callback)
    expect(callback.mock.calls.length).toBe(str.length)
    expect(callback.mock.calls[0][0]).toBe('h')
    expect(callback.mock.calls[1][0]).toBe('e')
    expect(callback.mock.calls[2][0]).toBe('l')
    expect(callback.mock.calls[3][0]).toBe('l')
    expect(callback.mock.calls[4][0]).toBe('o')
  })

  it('should iterate over a number and call the callback function', () => {
    const num = 10
    const callback = vitest.fn()
    forEach(num, callback)
    expect(callback.mock.calls.length).toBe(num)
    expect(callback.mock.calls[0][0]).toBe(0)
    expect(callback.mock.calls[1][0]).toBe(1)
    expect(callback.mock.calls[2][0]).toBe(2)
    expect(callback.mock.calls[3][0]).toBe(3)
    expect(callback.mock.calls[4][0]).toBe(4)
    expect(callback.mock.calls[5][0]).toBe(5)
    expect(callback.mock.calls[6][0]).toBe(6)
    expect(callback.mock.calls[7][0]).toBe(7)
    expect(callback.mock.calls[8][0]).toBe(8)
    expect(callback.mock.calls[9][0]).toBe(9)
  })

  it('should iterate over an object and call the callback function', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vitest.fn()
    expect(callback.mock.calls.length).toBe(Object.keys(obj).length)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[0][1]).toBe('a')
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[1][1]).toBe('b')
    expect(callback.mock.calls[2][0]).toBe(3)
    expect(callback.mock.calls[2][1]).toBe('c')
  })

  it('should iterate over a Map and call the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const callback = vitest.fn()
    forEach(map, callback)
    expect(callback.mock.calls.length).toBe(map.size)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[0][1]).toBe('a')
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[1][1]).toBe('b')
    expect(callback.mock.calls[2][0]).toBe(3)
    expect(callback.mock.calls[2][1]).toBe('c')
  })

  it('should iterate over a Set and call the callback function', () => {
    const set = new Set([1, 2, 3])
    const callback = vitest.fn()
    forEach(set, callback)
    expect(callback.mock.calls.length).toBe(set.size)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[2][0]).toBe(3)
  })

  it('should not call the callback function if the collection is undefined', () => {
    const callback = vitest.fn()
    forEach(undefined, callback)
    expect(callback.mock.calls.length).toBe(0)
  })

  it('should not call the callback function if the collection is null', () => {
    const callback = vitest.fn()
    forEach(null, callback)
    expect(callback.mock.calls.length).toBe(0)
  })
})
