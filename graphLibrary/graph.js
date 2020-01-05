const PATH = " "
const WALL = "#"
const SOLUTION = "*"

/**
 * MODELS
 */

function Point(x, y) {
  this.x = x;
  this.y = y;
}

//used for kruskals
function Tree(x, y) {
  this.x = x;
  this.y = y;
  this.parent = undefined;
}

Tree.prototype.getRoot = function() {
  return this.parent? this.parent.getRoot() : this;
}

Tree.prototype.connect = function(tree) {
  tree.getRoot().parent = this;
}

Tree.prototype.isConnected = function(tree) {
  return tree.getRoot() == this.getRoot();
}

//used to model graphs
function Edge(node1, node2, weight) {
  this.weight = weight;
  this.node1 = node1;
  this.node2 = node2;
  this.node1.edges.push(this);
  this.node2.edges.push(this);
}

Edge.prototype.disconnect = function() {
  for(let i =0; i < this.node1.edges.length; i++) {
    if (this.node1.edges[i] === this) {
      this.node1.edges.splice(i, 1);
      break;
    }
  }
  for(let i = 0; i < this.node2.edges.length; i++) {
    if (this.node2.edges[i] === this) {
      this.node2.edges.splice(i, 1);
      break;
    }
  }
}

var numNodes = 0

function Node(val) {
  this.key = numNodes++
  this.val = val
  this.edges = []
}

Node.prototype.connect = function(node, weight) {
  let edge = new Edge(this, node, weight)
  return edge
}


Node.prototype.getNeighbors = function() {
  let uniqueNeighbours = {};
  for (let i = 0; i < this.edges.length; i++) {
    let neighbour = this.edges[i].node1 === this? this.edges[i].node2 : this.edges[i].node1;
    if (uniqueNeighbours[neighbour.key] == undefined) {
      uniqueNeighbours[neighbour.key] = { "edge": [this.edges[i]], "node": neighbour};
    }
    else {
      uniqueNeighbours[neighbour.key]["edge"].push(this.edges[i]);
    }
  }
  return Object.values(uniqueNeighbours);
}

Node.prototype.disconnectByEdge = function(edge) {
  edge.disconnect();
}

Node.prototype.disconnectByNode = function(node) {
  this.edges.forEach(edge => {
    if (edge.node1 === node || edge.node2 === node) edge.disconnect();
  })
}

Node.prototype.disconnectAll = function(node) {
  this.edges.forEach(edge => {
    edge.disconnect();
  })
}



//used for dkstras algo
function KeyVal(w, val) {
  this.w = w;
  this.val = val;
}

function PriorityQueue() {
  this.queue = []
}

PriorityQueue.prototype.isEmpty = function() {
  return this.queue.length == 0;
}

PriorityQueue.prototype.insert = function(keyVal) {
    this.queue.push(keyVal)
    let i = this.queue.length - 1
    while (true) {
      if (this.queue[i].w < this.queue[Math.floor(i / 2)].w) {
        let temp = this.queue[i];
        this.queue[i] = this.queue[Math.floor(i / 2)];
        this.queue[Math.floor(i / 2)] = temp;
        i = Math.floor(i / 2);
      }
      else {
        break;
      }
  }
}

PriorityQueue.prototype.deleteMax = function() {
  let max = this.queue[0];
  let i = 0;
  let last = this.queue.pop();
  if (this.queue.length != 0) this.queue[0] = last

  while (i * 2 < this.queue.length) {
    let minChild = i * 2;

    if (2 * i + 1 < this.queue.length && this.queue[2 * i + 1].w < this.queue[minChild].w) {
      minChild = 2 * i + 1;
    }

    if (this.queue[minChild].w < this.queue[i].w) {
      let temp = this.queue[i];
      this.queue[i] = this.queue[minChild];
      this.queue[minChild] = temp;
      i = minChild;
    }
    else {
      break;
    }
  }
  return max;
}



/**
 * UTILITY FUNCTIONS
 */
function createArray(wid, len) {
  let array = new Array(); 
    for (var j = 0; j < len; j++) {
      array.push([]);
      for (var i = 0; i < wid; i++) {
        array[j].push(WALL)
    }
  }
  return array;
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function print(arr) {
  var line = ""
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].join(""))
  }
}

function getNeighbours(point, maze, neighborOffset, symbol) {
  let neighbors = [];
  for (var i = 0; i < neighborOffset.length; i++) {
    var x = neighborOffset[i].x + point.x;
    var y = neighborOffset[i].y + point.y;
    if (x > 0 && y > 0 && x < maze[0].length - 1 && y < maze.length - 1 && maze[y][x] == symbol) {
      neighbors.push(new Point(x, y))
    } 
  }
  return neighbors;
}

