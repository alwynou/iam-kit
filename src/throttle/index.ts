/**
 * A function that throttles the execution of another function.
 *
 * @param {function} func - The function to be throttled.
 * @param {number} delay - The delay in milliseconds.
 * @return {function} - The throttled function.
 */
export function throttle<T extends (...args: any[]) => unknown>(
  func: T,
  delay: number
): T {
  let previousCallTime = 0
  return function (this: any, ...args: any[]) {
    const nowTime = Date.now()
    if (nowTime > previousCallTime + delay) {
      func.apply(this, args)
      previousCallTime = nowTime
    }
  } as T
}

export default throttle
