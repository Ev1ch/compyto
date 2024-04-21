import { createRunner } from '@compyto/runner';

import { generateRandomMatrix, multiplyMatrices, printMatrix } from './common';

(async () => {
  const TOTAL_RUNS = 20;
  const MATRIX_SIZE = 2500; // Change N to whatever size you want
  const MIN_NUMBER = 1; // Lower bound for random integers
  const MAX_NUMBER = 1; // Upper bound for random integers

  const { communicator } = await createRunner();
  await communicator.start();
  const totalProcesses = communicator.group.processes + 1;
  const matrixA = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
  const matrixB = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);

  const aRows = [];

  await communicator.scatter(
    matrixA,
    0,
    MATRIX_SIZE,
    aRows,
    0,
    MATRIX_SIZE / totalProcesses,
    0,
  );
  await communicator.broadcast();

  await communicator.finalize();
})();
