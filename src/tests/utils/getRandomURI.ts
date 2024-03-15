import getRandomPath from './getRandomPath';
import getRandomPort from './getRandomPort';

export default function getRandomURI() {
  return {
    path: getRandomPath(),
    port: getRandomPort(),
  };
}
