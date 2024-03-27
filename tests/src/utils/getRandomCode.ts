export default function getRandomCode() {
  return `code-${Math.random().toString(36).substring(2, 15)}`;
}
