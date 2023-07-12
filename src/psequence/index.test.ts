import { psequence } from '.'

describe('psequence', () => {
  it('should execute functions in sequence and return an array of results', async () => {
    const fn1 = vitest.fn(() => Promise.resolve(1))
    const fn2 = vitest.fn((num: number) => Promise.resolve(num + 1))
    const fn3 = vitest.fn((num: number) => Promise.resolve(num + 1))

    const sequenceFns = [fn1, fn2, fn3]

    const result = await psequence(sequenceFns)

    expect(result).toEqual([1, 2, 3])

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(1)
  })
})
