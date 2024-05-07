export default function isNumeric(string: unknown) {
  if (typeof string !== 'string') {
    return false;
  }

  // @ts-expect-error Argument of type 'unknown' is not assignable to parameter of type 'number'.
  return !isNaN(string) && !isNaN(parseFloat(string));
}
