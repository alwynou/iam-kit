import { uniq } from '.'

describe('uniq', () => {
  it('should return an array with unique elements', () => {
    const input = [1, 2, 3, 3, 4, 4, 5]
    const expectedOutput = [1, 2, 3, 4, 5]

    expect(uniq(input)).toEqual(expectedOutput)
  })

  it('should return an empty array if input is empty', () => {
    const input: number[] = []
    const expectedOutput: number[] = []

    expect(uniq(input)).toEqual(expectedOutput)
  })

  it('should return an array with a single element if input has only one element', () => {
    const input = [1]
    const expectedOutput = [1]

    expect(uniq(input)).toEqual(expectedOutput)
  })
})
