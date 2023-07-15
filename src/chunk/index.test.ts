import { chunk } from '.'

describe('chunk', () => {
  it('should split an array into smaller chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const size = 2
    const result = chunk(array, size)
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6]
    ])
  })

  it('should split an array into chunks where the last chunk may be smaller than the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const size = 3
    const result = chunk(array, size)
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6]
    ])
  })

  it('should return an empty array if the input array is empty', () => {
    const array: number[] = []
    const size = 2
    const result = chunk(array, size)
    expect(result).toEqual([])
  })

  it('should return an array with a single chunk if the input size is greater than the length of the array', () => {
    const array = [1, 2, 3, 4, 5, 6]
    const size = 10
    const result = chunk(array, size)
    expect(result).toEqual([[1, 2, 3, 4, 5, 6]])
  })
})
