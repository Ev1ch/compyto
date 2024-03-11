import { createProcess } from '@/core/logic';

import type { Process } from '@/core/domain';
import { createQueue } from '@/utils/logic';

import getConnectionByProcess from '../../../logic/getConnectionByProcess';
import createSocketDevice from '../../../logic/creators/createDevice';
import startMainPerson from '../startMainPerson';
import startPerson from '../startPerson';
import createURI from '../../../logic/creators/createURI';
import startCommunication from '../startCommunication';
import { SocketConnection } from '../../domain';

const isMaster = process.argv.includes('--master');
const i = process.argv.indexOf('--code');
const code = i !== -1 ? process.argv[i + 1] : 'master';
const j = process.argv.indexOf('--port');
const port = j !== -1 ? Number(process.argv[j + 1]) : 3000;

export default function createSocketCommunicator() {
  const selfProcess = createProcess(code);
  const selfUri = createURI('http://localhost', port);
  const selfDevice = createSocketDevice(selfUri, selfProcess);
  const selfConnections: SocketConnection[] = [];
  const selfQueue = createQueue();

  function start() {
    return new Promise((resolve) => {
      if (isMaster) {
        startMainPerson(port, (io, connections) => {
          selfConnections.push(...connections);
          startCommunication(selfConnections, selfQueue);
          io.emit(Event.CONFIRMATION_RECEIVED);
          resolve(undefined);
        });
      } else {
        startPerson(selfDevice, (io, connections) => {
          selfConnections.push(...connections);
          startCommunication(selfConnections, selfQueue);
          io.emit(Event.CONFIRMATION);
          io.on(Event.CONFIRMATION_RECEIVED, resolve);
        });
      }
    });
  }

  async function send(data: unknown, processes: Process[]) {
    processes.forEach((process) => {
      const connection = getConnectionByProcess(selfConnections, process);

      if (!connection) {
        throw new Error('Connection not found');
      }

      connection.socket.emit(Event.SEND, data);
    });
  }

  function receive() {
    return new Promise((resolve) => {
      if (selfQueue.length) {
        return resolve(selfQueue.dequeue());
      }

      selfQueue.onEnqueue(resolve);
    });
  }

  return {
    isMaster,
    get processes() {
      return selfConnections.map(({ device: { process } }) => process);
    },
    start,
    send,
    receive,
  };
}

(async () => {
  const communicator = createSocketCommunicator();
  await communicator.start();

  console.log('Started');

  if (communicator.isMaster) {
    await communicator.send('Hello, world!', [communicator.processes[0]]);
    await communicator.send('Hello, world!', [communicator.processes[1]]);
    console.log('Data sent');
  } else {
    const data = await communicator.receive();
    console.log('Received data', data);
  }
})();
