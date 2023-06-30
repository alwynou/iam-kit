import { toNumber } from '.'

describe('toNumber', () => {
  it('should convert a number-like value to a number', () => {
    expect(toNumber(123)).toBe(123)
    expect(toNumber(0x1_23)).toBe(0x1_23)
    expect(toNumber('0x123')).toBe(0x1_23)
    expect(toNumber(Infinity)).toBe(Infinity)
    expect(toNumber('123')).toBe(123)
    expect(toNumber(' 123 ')).toBe(123)
    expect(toNumber(' 123 ')).toBe(123)
    expect(toNumber(' 123abc ')).toBeNaN()
  })

  it('should convert a number-like value to NaN when strict is true', () => {
    expect(toNumber(null)).toBeNaN()
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(toNumber(undefined)).toBeNaN()
    expect(toNumber(true)).toBeNaN()
    expect(toNumber([])).toBeNaN()
    expect(toNumber({})).toBeNaN()
    expect(toNumber(Symbol())).toBeNaN()
  })

  it('should convert a number-like value to a number when strict is false', () => {
    expect(toNumber(null, false)).toBe(0)
    expect(toNumber(undefined, false)).toBeNaN()
    expect(toNumber(true, false)).toBe(1)
    expect(toNumber([], false)).toBe(0)
    expect(toNumber({}, false)).toBeNaN()
  })
})
