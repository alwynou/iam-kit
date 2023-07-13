import isFunction from '../isFunction/index'
import pcontrol from '../pcontrol/index'
import type { ControlNext } from '../pcontrol/index'

/**
 * Executes a sequence of functions asynchronously and returns an array of results.
 *
 * @param {SequenceFn[]} sequenceFns - An array of functions to be executed in sequence.
 * @return {Promise<any[]>} - A promise that resolves to an array of results.
 */
export async function psequence<T extends SequenceFn[]>(
  sequenceFns: T
): SequenceReturn<T> {
  const result: unknown[] = []
  let prevRet: any = null

  const controlledFns = sequenceFns.filter(isFunction).map(f => {
    return async (next: ControlNext) => {
      prevRet = await f(prevRet)
      result.push(prevRet)
      await next()
    }
  })

  await pcontrol(controlledFns)()

  return result as unknown as SequenceReturn<T>
}

export default psequence

type SequenceFn = (prevRet?: any) => Promise<unknown>

type SequenceReturn<T extends unknown[]> = Promise<{
  [P in keyof T]: T[P] extends (...args: any[]) => Promise<infer P>
    ? Awaited<P>
    : any
}>
