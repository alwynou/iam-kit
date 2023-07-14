import { diff } from '.'

describe('diff', () => {
  it('should return obj2 when both obj1 and obj2 are not objects or have different types', () => {
    // @ts-expect-error
    expect(diff(5, 10)).toEqual(10)
    // @ts-expect-error
    expect(diff('hello', [1, 2, 3])).toEqual([1, 2, 3])
  })

  it('shuild return the difference between arr1 and arr2', () => {
    expect(diff([1, 2, 3], [1, 2, 3])).toEqual([])
    expect(diff([1, 2, 3], [1, 4, 3])).toEqual([4])
    expect(diff([1, 2, 3], [1, 4, 5])).toEqual([4, 5])
    expect(diff([1, 2, { a: 1 }, 6], [1, 4, 5])).toEqual([4, 5])
    expect(diff([1, 2, { a: 1 }, 6], [1, 4, { a: 2, b: 2 }])).toEqual([
      4,
      { a: 2, b: 2 }
    ])
  })

  it('should return an obj2-like object when obj1 is an empty object and obj2 is a non-empty object', () => {
    expect(diff({}, { name: 'John', age: 30 })).toEqual({
      name: 'John',
      age: 30
    })
  })

  it('should return an obj2-Like array when obj1 is an empty array and obj2 is a non-empty array', () => {
    expect(diff([], [1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should return the difference between obj1 and obj2', () => {
    const obj1 = { name: 'John', age: 30, hobbies: ['reading', 'gaming'] }
    const obj2 = { name: 'John', age: 25, hobbies: ['reading', 'cooking'] }
    const expected = { age: 25, hobbies: ['cooking'] }
    expect(diff(obj1, obj2)).toEqual(expected)
  })

  it('should handle cases where obj2 has a key that obj1 does not have', () => {
    const obj1 = { name: 'John', age: 30 }
    const obj2 = { name: 'John', age: 35, hobbies: ['reading', 'gaming'] }
    const expected = { age: 35, hobbies: ['reading', 'gaming'] }
    expect(diff(obj1, obj2)).toEqual(expected)
  })

  it('should handle cycle reference', () => {
    const cycleObj = { name: 1 }
    ;(cycleObj as any).cycle = cycleObj

    const obj1 = { name: 'John', age: 30, cycleObj }
    const obj2 = {
      name: 'John',
      age: 35,
      hobbies: ['reading', 'gaming'],
      cycleObj: { name: 2, cycle: cycleObj }
    }

    expect(diff(obj1, obj2)).toMatchInlineSnapshot(`
      {
        "age": 35,
        "cycleObj": {
          "cycle": {},
          "name": 2,
        },
        "hobbies": [
          "reading",
          "gaming",
        ],
      }
    `)
  })
})
