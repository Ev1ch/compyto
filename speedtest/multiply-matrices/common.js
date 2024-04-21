export function generateRandomMatrix(N, A, B) {
  let matrix = [];
  for (let i = 0; i < N; i++) {
    let row = [];
    for (let j = 0; j < N; j++) {
      row.push(Math.floor(Math.random() * (B - A + 1)) + A);
    }
    matrix.push(row);
  }
  return matrix;
}

export function multiplyMatrices(matrix1, matrix2) {
  let result = [];
  for (let i = 0; i < matrix1.length; i++) {
    let row = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

export function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join('\t'));
  }
}
