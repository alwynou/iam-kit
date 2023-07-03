import { isSymbol } from '.'

describe('isSymbol', () => {
  it('should return true for symbols', () => {
    const symbol = Symbol()
    expect(isSymbol(symbol)).toBe(true)
  })

  it('should return false for non-symbols', () => {
    expect(isSymbol('test')).toBe(false)
    expect(isSymbol(123)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    // @ts-expect-error
    expect(isSymbol()).toBe(false)
    expect(isSymbol({})).toBe(false)
    expect(isSymbol([])).toBe(false)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isSymbol(() => {})).toBe(false)
  })
})
