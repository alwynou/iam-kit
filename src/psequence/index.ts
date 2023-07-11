import forEach from '../forEach'
import isFunction from '../isFunction'

/**
 * Composes multiple functions into a single function that can be executed sequentially.
 *
 * @param sequenceFns - An array of functions to compose.
 * @return A function that, when called, executes the composed functions sequentially.
 */
export function psequence<Ctx extends object | undefined>(
  sequenceFns: SequenceFn<Ctx>[]
) {
  if (!Array.isArray(sequenceFns)) {
    throw new TypeError('`psequence` function args must be an array!')
  }

  forEach(sequenceFns as SequenceFn<Ctx>[], fn => {
    if (!isFunction(fn)) {
      throw new TypeError(
        '`psequence` function args must be composed of functions!'
      )
    }
  })

  let currentIndex = -1
  let currentCtx = undefined as unknown as Ctx
  function dispatch(i: number): Promise<any> {
    if (i <= currentIndex) {
      return Promise.reject(new Error('next() called multiple times'))
    }
    currentIndex = i
    const fn = sequenceFns[i]
    if (!fn) {
      return Promise.resolve()
    }
    try {
      return Promise.resolve(fn(dispatch.bind(null, i + 1), currentCtx))
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (context?: Ctx) => {
    context && (currentCtx = context)
    return dispatch(0)
  }
}

export default psequence

export type SequenceNext = () => unknown | Promise<unknown>

type SequenceFn<C extends object | undefined> = (
  next: SequenceNext,
  context: C
) => void