//builds a tree structure from a 2D grid representation of a maze
function arrayToTree(array) {
  let start = new Node(new Point(1, 1))
  let end = null;
  let queue = [new Path(start, start)]
  let neighborOffset = [new Point(-1, 0), new Point(1, 0), new Point(0, 1), new Point(0, -1)]
  function Path(last, cur) {
    this.last = last;
    this.cur = cur;
  }

  if (array.length < 3 || array[0].length < 3 || array[1][1] != PATH) return undefined;

  while (queue.length) {
    let path = queue.shift()
    let lastCoords = path.last.val
    let curCoords = path.cur.val

    neighborOffset.forEach(point => {
      let neighborX = curCoords.x + point.x
      let neighborY = curCoords.y + point.y
      
      if ((neighborX != lastCoords.x || neighborY != lastCoords.y) && array[neighborY][neighborX] == PATH) {
        console.log(neighborX, neighborY)
        let node = new Node(new Point(neighborX, neighborY))
        let edge = new Edge(path.cur, node, 1)
        let newPath = new Path(path.cur, node)
        if (neighborX == array[0].length - 2 && neighborY == array.length - 2 ) end = node
        queue.push(newPath)
      }
    })
  }
  return [start, end]
}

function arrayToGraph(array) {
  let pointArray = []
  //init point array
  for(let y = 0; y < array.length; y++) {
    pointArray.push([])
    for(let x = 0; x < array[0].length; x++){
      pointArray[y].push(new Node(new Point(x, y)));
    }
  }

  //iterate through all the stuff
  for(let y = 1; y < pointArray.length - 1; y++) {
    for(let x = 1; x < pointArray[0].length - 1; x++){
      if (array[y][x] == PATH) {
        if (array[y + 1][x] == PATH) pointArray[y][x].connect(pointArray[y + 1][x], 1)
        if (array[y][x + 1] == PATH) pointArray[y][x].connect(pointArray[y][x + 1], 1)
      }
    }
  }
  return [pointArray[1][1], pointArray[pointArray.length - 2][pointArray[0].length - 2]]
}



/**
 * MAZE GENERATION, GRAPH SEARCH ALGORITHMS
 */

function Astar(start, end, heuristic) {
  function Path(w, last, cur) {
    this.w = w;
    this.last = last;
    this.cur = cur;
  } 

  function backtrackRoute(start, end, visited) {
    let path = []
    let cur = end;
    while (true) {
      path.unshift(cur);
      if (cur === start) break;
      if (visited[cur.key]) {
        cur = visited[cur.key].last;
      }
      else {
        return []
      }
    }
    return path;
  }

  //init starting point is visited
  let pq = new PriorityQueue();
  let visited = {}
  visited[start.key] = new Path(0, start, start)
  pq.insert(new KeyVal(0, visited[start.key]))
 
  while (!pq.isEmpty()) {
    let path = pq.deleteMax().val;
    visited[path.cur.key] = path;

    if (path.cur === end) break;

    let neighbors = path.cur.getNeighbors();
    for (let i = 0 ; i < neighbors.length; i++) {
      //there might be multiple edges between two nodes, find the min
      let minWeight = Math.min(neighbors[i].edge.map(edge => {
        return edge.weight;
      }))
      let neighbor = neighbors[i].node;
      
      if (!visited[neighbor.key]) {
        pq.insert(new KeyVal(path.w, new Path(path.w + minWeight + heuristic(path.cur), path.cur, neighbor)))
      }
    }
  }
  return backtrackRoute(start, end, visited);
}

function dijkstra(start, end) {
  return Astar(start, end, node => {
    return 0
  })
}

function prims(array) {
  var curPoint = new Point(1,1);
  var queue = [new Point(1, 3), new Point(3, 1)]
  var traverseOrder = [new Point(0, 2), new Point(0, -2), new Point(2, 0), new Point(-2, 0)];
  array[1][1] = PATH;
  shuffle(queue)
 
  while (queue.length != 0) {
    var isValid = false;

    curPoint = queue.shift();
    shuffle(traverseOrder);
    if (array[curPoint.y][curPoint.x] != PATH) {
      var traversedNeighbors = getNeighbours(curPoint, array, traverseOrder, PATH)
      var frontier = getNeighbours(curPoint, array, traverseOrder, WALL)
  
      //connect with the first traversed neighbors
      if (traversedNeighbors.length != 0) {
        let frontierX = traversedNeighbors[0].x;
        let frontierY = traversedNeighbors[0].y;
        
        for (var x = Math.min(frontierX, curPoint.x); x <= Math.max(frontierX, curPoint.x); x++) {
          array[frontierY][x] = PATH;
        }
        for (var y = Math.min(frontierY, curPoint.y); y <= Math.max(frontierY, curPoint.y); y++) {
          array[y][frontierX] = PATH;
        }
      }
      queue = queue.concat(frontier);
      shuffle(queue);
    }
  }
}

