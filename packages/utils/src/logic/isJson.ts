export default function isJson(string: unknown) {
  if (typeof string !== 'string' || !string.length) {
    return false;
  }

  try {
    JSON.parse(string);
  } catch (error) {
    return false;
  }

  return true;
}
