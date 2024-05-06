export default function getPosition(box: HTMLDivElement) {
  const { offsetTop, offsetHeight } = box;
  return { top: offsetTop, height: offsetHeight };
}
