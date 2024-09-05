export function handleReset() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    const final: number[][] = Array.from({ length: 5 }, (_, i) =>
      numbers.slice(i * 5, (i + 1) * 5)
    );
    return final;
};
export function updateMatrix(matrix:number[][],n:string){
  let number=parseInt(n);
  for(let i=0;i<5;i++){
      for(let j=0;j<5;j++){
        if(matrix[i][j]===number){
          matrix[i][j]=0;
          console.log(matrix[i][j]===number);

        }
        else if(matrix[i][j]===0){
          console.log("duplicate move");
        }
      }
    }
};
export function checkWin(matrix:number[][]){
  let count=0;
  for (let i=0;i<5;i++){
    for(let j=0;j<5;j++){
      if(matrix[i][j]===0){
        if(j==4){
          count++;
        }
        continue;
      }
      else if(matrix[i][j]!=0){
        break;
      }
    }
  }
    for (let i=0;i<5;i++){
      for(let j=0;j<5;j++){
        if(matrix[j][i]===0){
          if(j==4){
            count++;
          }
          continue;
        }
        else if(matrix[j][i]!=0){
          break;
        }
      }
    }
    return count;
}
export function checkDiagonals(matrix:number[][],j:number):number{
  if(matrix[2][2]==1){
    return 0;
  }
  let temp=j;
 for(let i=0;i<5;i++){
    if(matrix[i][j]!==0){
       return 0;
    }
    else if(matrix[i][j]==0){
        if(i==4&&(j==4||j==0)){
          return 1;
        }
        else if(temp==4){
          j--;
        }
        else if(temp==0){
          j++;
         }  
   }
  }
  return 0;
}