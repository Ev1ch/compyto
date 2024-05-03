import type { Group, Operator, Process, Rank } from '@compyto/core';

import type Abort from './Abort';
import type Data from './Data';

/**
 * Core network abstraction which allows to
 * communicate between {@link core/src.Process | processes}, give methods for
 * this communication and provides information about
 * {@link core/src.Process | processes} which are present in the network.
 */
export default interface Communicator {
  /** Identifies if the process is master (root) */
  isMaster: boolean;
  /** Gives you a link to current {@link core/src.Process | process}*/
  process: Process;
  /** Communicator {@link core/src.Group | group} */
  group: Group;
  /** Start method should be called in every app.
   * It starts Master and Slaves processes, waits for their successful connection to each other.
   * When master is started it waits for all connections described in settings file.
   * When slave is started it calls some {@link sockets/src.SocketEvent | socket events}.
   * Here is step-by-step events:
   * - `connection` is called (default socket event) on master. Every connection is remembered, and it keeps waiting until connections number won't be the same as in Settings file.
   * - Master identifies himself to slaves by sending `identification` event
   * - Master creates {@link balancing/src.Balance Balances} and sends `balances` event to shares balances with slaves
   * - After all balances are gathered - master knows all slaves, each slave knows balances and knows master
   * - Each slave emits `confirmation` event
   * - Master state changed to 'confirmed'
   * - Master emits `confirmation_received` event
   * - Slaves receive `confirmation_received` that means that we are ready to launch the app
   */
  start(): Promise<void>;
  /** Send data to specified process
   *  This method can be called to send data to any process you need.
   *  It also can be called to send from Process-0 to Process-0 (2 same processes)
   *  After send data will be added to socket's queue in implementing the imterface specified here: {@link connections/src.Data | ProcessWithData}
   */
  send(data: Data, process: Process, abort?: Abort): Promise<void>;
  /** Receive data from the queue and write it to specified buffer.
   * Receiving buffer `MUST` be an array, as in Javascript we can operate on it by address (without overwriting)
   * Before writing data to buffer it will be cleaned.
   */
  receive(buf: Array<Data>, abort?: Abort): Promise<void>;
  /** Send data to every process in Communicator group.
   */
  broadcast(
    data: Data,
    sendStartIndex: number,
    sendCount: number,
    root: Rank,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Scatter will take your array and split data equally and share a single part to each process in group. Some data can be lost. See example:
   * - If you had an array [1,2,3,4], and you have 3 devices in total, then scatter will split this array in 3 parts:
   * - [[1], [2], [3]]
   * - [1] - will be sent to process with rank 0
   * - [2] - will be sent to process with rank 1
   * - [3] - will be sent to process with rank 2
   * - Element 4 from the array is lost, as it didn't fit.
   *
   * After sending, each process receives part of data that was sent to him, and writes data to buffer.
   *
   * Sending operation will be called only on process with rank `root`. Receive will be called on every process.
   * @param data Array of data to send
   * @param sendStartIndex From which index should start your send buffer. Use 0 to begin from very start
   * @param sendCount How many elements should go into each process
   * @param buf Receiving buffer
   * @param recvStartIndex From which index should start received buffer (Received array will be sliced). Use 0 to get all data
   * @param recvCount How many elements should go from received data to buffer
   * @param root Process rank from which send should be executed
   * @param abort Abort controller for errors
   */
  scatter(
    data: Data[],
    sendCount: number,
    buf: Data[],
    recvCount: number,
    root: Rank,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Gather will take your data from every process inside of the group and send it to one process
   * to collect data into one array. Order of data depends on the process rank. Example:
   * - On process with rank 0 we have data [1,2]
   * - On process with rank 1 we have data [3,4]
   * - On process with rank 2 we have data [5,6]
   * - Let's gather all this data into master process with rank 0.
   * - Use `gather(data, 0, 2, result, 0, 2, 0, abort)`
   * - On process with rank 0, in variable called `result` you will find data [1,2,3,4,5,6]
   * - On other processes variable `result` is empty
   *
   * Remember that by using params sendStartIndex, sendCount, recvStartIndex, recvCount you can operate sending and receiving data easily
   *
   * @param data Array of data to gather
   * @param sendStartIndex From which index should start your send buffer. Use 0 to begin from very start
   * @param sendCount How many elements should be sent
   * @param buf Array where all data will be gathered
   * @param recvStartIndex From which index should start received buffer (Received array will be sliced). Use 0 to get all data
   * @param recvCount How many elements should go from received data to buffer
   * @param root Process rank where result data will be gathered
   * @param abort Abort controller for errors
   */
  gather(
    data: Data[],
    sendCount: number,
    buf: Data[],
    recvCount: number,
    root: Rank,
    abort?: Abort,
  ): Promise<void>;

  allGather(
    data: Data[],
    sendStartIndex: number,
    sendCount: number,
    buf: Data[],
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ): Promise<void>;
  reduce(
    data: Data[],
    buf: Data[],
    count: number,
    op: Operator,
    root: Rank,
    abort?: Abort,
  ): Promise<void>;
  allReduce(
    data: Data[],
    buf: Data[],
    count: number,
    op: Operator,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Finish the app. NOT WORKING RIGHT NOW, JUST DONT USE TO PREVENT ERRORS
   */
  finalize(): Promise<void>;
}