function backrecursive(array) {
  var stack = [new Point(1,1)]
  var traverseOrder = [new Point(0, 2), new Point(0, -2), new Point(2, 0), new Point(-2, 0)];
  var curNode = stack[0];

  while (stack.length != 0) {
    var hasNeighbours = false;
    shuffle(traverseOrder);
    for(var i = 0; i < traverseOrder.length; i++) {
      var frontierX = curNode.x + traverseOrder[i].x;
      var frontierY = curNode.y + traverseOrder[i].y
      //check for bounds
      if (frontierX > 0 && frontierY > 0 && frontierX < array[0].length - 1 && frontierY < array.length - 1 && array[frontierY][frontierX] == WALL) {
        
        // really stupid trick to calculate 
        for (var x = Math.min(frontierX, curNode.x); x <= Math.max(frontierX, curNode.x); x++) {
          array[frontierY][x] = PATH;
        }
        for (var y = Math.min(frontierY, curNode.y); y <= Math.max(frontierY, curNode.y); y++) {
          array[y][frontierX] = PATH;
        }

        curNode = new Point(frontierX, frontierY);
        stack.push(curNode);
        hasNeighbours = true;
        break;
      }
    } 
    if (!hasNeighbours) {
      curNode = stack.pop();
    }
  }
}

function kruskals(array) {
  let edges = []
  let sets = []

  //init edges and setse
  for(let y = 0; y < array.length; y++) {
    sets.push([])
    for(let x = 0; x < array[0].length; x++) {
        sets[y].push(new Tree(x, y))
        if (y > 0 && x > 0 && y < array.length - 1 && x < array[0].length - 1 &&
          ((y % 2 == 0 && x % 2 != 0) || (y % 2 != 0 && x % 2 == 0))){
          edges.push(new Point(x, y))
        }
      }
  }
  shuffle(edges)
  while (edges.length != 0) {
    let curEdge = edges.pop() 

    if (curEdge.x % 2 == 0) {
      if (!sets[curEdge.y][curEdge.x - 1].isConnected(sets[curEdge.y][curEdge.x + 1])) {
        sets[curEdge.y][curEdge.x - 1].connect(sets[curEdge.y][curEdge.x + 1])
        array[curEdge.y][curEdge.x - 1] = PATH;
        array[curEdge.y][curEdge.x] = PATH;
        array[curEdge.y][curEdge.x + 1] = PATH;
      }
    }
    else {
      if (!sets[curEdge.y - 1][curEdge.x].isConnected(sets[curEdge.y + 1][curEdge.x])) {
        sets[curEdge.y + 1][curEdge.x].connect(sets[curEdge.y - 1][curEdge.x])
        array[curEdge.y - 1][curEdge.x] = PATH;
        array[curEdge.y][curEdge.x] = PATH;
        array[curEdge.y + 1][curEdge.x] = PATH;
      }
    }
  }
}

function dijkstraMaze(array) {
  let graph = arrayToGraph(array)
  let path = dijkstra(graph[0], graph[1])
  path.forEach(node => {
    let point = node.val
    array[point.y][point.x] = SOLUTION
  })
}

function AstarMaze(array) {
  let graph = arrayToGraph(array)
  let path = Astar(graph[0], graph[1], node => {
    let point = node.val;
    let final = graph[1].val
    return final.x - point.x + final.y - point.y
  })
  path.forEach(node => {
    let point = node.val
    array[point.y][point.x] = SOLUTION
  })
}

let S = new Node("S") 
let A = new Node("A") 
let B = new Node("B") 
let C = new Node("C") 
let D = new Node("D") 
let E = new Node("E") 
let F = new Node("F") 
let G = new Node("G") 
let H = new Node("H") 
let I = new Node("I") 
let J = new Node("J") 
let K = new Node("K") 
let L = new Node("L") 

let a0 = new Edge(A,S,7)
let a1 = new Edge(A,B,3)
let a2 = new Edge(S,B,2)
let a3 = new Edge(A,D,4)
let a4 = new Edge(B,D,4)
let a5 = new Edge(D,F,5)
let a6 = new Edge(B,H,1)
let a7 = new Edge(H,F,3)
let a8 = new Edge(H,G,2)
let a9 = new Edge(G,E,2)
let a10 = new Edge(S,C,3)
let a11 = new Edge(C,L,2)
let a12 = new Edge(L,I,4)
let a13 = new Edge(L,J,4)
let a14 = new Edge(I,J,6)
let a15 = new Edge(I,K,4)
let a16 = new Edge(J,K,4)
let a17 = new Edge(K,E,5)

// console.log(I.getNeighbours())
let array = createArray(21, 21)
kruskals(array)
AstarMaze(array)
print(array)
