import { cacheWrapper } from '.'

describe('cacheWrapper', () => {
  it('should cache and retrieve the result of the original function', () => {
    const originalFn = vitest.fn().mockReturnValue('result')
    const wrappedFn = cacheWrapper(originalFn)

    const result1 = wrappedFn()
    const result2 = wrappedFn()

    expect(originalFn).toHaveBeenCalledTimes(1)
    expect(result1).toBe('result')
    expect(result2).toBe('result')
  })

  it('should cache and retrieve the result of the original function with custom matchKey', () => {
    const originalFn = vitest.fn().mockReturnValue('result')
    const matchKey = 'customKey'
    const wrappedFn = cacheWrapper(originalFn, { matchKey })

    const result1 = wrappedFn()
    const result2 = wrappedFn()

    expect(originalFn).toHaveBeenCalledTimes(1)
    expect(result1).toBe('result')
    expect(result2).toBe('result')
  })

  it('should not cache the result if shouldCache returns false', () => {
    const originalFn = vitest.fn().mockReturnValue('result')
    const shouldCache = vitest.fn().mockReturnValue(false)
    const wrappedFn = cacheWrapper(originalFn, { shouldCache })

    const result1 = wrappedFn()
    const result2 = wrappedFn()

    expect(originalFn).toHaveBeenCalledTimes(2)
    expect(shouldCache).toHaveBeenCalledTimes(2)
    expect(result1).toBe('result')
    expect(result2).toBe('result')
  })

  it('should cache and retrieve the result of the original function returning a promise', async () => {
    const originalFn = vitest.fn(() => Promise.resolve('result'))
    const wrappedFn = cacheWrapper(originalFn)

    const result1 = await wrappedFn()
    const result2 = await wrappedFn()

    expect(originalFn).toHaveBeenCalledTimes(1)
    expect(result1).toBe('result')
    expect(result2).toBe('result')
  })

  it('should cleanup the cache for a specific matchKey', () => {
    const originalFn = vitest.fn().mockReturnValue('result')
    const matchKey = 'customKey'
    const wrappedFn = cacheWrapper(originalFn, { matchKey })

    const result1 = wrappedFn()
    const result2 = wrappedFn()
    expect(originalFn).toHaveBeenCalledTimes(1)
    wrappedFn.cleanup(matchKey)
    const result3 = wrappedFn()
    expect(originalFn).toHaveBeenCalledTimes(2)

    expect(result1).toBe('result')
    expect(result2).toBe('result')
    expect(result3).toBe('result')
  })

  it('should ignore the cache', () => {
    const originalFn = vitest.fn().mockReturnValue('result')
    const wrappedFn = cacheWrapper(originalFn)

    const result1 = wrappedFn()
    const result2 = wrappedFn.original()

    expect(originalFn).toHaveBeenCalledTimes(2)

    expect(result1).toBe('result')
    expect(result2).toBe('result')
  })
})
