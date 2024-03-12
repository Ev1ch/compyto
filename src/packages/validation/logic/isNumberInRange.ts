export default function isNumberInRange(
  value: number,
  minimum: number,
  maximum: number,
) {
  return value >= minimum && value <= maximum;
}
