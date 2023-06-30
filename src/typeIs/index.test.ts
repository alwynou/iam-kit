import { typeIs } from '.'

describe('typeIs', () => {
  it('should return the correct type for primitive values', () => {
    expect(typeIs(5)).toBe('number')
    expect(typeIs('hello')).toBe('string')
    expect(typeIs(true)).toBe('boolean')
    expect(typeIs(null)).toBe('null')
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(typeIs(undefined)).toBe('undefined')
  })

  it('should return the correct type for objects', () => {
    expect(typeIs({})).toBe('object')
    expect(typeIs([])).toBe('array')
    expect(typeIs(new Date())).toBe('date')
    expect(typeIs(/regex/)).toBe('regexp')
    expect(typeIs(new Map())).toBe('map')
    expect(typeIs(new Set())).toBe('set')
  })
})
