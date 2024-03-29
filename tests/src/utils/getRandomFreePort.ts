import { createServer } from 'net';

export default async function getRandomFreePort(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const server = createServer();

    server.listen(0, () => {
      const address = server.address();

      if (typeof address === 'string') {
        return reject(new Error(`Address is string: ${address}`));
      }

      if (!address) {
        return reject(new Error('Address is null'));
      }

      const port = address.port;

      server.close((error) => {
        if (error) {
          return reject(error);
        }

        resolve(port);
      });
    });
  });
}
