import { merge } from '.'

describe('merge', () => {
  it('should merge multiple objects into a single object', () => {
    const obj1 = { name: 'John' }
    const obj2 = { age: 25 }
    const obj3 = { city: 'New York' }
    const obj4 = { name: 'Doe' }

    const result = merge(obj1, obj2, obj3, obj4)

    expect(result).toEqual({ name: 'Doe', age: 25, city: 'New York' })
  })

  it('should handle merging an empty array', () => {
    const result = merge()
    expect(result).toEqual({})
  })

  it('should handle merging objects with nested properties', () => {
    const obj1 = { person: { name: 'John', age: 25 } }
    const obj2 = {
      person: { age: 30, city: 'New York', class: [1, { cc: 2 }, 3] }
    }
    const obj3 = { person: { name: 'Doe', class: [1, { cc: 1 }, 3, 4] } }

    const result = merge(obj1, obj2, obj3)

    expect(result).toEqual({
      person: {
        name: 'Doe',
        age: 30,
        city: 'New York',
        class: [1, { cc: 1 }, 3, 4]
      }
    })
  })
})
