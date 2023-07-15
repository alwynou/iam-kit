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
  })
})
