import isFunction from '../isFunction/index'
import isPromise from '../isPromise/index'

/**
 * Creates a memoized version of the given function.
 *
 * @param {Function} originalFn - The original function to be memoized.
 * @param {Object} [config] - Configuration options for memoization.
 * @return {Function} The memoized version of the original function.
 */
export function createMemo<T extends (...args: any[]) => any>(
  originalFn: T,
  config?: createMemoConfig<T>
): Memoized<T> {
  let isPromiseFn = false
  const cacheMap = new Map<any, any>()

  const updateCache = (value: any, key: any, args: Parameters<T>) => {
    const shouldCache = config?.shouldCache?.(value, ...args) ?? true
    if (shouldCache) cacheMap.set(key, value)
  }

  const memoizedFn = ((...args) => {
    const matchKey = isFunction(config?.key)
      ? config!.key(...args)
      : config?.key ?? '__default'

    if (cacheMap.has(matchKey)) {
      return isPromiseFn
        ? Promise.resolve(cacheMap.get(matchKey))
        : cacheMap.get(matchKey)
    }

    const result = originalFn(...args)

    if (isPromise(result)) {
      isPromiseFn = true
      return result.then(result => {
        updateCache(result, matchKey, args)
        return result
      })
    } else {
      updateCache(result, matchKey, args)
      return result
    }
  }) as Memoized<T>

  memoizedFn.original = originalFn

  memoizedFn.clear = (key?: any) => {
    if (key) {
      cacheMap.has(key) && cacheMap.delete(key)
    } else {
      cacheMap.clear()
    }
  }

  return memoizedFn
}

export default createMemo

interface createMemoConfig<T extends (...args: any[]) => any> {
  /**
   * Get match key from cacheMap
   *
   * @default '__default'
   */
  key?: string | number | ((...args: Parameters<T>) => any)
  /**
   * whether shuloud cache
   *
   * @default () => true
   */
  shouldCache?: (
    result: Awaited<ReturnType<T>>,
    ...args: Parameters<T>
  ) => boolean
}

interface Memoized<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  /**
   * Cleanup all or given key cache  data
   */
  clear: (key?: any) => void

  /**
   * Ignore cache and execute the original function
   */
  original: T
}
