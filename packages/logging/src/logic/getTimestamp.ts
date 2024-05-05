export default function getTimestamp(date = performance.now()): string {
  const stringifiedDate = date.toString();

  return stringifiedDate;
}
