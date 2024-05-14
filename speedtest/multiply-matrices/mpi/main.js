import { AbortError } from '@compyto/connections';
import { createRunner } from '@compyto/runner';

import {
  generateRandomMatrix,
  multiplyMatrices,
  // printMatrix,
} from '../common.js';

export default async function start() {
  // Settings
  const MATRIX_SIZE = 2500; // Change N to whatever size you want
  const MIN_NUMBER = 1; // Lower bound for random integers
  const MAX_NUMBER = 1; // Upper bound for random integers
  const MASTER_RANK = 0;

  const { communicator } = await createRunner();
  await communicator.start();
  const totalProcesses = communicator.size();
  const rank = communicator.rank();
  if (totalProcesses < 2) {
    throw new AbortError('Need at least 2 Compyto tasks');
  }
  let matrixA = [];
  let matrixB = [];
  const matrixC = [];

  let startTime = 0;
  if (communicator.isMaster) {
    // Generate matrices in master to econom resources
    matrixA = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    matrixB = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    startTime = Date.now();
    // console.log('Generated matrices on master');
  }
  const rowsPerProcess = Math.floor(MATRIX_SIZE / totalProcesses);
  const extra = MATRIX_SIZE % totalProcesses;

  const rowsCounts = [];
  const offsetCounts = [];

  for (let i = 0; i < totalProcesses; i++) {
    rowsCounts[i] = i < extra ? rowsPerProcess + 1 : rowsPerProcess;
    offsetCounts[i] =
      i === MASTER_RANK ? 0 : offsetCounts[i - 1] + rowsCounts[i - 1];
  }
  const rowsForThisProcess = rowsCounts[rank];
  const aRows = [];

  await communicator.scatterv(
    matrixA, // data
    rowsCounts, // counts
    offsetCounts, // displays
    aRows, // buffer
    rowsForThisProcess, // receive count
    MASTER_RANK, // root rank
  );
  console.log('Finished scatter', aRows.length);
  await communicator.broadcast(matrixB, 0, MATRIX_SIZE, MASTER_RANK);
  console.log('Finished broadcast', matrixB.length);
  const cRows = multiplyMatrices(aRows, matrixB);
  console.log('Finished multiplication', cRows.length);

  await communicator.gatherv(
    cRows,
    rowsForThisProcess,
    matrixC,
    rowsCounts,
    offsetCounts,
    MASTER_RANK,
  );
  console.log('Finished gather', cRows.length);

  const endTime = Date.now();
  const totalTime = endTime - startTime;

  if (startTime) {
    console.log('Total time:', totalTime);
  }

  // await communicator.finalize();
}
