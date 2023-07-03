import { debounce } from '.'

describe('debounce', () => {
  test('should debounce the function', () => {
    // Test case 1: Verify that the debounced function is not immediately invoked
    // after the first invocation
    const func1 = vitest.fn()
    const debouncedFunc1 = debounce(func1, 100)
    debouncedFunc1()
    expect(func1).not.toBeCalled()

    // Test case 2: Verify that the debounced function is invoked after the specified
    // time has elapsed since the last invocation
    const func2 = vitest.fn()
    const debouncedFunc2 = debounce(func2, 100)
    debouncedFunc2()
    setTimeout(() => {
      debouncedFunc2()
      expect(func2).toBeCalled()
    }, 200)

    // Test case 3: Verify that the debounced function is immediately invoked
    // after the first invocation (when immediate is true)
    const func3 = vitest.fn()
    const debouncedFunc3 = debounce(func3, 100, true)
    debouncedFunc3()
    expect(func3).toBeCalled()
  })
})
