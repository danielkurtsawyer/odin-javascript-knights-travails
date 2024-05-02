// board used to represent vertices to create adjacency lists
const tempBoard = [];

for(let i=0; i<8; i++){
  tempBoard[i] = [];
  for(let j=0; j<8; j++){
    tempBoard[i][j] = 8*i + j;
  }
}
console.log(tempBoard);

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
  if(column+1 <= 7 && row-2 >=0){
    possibleMoves.push(tempBoard[column+1][row-2]);
  }

  return possibleMoves;
}

const createGraph = function createAdjacencyList(){
  const board = [];
  for(let i = 0; i < 64; i++){
    board[i] = findMoves(i);
  }
  return board;
}

// create graph representation
const board = createGraph();

// start and end are coordinates
// NOTE: this implementation uses an alternate coordinate system from the picture from TOP, 
// with rows increasing going down like so: 
//   0 1 2 3 4 5 6 7
// 0 x x x x x x x x
// 1 x x x x x x x x
// 2 x x x x x x x x 
// 3 x x x x x x x x 
// 4 x x x x x x x x 
// 5 x x x x x x x x 
// 6 x x x x x x x x 
// 7 x x x x x x x x 
const knightMoves = function calculateMinKnightMoves(start, end){
  // perform BFS on graph to find a path from start to end
  // convert start coordinates to a vertex number
  const vertexStart = start[0] * 8 + start[1];
  const vertexEnd = end[0] * 8 + end[1];
  return doBFS(board, vertexStart);
}

const doBFS = function breadthFirstSearch(graph, start){
  console.log('start', start);
  const queue = [];
  queue.push(start);
  const visited = [];

  // while the queue has vertexes
  while(queue.length > 0){
    // visit the vertex at the top of the queue
    let vertex = queue.shift();
    console.log(vertex);
    // use the adjacency list to find its neighbors
    graph[vertex].forEach((neighbor) =>{
      // for every neighbor, if it hasn't been seen or visited yet
      if(!queue.includes(neighbor) && !visited.includes(neighbor)){
        // add it to the queue to be visited in the future 
        queue.push(neighbor);
      }
    })
    
    // push the vertex into the visited array
    visited.push(vertex);
  }

  console.log('BFS array length', visited.length);
  // return the visited array
  return visited;
}

// findMoves with all moves possible
console.log(findMoves(26));
// findMoves with upper move restriction - only 4 should be shown
console.log(findMoves(24));

console.log(board);

// search algorithm with be a BFS due to cycles
console.log(knightMoves([0,0], [1,0]));