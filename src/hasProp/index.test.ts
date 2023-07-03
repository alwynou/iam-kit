import { hasProp } from '.'

describe('hasProps', () => {
  it('should return true if the object has all the specified properties', () => {
    const obj = { prop1: 'value1', prop2: 'value2' }
    const props = ['prop1', 'prop2']

    expect(hasProp(obj, props)).toBe(true)
  })

  it('should return false if the object does not have all the specified properties', () => {
    const obj = { prop1: 'value1', prop2: 'value2' }
    const props = ['prop1', 'prop2', 'prop3']

    expect(hasProp(obj, props)).toBe(false)
  })

  it('should return true if the object has all the specified properties with different types', () => {
    const obj = { prop1: 'value1', prop2: 1234, prop3: true }
    const props = ['prop1', 'prop2', 'prop3']

    expect(hasProp(obj, props)).toBe(true)
  })

  it('should return true if the object has all the specified properties including symbols', () => {
    const symbol1 = Symbol('symbol1')
    const symbol2 = Symbol('symbol2')
    const obj = { prop1: 'value1', [symbol1]: 'value2', [symbol2]: 'value3' }
    const props = ['prop1', symbol1, symbol2]

    expect(hasProp(obj, props)).toBe(true)
  })
})

describe('hasProps overly 1', () => {
  it('should return true when the object has all the specified properties', () => {
    const obj = { name: 'John', age: 30 }
    const result = hasProp(obj, 'name', 'age')
    expect(result).toBe(true)
  })

  it('should return false when the object does not have all the specified properties', () => {
    const obj = { name: 'John', age: 30 }
    const result = hasProp(obj, 'name', 'age', 'city')
    expect(result).toBe(false)
  })

  it('should return true when the object has no properties to check', () => {
    const obj = { name: 'John', age: 30 }
    const result = hasProp(obj)
    expect(result).toBe(true)
  })

  it('should return false when the object is empty and there are properties to check', () => {
    const obj = {}
    const result = hasProp(obj, 'name', 'age')
    expect(result).toBe(false)
  })
})
