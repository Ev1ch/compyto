import { State, type Device, type URI } from '@/connections/domain';
import type { Process } from '@/core/domain';
import { createBalances, getBalancesByDevice } from '@/balancing/logic';

import { Event, type SocketConnection, type SocketsServer } from '../domain';
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
      socket.emit(Event.IDENTIFICATION, selfDevice);
      console.log('Sent identification to', device);

      const deviceBalances = getBalancesByDevice(balances, device);
      socket.emit(Event.BALANCES, deviceBalances);
      console.log(
        'Sent balances to',
        device,
        JSON.stringify(deviceBalances, null, 2),
      );

      socket.once(Event.CONFIRMATION, () => {
        console.log('Got a confirmation from', device);
        connection.state = State.CONFIRMED;

        if (connections.every(({ state }) => state === State.CONFIRMED)) {
          callback(io, connections);
        }
      });
    });
  });

  io.listen(port);
  console.log('Listening on port', port);
}
