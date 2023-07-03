import { throttle } from '.'

describe('throttle', () => {
  it('should throttle the execution of the function', async () => {
    // Test case 1: Ensure the function is called only once within the given delay
    const fn1 = vitest.fn()
    const throttledFn1 = throttle(fn1, 100)
    throttledFn1()
    throttledFn1()
    throttledFn1()
    expect(fn1).toHaveBeenCalledTimes(1)

    // Test case 2: Ensure the function is called multiple times if the delay has passed
    const fn2 = vitest.fn()
    const throttledFn2 = throttle(fn2, 100)
    throttledFn2()
    throttledFn2()
    throttledFn2()
    setTimeout(throttledFn2, 100)
    setTimeout(throttledFn2, 300)
    setTimeout(throttledFn2, 410)
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(fn2).toHaveBeenCalledTimes(4)
  })
})
