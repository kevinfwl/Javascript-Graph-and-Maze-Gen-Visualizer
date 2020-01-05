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
let array = createArray(51, 21)
kruskals(array)
print(array)
let tree = mazeToTree(array)
let path = djkstra(tree[0], tree[1])
console.log(path.map(node => {
  return node.val
}))

// var state = []
// state = createArray(51, 21)
// backrecursive(state)
// print(state)

// var pq = new PriorityQueue()
// pq.insert(new KeyVal(1, 10))
// pq.insert(new KeyVal(2, 10))
// pq.insert(new KeyVal(4, 10))
// pq.insert(new KeyVal(0, 10))
// pq.insert(new KeyVal(-1, 10))
// pq.insert(new KeyVal(7, 10))
// pq.insert(new KeyVal(8, 10))
// pq.insert(new KeyVal(5, 10))
// console.log(pq)
// console.log(pq.deleteMax())
// console.log(pq.deleteMax())

// console.log(pq.deleteMax())
// console.log(pq.deleteMax())

// pq.insert(new KeyVal(2, 10))
// pq.insert(new KeyVal(-5, 10))
// pq.insert(new KeyVal(20, 10))
// pq.insert(new KeyVal(10, 10))

// console.log(pq.deleteMax())
// console.log(pq.deleteMax())

// console.log(pq.deleteMax())
// console.log(pq.deleteMax())