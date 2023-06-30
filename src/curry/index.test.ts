import { curry } from '.'

const add = (a: number, b: number) => a + b

describe('curry', () => {
  it('should return a curried function', () => {
    const curriedAdd = curry(add)
    expect(typeof curriedAdd).toBe('function')
  })

  it('should return correct result when all arguments are provided at once', () => {
    const curriedAdd = curry(add)
    const result = curriedAdd(2, 3)
    expect(result).toBe(5)
  })

  it('should return a partially applied function when not all arguments are provided', () => {
    const curriedAdd = curry(add)
    const addTwo = curriedAdd(2)
    expect(typeof addTwo).toBe('function')
  })

  it('should return correct result when partially applied function is invoked with remaining arguments', () => {
    const curriedAdd = curry(add)
    const addTwo = curriedAdd(2)
    const result = addTwo(3)
    expect(result).toBe(5)
  })
})
