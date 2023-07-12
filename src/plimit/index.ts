import { isFunction } from '../isFunction'
import { pcontrol } from '../pcontrol'
import type { ControlNext } from '../pcontrol'

/**
 * Executes an array of promise functions or async functions in parallel with a limit on the number of concurrent executions.
 *
 * @param {T[]} promiseFns - An array of promise functions or async functions.
 * @param {PlimitConfig} [config={}] - Configuration options for controlling the concurrency limit.
 * @param {number} [config.limit=5] - The maximum number of promise functions or async functions that can be executed concurrently.
 * @return {Promise<PlimitReturn<T>>} A promise that resolves to an array containing the results of all the executed promise functions or async functions.
 */
export function plimit<T extends PlimitItem[]>(
  promiseFns: T,
  config: PlimitConfig = {}
): PlimitReturn<T> {
  const { limit = 5 } = config
  const result = [] as any
  const wrapSlice = (originFns: PlimitItem[]) => {
    return async (next: ControlNext) => {
      const ret = await Promise.all(
        originFns.map(f => (isFunction(f) ? f() : f))
      )
      result.push(...ret)
      await next()
    }
  }
  const sliceFn = (fns: T) => {
    const total = fns.length
    const slicedPromiseFns: Array<PlimitItem>[] = []
    let index = 0
    while (index <= total) {
      const arr = fns.slice(index, index + limit)
      arr.length && slicedPromiseFns.push(arr)

      index += limit
    }
    return slicedPromiseFns.map(wrapSlice)
  }
  const runner = pcontrol(sliceFn(promiseFns))
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      await runner()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export default plimit

type PlimitItem = Promise<unknown> | ((...args: unknown[]) => Promise<unknown>)

type PlimitReturn<T extends unknown[]> = Promise<{
  [P in keyof T]: T[P] extends Promise<unknown>
    ? Awaited<T[P]>
    : T[P] extends (...args: any[]) => Promise<infer P>
    ? Awaited<P>
    : any
}>
type PlimitConfig = {
  limit?: number
}
