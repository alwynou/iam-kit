import { set } from '.'

describe('set', () => {
  it('should set a value at the specified path in an object', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'hello'
        }
      },
      arr: [1, { name: 'name' }]
    }

    const result = set(obj, 'foo.bar.baz', 'world')

    expect(result).toEqual({
      foo: {
        bar: {
          baz: 'world'
        }
      },
      arr: [1, { name: 'name' }]
    })

    const result2 = set(obj, 'arr.1.name', 'newName')

    expect(result2).toEqual({
      foo: {
        bar: {
          baz: 'world'
        }
      },
      arr: [1, { name: 'newName' }]
    })
  })

  it('should handle non-object input', () => {
    const value = 'hello'

    const result = set(value, 'foo.bar.baz', 'world')

    expect(result).toBe(value)
  })

  it('should create missing nested objects', () => {
    const obj = {}

    const result = set(obj, 'foo.bar.baz', 'world')

    expect(result).toEqual({
      foo: {
        bar: {
          baz: 'world'
        }
      }
    })
  })
})
