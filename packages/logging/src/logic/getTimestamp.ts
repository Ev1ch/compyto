export default function getTimestamp() {
  const date = new Date().toISOString().replace('Z', '');

  return date.substring(date.indexOf('T') + 1);
}
