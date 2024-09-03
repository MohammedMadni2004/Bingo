export function setMatrix(message: string[]): number[][] | undefined {
  let mat_str: string[] = [];
  let third: string = message[2];

  // Split the string into an array of numbers
  mat_str = (typeof third === 'string') ? third.split(',') : [];
  
  // Check if the matrix can be filled with 5 rows and 5 columns
  const numRows = 5;
  const numCols = 5;
  const totalElements = numRows * numCols;

  // Convert the string array to numbers
  let matrix: number[] = mat_str.map((val) => parseInt(val, 10));
  
  // Check if the number of elements is sufficient
  if (matrix.length < totalElements) {
    console.log('Not enough elements to fill a 5x5 matrix.');
    return undefined;
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
  
  console.log(twoDMatrix);
  return twoDMatrix;
}
