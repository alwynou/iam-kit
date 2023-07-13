import isFunction from '../isFunction/index'
import isPromise from '../isPromise/index'

/**
 * Wraps a function with caching functionality.
 *
 * @template T - The type of the original function
 * @param {T} originalFn - The original function to be wrapped
 * @param {CacheWrapperConfig<T>} [config] - Configuration options for the cache wrapper
 * @returns {Wrapped<T>} - The wrapped function
 */
export function cacheWrapper<T extends (...args: any[]) => any>(
  originalFn: T,
  config?: CacheWrapperConfig<T>
): Wrapped<T> {
  let isPromiseFn = false
  const cacheMap = new Map<any, any>()

  const updateCache = (value: any, key: any, ...args: Parameters<T>) => {
    const shouldCache = config?.shouldCache?.(value, ...args) ?? true
    if (shouldCache) cacheMap.set(key, value)
  }

  const wrappedFn = ((...args) => {
    const matchKey = isFunction(config?.matchKey)
      ? config!.matchKey(...args)
      : config?.matchKey ?? '__default'

    if (cacheMap.has(matchKey)) {
      return isPromiseFn
        ? Promise.resolve(cacheMap.get(matchKey))
        : cacheMap.get(matchKey)
    }

    const result = originalFn(...args)

    if (isPromise(result)) {
      isPromiseFn = true
      return result.then(result => {
        updateCache(result, matchKey, ...args)
        return result
      })
    } else {
      updateCache(result, matchKey, ...args)
      return result
    }
  }) as Wrapped<T>

  wrappedFn.original = originalFn

  wrappedFn.cleanup = (key?: any) => {
    if (key) {
      cacheMap.has(key) && cacheMap.delete(key)
    } else {
      cacheMap.clear()
    }
  }

  return wrappedFn
}

export default cacheWrapper

interface CacheWrapperConfig<T extends (...args: any[]) => any> {
  /**
   * Get match key from cacheMap
   *
   * @default '__default'
   */
  matchKey?: string | number | ((...args: Parameters<T>) => any)
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

interface Wrapped<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  /**
   * Cleanup all or given key cache  data
   */
  cleanup: (key?: any) => void

  /**
   * Ignore cache and execute the original function
   */
  original: T
}
