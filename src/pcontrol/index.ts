import isFunction from '../isFunction/index'

/**
 * Composes multiple functions into a single function that can be executed sequentially.
 *
 * @param controlFns - An array of functions to compose.
 * @return A function that, when called, executes the composed functions sequentially.
 */
export function pcontrol<Ctx extends object | undefined>(
  controlFns: ControlFn<Ctx>[]
) {
  controlFns = controlFns.filter(isFunction)

  let currentIndex = -1
  let currentCtx = undefined as unknown as Ctx
  function dispatch(i: number): Promise<any> {
    if (i <= currentIndex) {
      return Promise.reject(new Error('next() called multiple times'))
    }
    currentIndex = i
    const fn = controlFns[i]
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

export default pcontrol

export type ControlNext = () => unknown | Promise<unknown>

type ControlFn<C extends object | undefined> = (
  next: ControlNext,
  context: C
) => void
