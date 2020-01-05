# Javascript-Graph-and-Maze-Gen-Visualizer

A light weight library for working with graphs and graph. Also contains source for visualizing 
The following algorithms are implemented:

#### Min spanning tree:
- Prim's
- Kruskal's
- Backtrack

#### Min path:
- A*
- Dijkstra's 


## Example

```javascript
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

let shortestPath1 = dijkstra(S, E)
let shortestPath2 = AStar(S, E)
```

## Running the visualizer 

Currently the visualizer only runs in the context of maze generation, more support coming soon...
(set canvas as size of the window)

Include the following tags in your html:
```html
<div id="alg-description">
    <div id="alg-description-title"></div>
    <div id="alg-description-body"></div>
</div> 
<canvas id="grid"></canvas>
<script src="graphUI.js"></script>
```

#### Result

![Alt Text](https://media.giphy.com/media/L3FK7Kq6IzFNsX5s7U/giphy.gif)







