/**
 * Sleeps for the specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @return {Promise<void>} A promise that resolves after the sleep.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export default sleep
