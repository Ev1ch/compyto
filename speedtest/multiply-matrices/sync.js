import { generateRandomMatrix, multiplyMatrices, printMatrix } from './common';

(() => {
  const TOTAL_RUNS = 20;
  const MATRIX_SIZE = 2500; // Change N to whatever size you want
  const MIN_NUMBER = 1; // Lower bound for random integers
  const MAX_NUMBER = 1; // Upper bound for random integers
  for (let i = 0; i < TOTAL_RUNS; i++) {
    const matrix1 = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    const matrix2 = generateRandomMatrix(MATRIX_SIZE, MIN_NUMBER, MAX_NUMBER);
    const startTime = Date.now();

    const resultMatrix = multiplyMatrices(matrix1, matrix2);

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    //   printMatrix(resultMatrix);

    console.log(totalTime);
  }
})();
