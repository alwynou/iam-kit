import { sleep } from '.'

test('Test with 0 milliseconds sleep', async () => {
  const start = Date.now()
  await sleep(0)
  const end = Date.now()
  expect(end - start).toBeLessThan(10) // Allow a small margin of error
})

test('Test with positive milliseconds sleep', async () => {
  const start = Date.now()
  await sleep(100)
  const end = Date.now()
  expect(end - start).toBeGreaterThanOrEqual(100)
})
