import {
  createDevice,
  getConnectionByProcess,
  type Abort,
  type Communicator,
  type ProcessWithData,
} from '@compyto/connections';
import {
  areProcessesEqual,
  createGroup,
  createProcess,
  Operator,
  type Process,
} from '@compyto/core';
import { runtime } from '@compyto/runtime';
import type { Settings } from '@compyto/settings';
import { chunk, createQueue, remove } from '@compyto/utils';

import {
  SocketEvent,
  // type Socket,
  type SocketConnection,
  // type SocketsServer,
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
  rank: selfRank,
}: Settings): Communicator {
  // let selfIo: Socket | SocketsServer | null = null;
  const selfProcess = createProcess(selfCode, selfRank);
  const selfDevice = createDevice(selfUri, selfProcess);
  const selfGroup = createGroup();
  const selfConnections: SocketConnection[] = [];
  const selfQueue = createQueue<ProcessWithData>();
  let isStarted = false;

  // Validate ranks for being unique
  function validateRanks(processes: Process[]) {
    const ranks = [selfRank, ...processes.map(({ rank }) => rank)];
    const sortedRanks = ranks.sort((a, b) => a - b);

    if (!clients) {
      throw new Error('Clients are not defined');
    }

    if (clients.length !== sortedRanks.length) {
      throw new Error('Clients number must be equal to ranks number');
    }

    for (let i = 0; i <= clients.length; i++) {
      const rank = sortedRanks[i];

      if (rank !== i) {
        throw new Error(
          'Ranks must be unique and start from 0 to clients number',
        );
      }
    }
  }

  // write data to buffer 'buf'
  function writeToBuffer(buf: unknown[], data: unknown) {
    remove(buf);
    addDataToBuffer(buf, data);
  }

  function addDataToBuffer(buf: unknown[], data: unknown) {
    if (Array.isArray(data)) {
      buf.push(...data);
    } else {
      buf.push(data);
    }
  }

  function getProcessByRank(rank: number) {
    // TODO: check myself first - it is faster way
    let rootProcess = selfGroup.processes.find((p) => p.rank === rank);
    if (!rootProcess && rank === selfProcess.rank) rootProcess = selfProcess;
    if (!rootProcess) throw new Error('Can`t find process by rank');

    return rootProcess;
  }

  // In many methods we need to send only a part of data from index A and only length B
  // Use this method to keep code DRY
  function sliceSendData(
    data: unknown[],
    startIndex: number,
    sendCount: number,
  ) {
    const sliced = data.slice(startIndex);
    return sliced.slice(0, sendCount);
  }

  // Applies slice for send data and sends it to another process
  function sliceAndSend(
    data: unknown[],
    startIndex: number,
    sendCount: number,
    process: Process,
    abort?: Abort,
  ) {
    const sliced = sliceSendData(data, startIndex, sendCount);

    return send(sliced, process, abort);
  }

  function setConnections(connections: SocketConnection[]) {
    const processes = connections.map(({ device: { process } }) => process);
    selfConnections.push(...connections);
    selfGroup.add(...processes);
    setCommunicationHandlers(selfConnections, selfQueue);
  }

  function start() {
    return new Promise<void>((resolve) => {
      if (runtime.monitoring) {
        runtime.monitoring.context.process = selfProcess;
        runtime.monitoring.emit(
          'info:monitoring/context-set',
          runtime.monitoring.context,
        );
      }

      if (isMaster) {
        startMainPerson(clients!, selfUri, selfDevice, (io, connections) => {
          // selfIo = io;
          setConnections(connections);
          validateRanks(selfGroup.processes);
          io.emit(SocketEvent.CONFIRMATION_RECEIVED);

          isStarted = true;
          resolve(undefined);
        });
      } else {
        startPerson(master!, selfDevice, (io, connections) => {
          // selfIo = io;
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

  async function finalize(): Promise<never> {
    if (!isStarted) {
      throw new Error('Communicator is not started');
    }

    if (selfQueue.length)
      throw new Error('Cannot finalize, there are tasks in queue');

    // TODO:
    // if (pendingRequests) throw new Error('There are pending requests');

    runtime.monitoring?.emit('info:communications/finalize', selfProcess.rank);
    return process.exit(0);
  }

  async function send(data: unknown, process: Process, abort?: Abort) {
    return new Promise<void>((resolve, reject) => {
      function handleAbort() {
        reject(abort?.signal.reason);
      }

      abort?.signal?.addEventListener('abort', handleAbort, { once: true });

      if (areProcessesEqual(process, selfProcess)) {
        runtime.monitoring?.emit(
          'info:communications/sent-data',
          data,
          selfProcess.rank,
        );
        selfQueue.enqueue({
          data,
          process: selfProcess,
        });
      } else {
        const connection = getConnectionByProcess(selfConnections, process);

        if (!connection) {
          throw new Error('Connection not found');
        }

        runtime.monitoring?.emit(
          'info:communications/sent-data',
          data,
          process.rank,
        );
        connection.socket.emit(SocketEvent.SEND, data);
      }

      abort?.signal.removeEventListener('abort', handleAbort);
      resolve(undefined);
    });
  }

  // Use only for receiving arrays
  async function _receiveArrayPart(
    startIndex: number,
    recvCount: number,
    abort?: Abort,
  ): Promise<ProcessWithData<unknown[]>> {
    const processWithData = await _receive(abort);

    const { data, process } = processWithData;
    if (!Array.isArray(data)) throw new Error('Received data is not array');

    if (data.length < startIndex + recvCount) throw new Error('Wrong indexes');
    const sliced = data.slice(startIndex, startIndex + recvCount);

    return { data: sliced, process };
  }

  async function receiveArrayPart(
    buf: unknown[],
    startIndex: number,
    recvCount: number,
    abort?: Abort,
  ) {
    const processWithData = await _receiveArrayPart(
      startIndex,
      recvCount,
      abort,
    );

    writeToBuffer(buf, processWithData.data);
  }

  function _receive(abort?: Abort) {
    return new Promise<ProcessWithData<unknown>>((resolve, reject) => {
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
        const data = selfQueue.dequeue();
        runtime.monitoring?.emit(
          'info:communications/received-data',
          data.data,
          data.process.rank,
        );
        resolve(data);
      }
      // If error happens here maybe some VERY wrong parameters very passed in some function. Check your program
      abort?.signal?.addEventListener('abort', handleAbort, { once: true });

      if (selfQueue.length) {
        return handleEnqueue();
      }

      selfQueue.on('enqueue', handleEnqueue);
    });
  }

  async function receive(buf: Array<unknown>, abort?: Abort) {
    const processWithData = await _receive(abort);

    writeToBuffer(buf, processWithData.data);
  }

  async function broadcast(
    data: unknown[],
    sendStartIndex: number,
    sendCount: number,
    root: number,
    abort?: Abort,
  ) {
    const sliced = sliceSendData(data, sendStartIndex, sendCount);

    runtime.monitoring?.emit(
      'info:communications/broadcast-started',
      sliced,
      root,
    );
    const isMe = root === selfProcess.rank;

    if (isMe) {
      const processes = selfConnections.map(
        ({ device: { process } }) => process,
      );
      Promise.all(processes.map((process) => send(sliced, process, abort)));
      writeToBuffer(data, sliced);
      return;
    }

    await receive(data, abort);
    runtime.monitoring?.emit('info:communications/broadcast-finished');
  }

  async function scatter(
    data: unknown[],
    sendCount: number,
    buf: Array<ProcessWithData>,
    recvCount: number,
    root: number,
    abort?: Abort,
  ) {
    const isCalledByRoot = selfProcess.rank === root;
    if (isCalledByRoot) {
      // apply split and send to all processes
      const sliced = data.slice(0, (selfConnections.length + 1) * sendCount);
      const splitted = chunk(sliced, sendCount);

      runtime.monitoring?.emit(
        'info:communications/scatter-started-main',
        splitted,
        root,
      );
      await Promise.all(
        [...selfGroup.processes, selfProcess].map((process) =>
          send(splitted[process.rank] || [], process, abort),
        ),
      );
    } else {
      runtime.monitoring?.emit(
        'info:communications/scatter-started-person',
        root,
      );
    }
    await receiveArrayPart(buf, 0, recvCount, abort);
    runtime.monitoring?.emit('info:communications/scatter-finished', root);
  }

  async function scatterv(
    data: unknown[],
    sendCounts: number[],
    sendOffsets: number[],
    buf: unknown[],
    recvCount: number,
    root: number,
    abort?: Abort,
  ) {
    const isCalledByRoot = selfProcess.rank === root;
    runtime.monitoring?.emit(
      'info:communications/scatterv-started',
      data,
      sendCounts,
      sendOffsets,
      root,
    );
    if (isCalledByRoot) {
      await Promise.all(
        [...selfGroup.processes, selfProcess].map((process) => {
          const { rank } = process;
          const sendCount = sendCounts[rank];
          const sendOffset = sendOffsets[rank];
          const sendData = data.slice(sendOffset, sendCount + sendOffset);

          send(sendData, process, abort);
        }),
      );
    }

    await receiveArrayPart(buf, 0, recvCount, abort);
    runtime.monitoring?.emit('info:communications/scatterv-finished', root);
  }

  async function reduce(
    data: unknown[],
    buf: Array<unknown>,
    count: number,
    op: Operator,
    root: number,
    abort?: Abort,
  ) {
    runtime.monitoring?.emit(
      'info:communications/reduce-started',
      op.type,
      root,
    );
    const isMe = root === selfProcess.rank;
    const rootProcess = getProcessByRank(root);
    const sliced = sliceSendData(data, 0, count);
    if (!isMe) {
      // Just send data to root
      return send(sliced, rootProcess, abort);
    } else {
      // Collect all data
      const received: unknown[] = [];
      await Promise.all(
        selfGroup.processes.map(async () => {
          const { data } = await _receive(abort);
          addDataToBuffer(received, data);
        }),
      );

      addDataToBuffer(received, sliced);
      runtime.monitoring?.emit(
        'info:communications/reduce-all-data-receive',
        received,
      );
      const result = op.apply(received);
      runtime.monitoring?.emit('info:communications/reduce-calculated', result);
      writeToBuffer(buf, result);
    }
    runtime.monitoring?.emit(
      'info:communications/reduce-finished',
      op.type,
      root,
    );
  }

  async function allReduce(
    data: unknown[],
    buf: Array<unknown>,
    count: number,
    op: Operator,
    abort?: Abort,
  ) {
    runtime.monitoring?.emit('info:communications/all-reduce-started', op.type);
    const sliced = sliceSendData(data, 0, count);
    const temp: unknown[] = [];
    // send to all others
    for (const process of selfGroup.processes) {
      send(sliced, process, abort);
    }
    // myself data
    addDataToBuffer(temp, sliced);
    await Promise.all(
      selfGroup.processes.map(async () => {
        const { data } = await _receive(abort);
        addDataToBuffer(temp, data);
      }),
    );
    runtime.monitoring?.emit(
      'info:communications/all-reduce-all-data-receive',
      temp,
    );
    const result = op.apply(temp);
    runtime.monitoring?.emit(
      'info:communications/all-reduce-calculated',
      result,
    );
    writeToBuffer(buf, result);
    runtime.monitoring?.emit(
      'info:communications/all-reduce-finished',
      op.type,
    );
  }

  function placeDataInBufferByRankAndCount(
    buf: unknown[],
    data: unknown[],
    senderRank: number,
    recvCount: number,
  ) {
    for (
      let i = senderRank * recvCount, dataBufferIndex = 0;
      i < (senderRank + 1) * recvCount && dataBufferIndex < data.length;
      i++, dataBufferIndex++
    ) {
      buf[i] = data[dataBufferIndex];
    }
  }

  async function gather(
    data: unknown[],
    sendCount: number,
    buf: Array<ProcessWithData>,
    recvCount: number,
    root: number,
    abort?: Abort,
  ) {
    runtime.monitoring?.emit('info:communications/gather-started');
    const isMe = root === selfProcess.rank;
    const rootProcess = getProcessByRank(root);
    if (!isMe) {
      // send to root
      await sliceAndSend(data, 0, sendCount, rootProcess, abort);
    }

    if (isMe) {
      await gatherAsRoot(data, buf, 0, recvCount, abort);
    }
    runtime.monitoring?.emit('info:communications/gather-finished');
  }
  const writeToBufferByProcess = async (
    process: Process,
    received: unknown[],
    buf: unknown[],
    recvCounts: number[],
    recvOffsets: number[],
  ) => {
    const { rank } = process;
    const count = recvCounts[rank];
    const offset = recvOffsets[rank];

    for (let i = offset, j = 0; i < offset + count; i++, j++) {
      buf[i] = received[j];
    }
  };
  async function gatherv(
    data: unknown[],
    sendCount: number,
    buf: unknown[],
    recvCounts: number[],
    recvOffsets: number[],
    root: number,
    abort?: Abort,
  ) {
    runtime.monitoring?.emit('info:communications/gatherv-started');
    const isMe = root === selfProcess.rank;
    const rootProcess = getProcessByRank(root);
    if (!isMe) {
      return sliceAndSend(data, 0, sendCount, rootProcess, abort);
    }

    await Promise.all(
      selfGroup.processes.map(async () => {
        const { data: received, process } = await _receive(abort);
        const { rank } = process;
        const count = recvCounts[rank];
        if (!Array.isArray(received)) throw new Error('Received not array'); // not possible, only for TS
        const arrayPart = received.slice(0, count);

        writeToBufferByProcess(
          process,
          arrayPart,
          buf,
          recvCounts,
          recvOffsets,
        );
      }),
    );
    writeToBufferByProcess(selfProcess, data, buf, recvCounts, recvOffsets);
    runtime.monitoring?.emit('info:communications/gatherv-finished');
  }

  async function allGather(
    data: unknown[],
    sendStartIndex: number,
    sendCount: number,
    buf: Array<ProcessWithData>,
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ) {
    runtime.monitoring?.emit('info:communications/all-gather-started');
    Promise.all(
      selfGroup.processes.map((p) =>
        sliceAndSend(data, sendStartIndex, sendCount, p, abort),
      ),
    );

    await gatherAsRoot(data, buf, recvStartIndex, recvCount, abort);
    runtime.monitoring?.emit('info:communications/all-gather-finished');
  }

  async function gatherAsRoot(
    data: unknown[],
    buf: unknown[],
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ) {
    placeDataInBufferByRankAndCount(buf, data, selfProcess.rank, recvCount);

    await Promise.all(
      selfGroup.processes.map(async () => {
        const processWithData = await _receiveArrayPart(
          recvStartIndex,
          recvCount,
          abort,
        );

        const { data, process } = processWithData;
        const senderRank = process.rank;
        return placeDataInBufferByRankAndCount(
          buf,
          data,
          senderRank,
          recvCount,
        );
      }),
    );
  }

  async function allToAll(
    data: unknown[],
    sendStartIndex: number,
    sendCount: number,
    buf: unknown[],
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ) {
    const sliced = data.slice(
      sendStartIndex,
      (selfConnections.length + 1) * sendCount,
    );
    runtime.monitoring?.emit('info:communications/all-to-all-started', sliced);
    const splitted = chunk(sliced, sendCount);

    selfGroup.processes.map((p) => {
      send(splitted[p.rank], p, abort);
    });

    await Promise.all(
      selfGroup.processes.map(async () => {
        const { data, process } = await _receiveArrayPart(
          recvStartIndex,
          recvCount,
          abort,
        );

        placeDataInBufferByRankAndCount(buf, data, process.rank, recvCount);
      }),
    );
    placeDataInBufferByRankAndCount(
      buf,
      splitted[selfProcess.rank],
      selfProcess.rank,
      recvCount,
    );
    runtime.monitoring?.emit('info:communications/all-to-all-finished');
  }

  function size() {
    return selfGroup.processes.length + 1;
  }

  function rank() {
    return selfProcess.rank;
  }

  return {
    isMaster,
    process: selfProcess,
    group: selfGroup,
    start,
    size,
    rank,
    send,
    receive,
    scatterv,
    broadcast,
    scatter,
    gather,
    gatherv,
    reduce,
    allReduce,
    allGather,
    allToAll,
    finalize,
  };
}
