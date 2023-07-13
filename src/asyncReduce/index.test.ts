import { asyncReduce } from '.'

describe('asyncReduce', () => {
  it('should reduce the collection asynchronously with the callback function', async () => {
    const collection = [1, 2, 3, 4, 5]
    const callback = async (previousValue: number, currentValue: number) =>
      previousValue + currentValue

    const result = await asyncReduce(collection, callback)

    expect(result).toBe(15)
  })

  it('should reduce the collection asynchronously with the callback function and an initial value', async () => {
    const collection = [1, 2, 3, 4, 5]
    const callback = async (previousValue: number, currentValue: number) =>
      previousValue + currentValue

    const initialValue = 10

    const result = await asyncReduce(collection, callback, initialValue)

    expect(result).toBe(25)
  })

  it('should handle an empty collection', async () => {
    const collection: number[] = []
    const callback = async (previousValue: number, currentValue: number) =>
      previousValue + currentValue

    const result = await asyncReduce(collection, callback)

    expect(result).toBeUndefined()
  })

  it('should accept error', async () => {
    const collection = [1, 2, 3, 4, 5]
    const callback = async (previousValue: number, currentValue: number) => {
      if (previousValue > 5) {
        throw new Error('Error message.')
      }
      return previousValue + currentValue
    }

    await expect(asyncReduce(collection, callback)).rejects.toThrow(
      'Error message.'
    )
  })

  it('should handle a collection with a single element', async () => {
    const collection = [5]
    const callback = vitest.fn(
      async (previousValue: number, currentValue: number) =>
        previousValue + currentValue
    )

    const result = await asyncReduce(collection, callback)

    expect(callback).toHaveBeenCalledTimes(0)

    expect(result).toBe(5)
  })
})
