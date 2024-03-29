import { createBalances, getBalancesByDevice } from '@compyto/balancing';
import { State, type Device, type URI } from '@compyto/connections';
import type { Process } from '@compyto/core';
import { runtime } from '@compyto/runtime';

import {
  SocketEvent,
  type SocketConnection,
  type SocketsServer,
} from '../domain';
import { createSocketServer } from './creators';
import { waitForConnections } from './waiting';

export type StartMainPersonCallback = (
  io: SocketsServer,
  connections: SocketConnection[],
) => void;

export default function startMainPerson(
  clients: Process[],
  { port }: URI,
  selfDevice: Device,
  callback: StartMainPersonCallback,
) {
  const io = createSocketServer();
  const codes = clients.map(({ code }) => code);

  waitForConnections(io, codes, (connections) => {
    const devices = connections.map(({ device }) => device);
    const balances = createBalances(devices);

    connections.forEach((connection) => {
      const { socket, device } = connection;
      socket.emit(SocketEvent.IDENTIFICATION, selfDevice);
      runtime.monitoring!.emit(
        'info:connections/main-person-identification-sent',
      );

      const deviceBalances = getBalancesByDevice(balances, device);
      socket.emit(SocketEvent.BALANCES, deviceBalances);
      runtime.monitoring!.emit(
        'info:connections/main-person-balances-sent',
        deviceBalances,
      );

      socket.once(SocketEvent.CONFIRMATION, () => {
        runtime.monitoring!.emit(
          'info:connections/main-person-confirmation-received',
          connection.device,
        );
        connection.state = State.CONFIRMED;

        if (connections.every(({ state }) => state === State.CONFIRMED)) {
          callback(io, connections);
        }
      });
    });
  });

  io.listen(port);
  runtime.monitoring!.emit('info:connections/main-person-started');
}
