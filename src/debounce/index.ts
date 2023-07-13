/**
 * Debounces a function, delaying its execution until after a specified time has elapsed since the last time it was invoked.
 *
 * @param {T} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before invoking the debounced function.
 * @param {boolean} immediate - Optional. If true, the debounced function is invoked immediately after the first invocation.
 * @return {T} - The debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): T {
  let timeout: ReturnType<typeof setTimeout> | null
  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
    const context = this
    if (immediate) {
      immediate = false
      func.apply(context, args)
    } else {
      const later = () => {
        timeout = null
        func.apply(context, args)
      }
      timeout && clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  } as T
}

export default debounce
