import type { Communicator } from '@/connections/domain';
import type { Process } from '@/core/domain';
import type { Settings } from '@/runner/domain';
import { createDevice, getConnectionByProcess } from '@/connections/logic';
import { createGroup, createProcess } from '@/core/logic';
import { createQueue } from '@/utils/logic';

import { Event, type SocketConnection } from '../../domain';
import setCommunicationHandlers from '../setCommunicationHandlers';
import startMainPerson from '../startMainPerson';
import startPerson from '../startPerson';

export default function createSocketCommunicator({
  isMaster = false,
  code: selfCode,
  uri: selfUri,
  clients,
  master,
}: Settings): Communicator {
  const selfProcess = createProcess(selfCode);
  const selfDevice = createDevice(selfUri, selfProcess);
  const selfGroup = createGroup();
  const selfConnections: SocketConnection[] = [];
  const selfQueue = createQueue();

  function setConnections(connections: SocketConnection[]) {
    const processes = connections.map(({ device: { process } }) => process);
    selfConnections.push(...connections);
    selfGroup.add(...processes);
    setCommunicationHandlers(selfConnections, selfQueue);
  }

  function start() {
    return new Promise<void>((resolve) => {
      if (isMaster) {
        startMainPerson(clients!, selfUri, selfDevice, (io, connections) => {
          setConnections(connections);
          io.emit(Event.CONFIRMATION_RECEIVED);
          resolve(undefined);
        });
      } else {
        startPerson(master!, selfDevice, (io, connections) => {
          setConnections(connections);
          io.emit(Event.CONFIRMATION);
          io.on(Event.CONFIRMATION_RECEIVED, () => resolve(undefined));
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

  function broadcast(data: unknown) {
    const processes = selfConnections.map(({ device: { process } }) => process);

    return send(data, processes);
  }

  function receive() {
    return new Promise((resolve) => {
      if (selfQueue.length) {
        return resolve(selfQueue.dequeue());
      }

      function handleEnqueue() {
        selfQueue.removeListener('enqueue', handleEnqueue);
        resolve(selfQueue.dequeue());
      }

      selfQueue.addListener('enqueue', handleEnqueue);
    });
  }

  return {
    isMaster,
    process: selfProcess,
    group: selfGroup,
    start,
    send,
    receive,
    broadcast,
  };
}
