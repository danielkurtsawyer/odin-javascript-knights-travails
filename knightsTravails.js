// board used to represent vertices to create adjacency lists
const tempBoard = [];

for(let i=0; i<8; i++){
  tempBoard[i] = [];
  for(let j=0; j<8; j++){
    tempBoard[i][j] = 8*i + j;
  }
}

// function to generate possible moves, leaving from vertex i, entering the vertexes returned by the function
const findMoves = function findPossibleKnightMoves(i){
  const possibleMoves = [];
  const column = Math.floor(i/8);
  const row = i % 8;

  // if any of the accesses go out of bounds (negative index, or index value undefined)
  // then it is a move that would end up off the board, so we don't push it to the possibleMoves array

  // try left & down
  // left 2, down 1
  if(column-2 >= 0 && row+1 <=7){
    possibleMoves.push(tempBoard[column-2][row+1]);
  }
  // left 1, down 2
  if(column-1 >=0 && row+2 <=7){
    possibleMoves.push(tempBoard[column-1][row+2]);
  }
  // try right & down
  // right 2, down 1
  if(column+2 <= 7 && row+1 <= 7){
    possibleMoves.push(tempBoard[column+2][row+1]);
  }
  // right 1, down 2
  if(column+1 <=7 && row+2 <=7){
    possibleMoves.push(tempBoard[column+1][row+2]);
  }

  // try left & up
  // left 2, up 1
  if(column-2 >=0 && row-1 >= 0){
    possibleMoves.push(tempBoard[column-2][row-1]);
  }
  // left 1, up 2
  if(column-1 >=0 && row-2 >=0){
    possibleMoves.push(tempBoard[column-1][row-2]);
  }

  // try right & up
  // right 2, up 1
  if(column+2 <=7 && row-1 >=0){
    possibleMoves.push(tempBoard[column+2][row-1]);
  }
  // right 1, up 2
  if(column+1 >=0 && row-2 >=0){
    possibleMoves.push(tempBoard[column+1][row-2]);
  }

  return possibleMoves;
}

// board set up
console.log(tempBoard);
// findMoves with all moves possible
console.log(findMoves(26));
// findMoves with upper move restriction - only 4 should be shown
console.log(findMoves(24));
