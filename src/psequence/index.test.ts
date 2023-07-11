/* eslint-disable no-return-await */
/* eslint-disable require-await */
import { psequence } from '.'

const sleep = (v: number) => new Promise(resolve => setTimeout(resolve, v))

describe('pCompose', () => {
  it('should execute the composed functions sequentially', async () => {
    type Context = { value: Number[] }
    const context: Context = { value: [] }

    const fn1 = vitest.fn(async (next: any, context: Context) => {
      context.value.push(1)
      await next()
      await sleep(500)
      context.value.push(7)
    })
    const fn2 = vitest.fn(async (next: any, context: Context) => {
      context.value.push(2)
      await sleep(500)
      context.value.push(3)
      await next()
      context.value.push(6)
    })
    const fn3 = vitest.fn(async (next: any, context: Context) => {
      context.value.push(4)
      await next()
      context.value.push(5)
    })
    const composeFns = [fn1, fn2, fn3]
    const composedFn = psequence(composeFns)

    await composedFn(context)

    expect(fn1).toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
    expect(fn3).toHaveBeenCalled()
    expect(context.value).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('should handle errors thrown by the composed functions', async () => {
    const fn1 = vitest.fn(next => next())
    const fn2 = vitest.fn(next => {
      throw new Error('Test error')
      next()
    })
    const fn3 = vitest.fn()
    const composeFns = [fn1, fn2, fn3]
    const composedFn = psequence(composeFns)

    await expect(composedFn()).rejects.toThrow('Test error')
  })

  it('should reject if next() is called multiple times', async () => {
    const mockFn1 = vitest.fn(next => next().then(() => next()))
    const mockFn2 = vitest.fn(next => next())

    await expect(psequence([mockFn1, mockFn2])()).rejects.toThrow(
      'next() called multiple times'
    )
  })

  it('should throw an error if `psequence` is called with non-function arguments', () => {
    const composeFns = [null]

    // @ts-expect-error
    expect(() => psequence(composeFns)).toThrow(
      '`psequence` function args must be composed of functions!'
    )
  })

  it('should throw an error if `psequence` is called with non-array argument', () => {
    const composeFns = null
    // @ts-expect-error
    expect(() => psequence(composeFns)).toThrow(
      '`psequence` function args must be an array!'
    )
  })
})
