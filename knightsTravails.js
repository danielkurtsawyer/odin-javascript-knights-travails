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
  const row = Math.floor(i/8);
  const column = i % 8;

  return [row, column];

  // if any of the accesses go out of bounds (negative index, or index value undefined)
  // then it is a move that would end up off the board, so we don't push it to the possibleMoves array

  // try left & down
  // left 2, down 1
  // left 1, down 2

  // try right & down
  // right 2, down 1
  // right 1, down 2

  // try left & up
  // left 2, up 1
  // left 1, up 2

  // try right & up
  // right 2, up 1
  // right 1, up 2
  return;
}

// board set up
console.log(findMoves(26));