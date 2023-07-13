import { isDefined } from '../isDefined/index'
import { psequence } from '../psequence/index'

/**
 * Returns a promise that resolves to the result of reducing the given collection using the provided callback function.
 *
 * @param {T[]} collection - The collection to be reduced.
 * @param {CallBackFn<T, V>} callback - The callback function to be applied to each element of the collection.
 * @return {Promise<V>} A promise that resolves to the reduced value.
 */
export function asyncReduce<
  T extends Array<any>,
  V = T extends Array<infer VV> ? VV : unknown
>(collection: T, callback: CallBackFn<T, V, V>): Promise<V>
/**
 * A function that asynchronously reduces an array-like collection using a callback function and an initial value.
 *
 * @param {T extends Array<any>} collection - The array-like collection to be reduced.
 * @param {CallBackFn<T, U>} callback - The callback function that is called for each element in the collection.
 * @param {U} initialValue - The initial value for the reduction.
 * @return {Promise<U>} A promise that resolves to the final reduced value.
 */
export function asyncReduce<T extends Array<any>, U>(
  collection: T,
  callback: CallBackFn<T, U, T[number]>,
  initialValue: U
): Promise<U>
export function asyncReduce<T extends Array<any>>(
  collection: T,
  callback: CallBackFn<T, any, any>,
  initialValue?: any
) {
  let previousValue: any

  if (isDefined(initialValue)) {
    previousValue = initialValue
  } else {
    previousValue = collection[0]
  }

  const wrapFns = collection
    .map((v, index) => {
      if (!initialValue && index === 0) return null as any
      return async () =>
        (previousValue = await callback(previousValue, v, index, collection))
    })
    .filter(Boolean)

  return psequence(wrapFns).then(() => previousValue)
}

export default asyncReduce

type CallBackFn<T, R, C> = (
  previousValue: R,
  currentValue: C,
  index: number,
  source: T
) => R | Promise<R>
