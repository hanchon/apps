export function contains<T extends Readonly<unknown[]>>(
  array: T,
  item: unknown
) {
  return array.includes(item);
}
