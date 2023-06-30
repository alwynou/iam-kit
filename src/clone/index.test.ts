import { clone } from '.'

describe('clone function', () => {
  it('should return the same value when deep clone is not specified', () => {
    const c = { c: 1 }
    const obj = { a: 1, b: 2, c }
    const result = clone(obj, false)
    expect(result).not.toBe(obj)
    expect(result.c).toBe(c)
  })

  it('should return the same value when value is null', () => {
    const value = null
    const result = clone(value)
    expect(result).toBe(value)
  })

  it('should return the same value when value is not an object', () => {
    const value = 'hello'
    const result = clone(value)
    expect(result).toBe(value)
  })

  it('should return a deep cloned array', () => {
    const value = [1, 2, 3]
    const result = clone(value)
    expect(result).toEqual(value)
    expect(result).not.toBe(value)
  })

  it('should return a deep cloned object', () => {
    const value = { name: 'John', age: 30 }
    const result = clone(value)
    expect(result).toEqual(value)
    expect(result).not.toBe(value)
  })

  it('should return a deep cloned Map', () => {
    const value = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ])
    const result = clone(value)
    expect(result).toEqual(value)
    expect(result).not.toBe(value)
  })

  it('should return a deep cloned Set', () => {
    const value = new Set([1, 2, 3])
    const result = clone(value)
    expect(result).toEqual(value)
    expect(result).not.toBe(value)
  })

  it('should return a deep cloned new Class', () => {
    class Test {
      constructor(public name: string, public age = 18) {
        this.name = name
      }
      getName() {
        return this.name
      }
    }

    const t = new Test('tom')
    const result = clone(t)

    result.age = 16
    result.name = 'jack'

    expect(result).not.toBe(t)

    expect(t.age).toBe(18)
    expect(t.name).toBe('tom')

    expect(result.getName()).toBe('jack')

    expect((result as any).__proto__.constructor).toBe(Test)
  })
})
