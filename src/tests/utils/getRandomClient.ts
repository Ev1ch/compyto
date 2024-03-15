import getRandomCode from './getRandomCode';

export default function getRandomClient() {
  return {
    code: getRandomCode(),
  };
}
