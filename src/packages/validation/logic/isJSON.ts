export default function isJSON(value: string) {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
