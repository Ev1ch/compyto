export default function getTimestamp(date = new Date()): string {
  const stringifiedDate = date.toISOString().replace('Z', '');

  return stringifiedDate.substring(stringifiedDate.indexOf('T') + 1);
}
