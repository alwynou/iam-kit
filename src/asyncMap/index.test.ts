import sleep from '../sleep'
import { asyncMap } from '.'

describe('asyncMap', () => {
  it('should map each element of the array to a new value using the callback function', async () => {
    const collection = [1, 2, 3]

    const sequenceTimes: number[] = []
    const callback1 = async (value: number) => {
      await sleep(100)
      sequenceTimes.push(performance.now())
      return value * 2
    }

    const concurrentTimes: number[] = []
    const callback2 = async (value: number) => {
      await sleep(100)
      concurrentTimes.push(performance.now())
      return value * 2
    }

    const result1 = await asyncMap(collection, callback1, true)
    const result2 = await asyncMap(collection, callback2, false)

    expect(result1).toEqual([2, 4, 6])
    expect(result2).toEqual([2, 4, 6])

    expect(sequenceTimes[2] - sequenceTimes[0]).greaterThanOrEqual(200)
    expect(concurrentTimes[2] - concurrentTimes[0]).lessThanOrEqual(2)
  })

  it('should handle empty array', async () => {
    const collection: number[] = []
    const callback = async (value: number) => value * 2

    const result = await asyncMap(collection, callback)

    expect(result).toEqual([])
  })

  it('should handle promises that reject', async () => {
    const collection = [1, 2, 3]
    const callback = async (value: number) => {
      if (value === 2) {
        throw new Error('Error processing value 2')
      }
      return value * 2
    }

    await expect(asyncMap(collection, callback)).rejects.toThrow(
      'Error processing value 2'
    )
  })
})
