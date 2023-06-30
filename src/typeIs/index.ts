export function typeIs(value: unknown): Types | string {
  const typeOfType = typeof value
  if (typeOfType !== 'object') return typeOfType

  return (
    Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase()
      // eslint-disable-next-line unicorn/prefer-string-replace-all
      .replace(/\s/g, '')
  )
}

export default typeIs

type Types =
  | 'number'
  | 'boolean'
  | 'string'
  | 'symbol'
  | 'bigint'
  | 'undefined'
  | 'null'
  | 'object'
  | 'function'
  | 'date'
  | 'map'
  | 'set'
  | 'regexp'
  | 'arraybuffer'
  | 'blob'
