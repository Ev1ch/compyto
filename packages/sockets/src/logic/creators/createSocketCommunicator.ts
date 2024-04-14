import _ from 'lodash';

import {
  createDevice,
  getConnectionByProcess,
  type Abort,
  type Communicator,
  type ProcessWithData,
} from '@compyto/connections';
import { createGroup, createProcess, type Process } from '@compyto/core';
import type { Settings } from '@compyto/settings';
import { createQueue } from '@compyto/utils';

import {
  SocketEvent,
  type Socket,
  type SocketConnection,
  type SocketsServer,
} from '../../domain';
import setCommunicationHandlers from '../setCommunicationHandlers';
import startMainPerson from '../startMainPerson';
import startPerson from '../startPerson';

export default function createSocketCommunicator({
  isMaster = false,
  code: selfCode,
  uri: selfUri,
  clients,
  master,
  rank,
}: Settings): Communicator {
  let selfIo: Socket | SocketsServer | null = null;
  const selfProcess = createProcess(selfCode, rank);
  const selfDevice = createDevice(selfUri, selfProcess);
  const selfGroup = createGroup();
  const selfConnections: SocketConnection[] = [];
  const selfQueue = createQueue<ProcessWithData>();
  let isStarted = false;

  function validateRanks(processes: Process[]) {
    const ranks = processes.map((p) => p.rank);
    const uniqueRanks = _.uniq(ranks);
    const unique = uniqueRanks.length === processes.length;
    if (!unique) {
      const grouped = _.groupBy(ranks);
      const dublicates = _.filter(grouped, (items) => items.length > 1).map(
        (d) => d[0],
      );
      throw new Error(`Ranks must be unique. Dublicates: ${dublicates}`);
    }
  }

  function setConnections(connections: SocketConnection[]) {
    const processes = connections.map(({ device: { process } }) => process);
    validateRanks(processes);
    selfConnections.push(...connections);
    selfGroup.add(...processes);
    setCommunicationHandlers(selfConnections, selfQueue);
  }

  function start() {
    return new Promise<void>((resolve) => {
      if (isMaster) {
        startMainPerson(clients!, selfUri, selfDevice, (io, connections) => {
          selfIo = io;
          setConnections(connections);
          io.emit(SocketEvent.CONFIRMATION_RECEIVED);
          validateRanks(selfGroup.processes);

          isStarted = true;
          resolve(undefined);
        });
      } else {
        startPerson(master!, selfDevice, (io, connections) => {
          selfIo = io;
          setConnections(connections);
          io.emit(SocketEvent.CONFIRMATION);
          io.on(SocketEvent.CONFIRMATION_RECEIVED, () => {
            isStarted = true;
            resolve(undefined);
          });
        });
      }
    });
  }

  async function finalize() {
    if (!isStarted) {
      throw new Error('Communicator is not started');
    }

    selfConnections.forEach(({ socket }) => {
      socket.disconnect(true);
    });

    if (isMaster) {
      (selfIo as SocketsServer).close();
    } else {
      (selfIo as Socket).disconnect(true);
    }
  }

  async function send(data: unknown, processes: Process[], abort?: Abort) {
    return new Promise<void>((resolve, reject) => {
      function handleAbort() {
        reject(abort?.signal.reason);
      }

      abort?.signal.addEventListener('abort', handleAbort, { once: true });

      processes.forEach((process) => {
        const connection = getConnectionByProcess(selfConnections, process);

        if (!connection) {
          throw new Error('Connection not found');
        }

        connection.socket.emit(SocketEvent.SEND, data);
      });

      abort?.signal.removeEventListener('abort', handleAbort);
      resolve(undefined);
    });
  }

  function broadcast(data: unknown, abort?: Abort) {
    const processes = selfConnections.map(({ device: { process } }) => process);

    return send(data, processes, abort);
  }

  function receive(abort?: Abort) {
    return new Promise<ProcessWithData>((resolve, reject) => {
      function handleAbort() {
        selfQueue.off('enqueue', handleEnqueue);
        reject(abort?.signal.reason);
      }

      function handleEnqueue() {
        /**
         * Prevent race condition, when
         * there are multiple `receive` calls,
         * and the previous one took the value.
         */
        if (!selfQueue.length) {
          return;
        }

        selfQueue.off('enqueue', handleEnqueue);
        abort?.signal.removeEventListener('abort', handleAbort);
        resolve(selfQueue.dequeue());
      }

      abort?.signal.addEventListener('abort', handleAbort, { once: true });

      if (selfQueue.length) {
        return handleEnqueue();
      }

      selfQueue.on('enqueue', handleEnqueue);
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
    finalize,
  };
}
