import { get } from '.'

describe('get', () => {
  it('should return the value at the specified path', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(get(obj, 'a.b.c')).toBe(123)
  })

  it('should return undefined if the path does not exist', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(get(obj, 'a.b.d')).toBeUndefined()
  })

  it('should return the object itself if the path is empty', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(get(obj, '')).toBe(obj)
  })

  it('should handle arrays in the path', () => {
    const obj = {
      a: [
        {
          b: {
            c: 123
          }
        },
        {
          b: {
            c: 456
          }
        }
      ]
    }
    expect(get(obj, 'a.1.b.c')).toBe(456)
  })
})
