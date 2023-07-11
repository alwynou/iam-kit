/* eslint-disable no-return-await */

import { plimit } from '.'

describe('syncLimit', () => {
  it('should execute promise functions in parallel with a limit on concurrency', async () => {
    const promiseFns = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    ]
    const result = await plimit(promiseFns, { limit: 2 })
    expect(result).toEqual([1, 2, 3])
  })

  it('should execute async functions in parallel with a limit on concurrency', async () => {
    const asyncFns = [
      async () => await Promise.resolve(1),
      async () => await Promise.resolve(2),
      async () => await Promise.resolve(3)
    ]
    const result = await plimit(asyncFns, { limit: 2 })
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle empty input', async () => {
    const result = await plimit([], { limit: 2 })
    expect(result).toEqual([])
  })

  it('should handle single function input', async () => {
    const promiseFns = [() => Promise.resolve(1)]
    const result = await plimit(promiseFns, { limit: 2 })
    expect(result).toEqual([1])
  })

  it('should reject if any of the functions throw an error', async () => {
    const promiseFns = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Error')),
      () => Promise.resolve(3)
    ]
    await expect(plimit(promiseFns, { limit: 2 })).rejects.toThrowError('Error')
  })
})
