import { createRunner } from '@compyto/runner';

import {
  generateRandomMatrix,
  multiplyMatrices,
  // printMatrix,
} from '../common.js';

export default async function start() {
  // Settings
  const MATRIX_SIZE = 100; // Change N to whatever size you want
  const MIN_NUMBER = 1; // Lower bound for random integers
  const MAX_NUMBER = 1; // Upper bound for random integers
  const MASTER_RANK = 0;

  const { communicator } = await createRunner();
  await communicator.start();
  const totalProcesses = communicator.group.processes.length + 1;
  let matrixA = [];
  let matrixB = [];

  let startTime = 0;
  if (communicator.isMaster) {
    // Generate matrices in master to econom resources
    matrixA = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    matrixB = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    startTime = Date.now();
    // console.log('Generated matrices on master');
  }
  const matrixC = [];
  const aRows = [];
  const sendToEachProcess = Math.floor(MATRIX_SIZE / totalProcesses);
  await communicator.scatter(
    matrixA,
    sendToEachProcess,
    aRows,
    sendToEachProcess,
    MASTER_RANK,
  );
  console.log('Finished scatter', aRows.length);
  await communicator.broadcast(matrixB, 0, MATRIX_SIZE, MASTER_RANK);
  console.log('Finished broadcast', matrixB.length);
  const cRows = multiplyMatrices(aRows, matrixB);
  console.log('Finished multiplication', cRows.length);

  await communicator.gather(
    cRows,
    cRows.length,
    matrixC,
    cRows.length,
    MASTER_RANK,
  );
  console.log('Finished gather', cRows.length);

  const endTime = Date.now();
  const totalTime = endTime - startTime;

  if (startTime) {
    console.log('Total time:', totalTime);
  }
}
