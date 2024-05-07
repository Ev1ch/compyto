export default function getTimestamp(date = Date.now()): string {
  const stringifiedDate = date.toString();

  return stringifiedDate;
}
