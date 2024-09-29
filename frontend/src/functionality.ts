export function setMatrix(message: string[]): number[][] {
  let mat_str: string[] = [];
  let index = message[2].length == 33 ? 3 : 2
  let third: string = message[index];

  mat_str = (typeof third === 'string') ? third.split(',') : [];

  const numRows = 5;
  const numCols = 5;
  const totalElements = numRows * numCols;

  let matrix: number[] = mat_str.map((val) => parseInt(val, 10));

  if (matrix.length < totalElements) {

  }

  let twoDMatrix: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    let row: number[] = [];
    for (let j = 0; j < numCols; j++) {
      let index = i * numCols + j;
      row.push(matrix[index]);
    }
    twoDMatrix.push(row);
  }

  return twoDMatrix;
}
