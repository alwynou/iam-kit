/**
 * Checks if the given object has all the specified properties.
 *
 * @param {T} obj - The object to check for properties.
 * @param {Array<string | number | symbol>} props - An array of property names to check.
 * @return {boolean} Returns true if the object has all the properties, false otherwise.
 */
export function hasProp<T extends object>(
  obj: T,
  props: Array<string | number | symbol>
): boolean
/**
 * Checks if the given object has all the specified properties.
 *
 * @param {T} obj - The object to check for properties.
 * @param {Array<string | number | symbol>} [...props ] - An array of property names to check.
 * @return {boolean} Returns true if the object has all the properties, false otherwise.
 */
export function hasProp<T extends object>(
  obj: T,
  ...props: Array<string | number | symbol>
): boolean
export function hasProp<T extends object>(obj: T, ...props: any[]) {
  if (Array.isArray(props[0])) props = props[0]
  if (!props?.length) return true
  return props.every(prop =>
    typeof prop === 'symbol'
      ? Object.getOwnPropertySymbols(obj).includes(prop)
      : Object.prototype.hasOwnProperty.call(obj, prop)
  )
}
