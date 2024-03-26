export default function getRandomPath() {
  return `/${Math.random().toString(36).substring(2)}`;
}
