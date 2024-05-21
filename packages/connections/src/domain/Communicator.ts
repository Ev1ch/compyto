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
   *
   * @param data Data to send
   * @param process Process on which to send data
   * @param abort Abort controller
   *
   */
  send(data: Data, process: Process, abort?: Abort): Promise<void>;
  /** Receive data from the queue and write it to specified buffer.
   * Receiving buffer `MUST` be an array, as in Javascript we can operate on it by address (without overwriting)
   * Before writing data to buffer it will be cleaned.
   *
   * @param buf Buffer where to write data
   * @param abort Abort controller
   */
  receive(buf: Array<Data>, abort?: Abort): Promise<void>;
  /** Send data to every process in Communicator group.
   *
   * @param data Data to broadcast. After broadcast this array will re-written by new data.
   * @param sendStartIndex Starting index from which to send data
   * @param sendCount How many elements to send. This is also length of resulting array
   * @param root Rank of the process from where data should be taken for broadcase
   * @param abort Abort controller
   *
   */
  broadcast(
    data: Data[],
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
   * @param sendCount How many elements should go into each process (10 elements / 5 processes => sendCount=2)
   * @param buf Receiving buffer
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
   * Scatter data from the send buffer to all processes in the communicator.
   * Each process receives a portion of the data determined by sendCounts and sendOffsets.
   * The data is scattered from the send buffer to the receive buffer of each process.
   *
   * Example:
   * - Process has data=[1,2,3,4,5,6]
   * - sendCounts=[1,4,1] => process 0 should get 1 element, process 1 should get 4 elements, process 2 should get 1 element
   * - sendOffsets=[0,1,5] => sendIndexes for process 0=[0], sendIndexes for process 1=[1,2,3,4], sendIndexes for process 2=[5]
   * - In result P0 will get [1]. P1 will get [2,3,4,5]. P3 will get [6].
   *
   * @param {Array} data - The data array to be scattered.
   * @param {Array} sendCounts - An array specifying the number of elements to send to each process.
   * @param {Array} sendOffsets - An array specifying the displacement (offset) for each process in the send buffer.
   * @param {Array} buf - The receive buffer where the received data will be stored.
   * @param {number} recvCount - The number of elements to receive in the receive buffer.
   * @param {number} root - The rank of the process sending the data (root process).
   * @param abort Abort controller for errors
   */
  scatterv(
    data: Data[],
    sendCounts: number[],
    sendOffsets: number[],
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
   * @param sendCount How many elements should be sent
   * @param buf Array where all data will be gathered
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

  /**
   * Gather data from all processes in the communicator to the receive buffer of the root process.
   * Each process sends a portion of the data determined by sendCount.
   * The data is gathered from the send buffer of each process to the receive buffer of the root process.
   *
   * Example:
   * - Process 0 has data=[1]
   * - Process 1 has data=[2,3,4,5]
   * - Process 2 has data=[6]
   * - sendCounts=[1,4,1] => process 0 should send 1 element, process 1 should send 4 elements, process 2 should send 1 element
   * - sendOffsets=[0,1,5] => receiveIndexes for process 0=[0], receiveIndexes for process 1=[1,2,3,4], receiveIndexes for process 2=[5]
   * - In result root process will get [1,2,3,4,5,6].
   *
   * @param {Array} data - The data array to be sent by each process.
   * @param {number} sendCount - The number of elements to send from each process.
   * @param {Array} buf - The receive buffer where the gathered data will be stored (root process only).
   * @param {Array} recvCounts - An array specifying the number of elements to receive from each process.
   * @param {Array} recvOffsets - An array specifying the displacement (offset) for each process in the receive buffer.
   * @param {number} root - The rank of the process that gathers the data (root process).
   * @param abort Abort controller for errors
   */
  gatherv(
    data: Data[],
    sendCount: number,
    buf: Data[],
    recvCounts: number[],
    recvOffsets: number[],
    root: Rank,
    abort?: Abort,
  ): Promise<void>;

  /**
   * Gather data from all processes in the communicator to the receive buffer of each process.
   * Each process sends a portion of the data determined by sendStartIndex and sendCount.
   * The gathered data is stored in the receive buffer of each process.
   *
   * @param {Array} data - The data array to be sent by each process.
   * @param {number} sendStartIndex - The starting index in the send buffer from which to send data.
   * @param {number} sendCount - The number of elements to send from each process.
   * @param {Array} buf - The receive buffer where the gathered data will be stored.
   * @param {number} recvStartIndex - The starting index in the receive buffer where to store the gathered data.
   * @param {number} recvCount - The number of elements to receive in the receive buffer.
   * @param abort Abort controller for errors
   */
  allGather(
    data: Data[],
    sendStartIndex: number,
    sendCount: number,
    buf: Data[],
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Perform a reduction operation across all processes in the communicator.
   * Each process contributes data from the data array to the reduction operation,
   * and the result is stored in the receive buffer of the root process.
   *
   * Existing operators are: MAX, MIN, SUM, PROD, LAND, LOR, BAND, BOR, LXOR, BXOR, MAXLOC, MINLOC
   * You can get these from '@compyto/core' by importing `OPERATOR`.
   *
   * @param {Array} data - The data array contributed by each process to the reduction operation.
   * @param {Array} buf - The receive buffer where the result of the reduction operation will be stored (root process only).
   * @param {number} count - The number of elements in the data and receive buffers.
   * @param {Operator} op - The reduction operation to be performed.
   * @param {number} root - The rank of the process that will receive the result of the reduction operation (root process).
   * @param abort Abort controller for errors
   */
  reduce(
    data: Data[],
    sendStartIndex: number,
    buf: Data[],
    recvCount: number,
    op: Operator,
    root: Rank,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Perform a reduction operation across all processes in the communicator and distribute the result to all processes.
   * Each process contributes data from the data array to the reduction operation,
   * and the result is stored in the receive buffer of each process.
   *
   * Existing operators are: MAX, MIN, SUM, PROD, LAND, LOR, BAND, BOR, LXOR, BXOR, MAXLOC, MINLOC
   * You can get these from '@compyto/core' by importing `OPERATOR`.
   *
   * @param {Array} data - The data array contributed by each process to the reduction operation.
   * @param {Array} buf - The receive buffer where the result of the reduction operation will be stored for each process.
   * @param {number} count - The number of elements in the data and receive buffers.
   * @param {Operator} op - The reduction operation to be performed.
   * @param abort Abort controller for errors
   */
  allReduce(
    data: Data[],
    sendStartIndex: number,
    buf: Data[],
    count: number,
    op: Operator,
    abort?: Abort,
  ): Promise<void>;
  /**
   * Scatter data from the send buffer to all processes in the communicator, and gather data from all processes to the receive buffer.
   * Each process sends a portion of the data determined by sendStartIndex and sendCount to all other processes,
   * and receives a portion of the data from all other processes into the receive buffer.
   *
   * @param {Array} data - The data array to be sent by each process.
   * @param {number} sendStartIndex - The starting index in the send buffer from which to send data.
   * @param {number} sendCount - The number of elements to send from each process.
   * @param {Array} buf - The receive buffer where the received data will be stored.
   * @param {number} recvStartIndex - The starting index in the receive buffer where to store the received data.
   * @param {number} recvCount - The number of elements to receive in the receive buffer from each process.
   * @param abort Abort controller for errors
   */
  allToAll(
    data: Data[],
    sendStartIndex: number,
    sendCount: number,
    buf: Data[],
    recvStartIndex: number,
    recvCount: number,
    abort?: Abort,
  ): Promise<void>;

  /**
   * Returns a total number of processes (including myself)
   */
  size(): number;
  /**
   * Returns rank of current process, on which it was called.
   */
  rank(): number;
  /**
   * Finish the app. NOT WORKING RIGHT NOW, JUST DONT USE TO PREVENT ERRORS
   */
  finalize(): Promise<void>;
}
