// board used to represent vertices to create adjacency lists
const tempBoard = [];

for(let i=0; i<8; i++){
  tempBoard[i] = [];
  for(let j=0; j<8; j++){
    tempBoard[i][j] = 8*i + j;
  }
}
// console.log(tempBoard);

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
  // do a BFS search from the start vertex to the end vertex to find the shortest path
  const path = doBFS(board, vertexStart, vertexEnd);

  // path is an array of vertices, so we have to convert it to an array of coordinates
  const coordinatePath = convertPath(path);
  
  // now just create a string to return the outcome
  let outcome = `You made it in ${coordinatePath.length} moves! Here's your path:`;
  // append each of the coordinates on a new line
  coordinatePath.forEach((coordinate)=>outcome = outcome + `\n[${coordinate}]`);
  console.log(outcome);
}

const convertPath = function convertVertexPathToCoordinatePath(path){
  // use the same row/column logic as before to map the vertices to the coordinate pairs
  return path.map((vertex)=>[Math.floor(vertex/8), vertex % 8]);
}

// performs a BFS and returns the shortest path from vertexStart to vertexEnd
// returns an array of vertices in order of path traversal
const doBFS = function breadthFirstSearch(graph, vertexStart, vertexEnd){
  // the queue will store paths
  const queue = [];
  // all paths will start from vertexStart
  queue.push([vertexStart]);
  // this array will store visited vertices so we don't create cycles or inoptimal paths
  const visited = [];
  
  // while the queue has paths
  while(queue.length > 0){
    // look at the path at the top of the queue
    let path = queue.shift();
    // console.log('path', path);
    // visit the last vertex in the path
    let vertex = path[path.length-1];
    // check to see if the new vertex has completed the path
    if(vertex === vertexEnd){
      // if so, we have found the path and should return it
      // this will be in the set of the shortest paths
      return path;
    }
    
    // if it doesn't complete the path, 
    // use the adjacency list to find its neighbors
    graph[vertex].forEach((neighbor) =>{
      // for every neighbor, if it hasn't been visited yet
      if(!visited.includes(neighbor)){
        // add it to the queue to be visited in the future 
        // this will be added to the end of the path and pushed back to the end of the queue
        let newPath = path.slice();
        newPath.push(neighbor);
        // add the new path to the end of the queue
        queue.push(newPath);
      }
    })
    // push the vertex into the visited array before looking at the next path in the queue
    visited.push(vertex);
  }
}

// findMoves with all moves possible
// console.log(findMoves(26));
// findMoves with upper move restriction - only 4 should be shown
// console.log(findMoves(24));

// console.log(board);

// search algorithm with be a BFS due to cycles
knightMoves([0,0], [1,0]);