import { getRandomClient, getRandomCode, getRandomFreeURI } from '../utils';

export default async function getRandomMasterSettings(clients: number) {
  return {
    isMaster: true,
    uri: await getRandomFreeURI(),
    code: getRandomCode(),
    clients: Array.from({ length: clients }, getRandomClient),
  } as const;
}
