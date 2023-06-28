/**
 * Currying
 *
 * @param {function} fn
 * @returns {function}
 */
export function curry<F extends (...args: any[]) => any>(fn: F): Curry<F> {
  return function curried(...args: any[]): any {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return (...nextArgs: any[]): any => {
        return curried(...args, ...nextArgs)
      }
    }
  } as Curry<F>
}

export default curry

type CurryImp<A, R, D extends unknown[] = []> = A extends [infer H, ...infer T]
  ? T extends []
    ? (...args: [...D, H]) => R
    : ((...args: [...D, H]) => CurryImp<T, R>) & CurryImp<T, R, [...D, H]>
  : () => R

type Curry<F> = F extends (...P: infer A) => infer R ? CurryImp<A, R> : never
