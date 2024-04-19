export default function getDatesDifference(a: Date, b: Date) {
  return new Date(a.getTime() - b.getTime());
}
