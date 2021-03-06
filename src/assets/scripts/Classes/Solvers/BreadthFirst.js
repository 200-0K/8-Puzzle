import EightPuzzle from "../EightPuzzle";

const maxWorkPerTimeout = 200;

export default class BreadthFirst {
    /**
     * @param {EightPuzzle} startEightPuzzle 
     * @return {{algorithmName: String, timeTaken: Number, totalMoves: Number, visited: [EightPuzzle]}}
     */
    solve(startEightPuzzle, callback) {
        const result = {
            algorithmName: "Breadth First",
            timeTaken: Date.now(),
            totalMoves: 0,
            visited: []
        };

        const goalHash    = window.btoa(startEightPuzzle.goalTiles);
        const queue       = [startEightPuzzle];
        const visitedHash = {};

        let cur;
        function work() {
            if ( !(cur = queue.shift()) ) return;

            // document.querySelector(".test").innerText = result.totalMoves; // !Debugging 

            for (let i = 0; i < maxWorkPerTimeout && cur; i++) {
                const curHash = window.btoa(cur.tiles);
                result.totalMoves++;
                
                // Mark current as visited
                visitedHash[curHash] = true;
                if (curHash === goalHash) {
                    // Unshift from goal until start is found
                    while (cur) {
                        result.visited.unshift(cur);
                        cur = cur.parent;
                    }
                    // Calculate time taken for the algorithm
                    result.timeTaken = Date.now() - result.timeTaken;
                    return callback(result);
                }
    
                // Available indexes for blank tile
                const indxs = EightPuzzle.availableMoves(cur.tiles, cur.blankTileIndex);
    
                for(const {index, direction} of indxs) {
                    const move = cur.move(index, direction);
                    // Skip move if visited
                    if (visitedHash[window.btoa(move.tiles)]) continue;
                    queue.push(move);
                }
                
                // Next element inside the queue if i didn't exceed maxWorkPerTimeout
                if (i + 1 < maxWorkPerTimeout) cur = queue.shift();
            }
            
            setTimeout(work, 0.5);
        }

        work();
    }

    /** Get the shortest distance from src to dest
     * @param {Array} tiles 
     * @param {Number} src 
     * @param {Number} dest 
     * 
     * @returns {Number} 
     */
    static eightPuzzleShortestPath(tiles, src, dest) {
        if (src == dest) return 0;

        const node = {
            src,
            distance: 0
        };

        // Unvisited nodes
        const queue   = [node];
        // Visited nodes that will prevent loop
        const visited = [];
        let cur;
        while(cur = queue.shift()) {
            // If current index == destination index then return distnace taken to get there
            if (cur.src == dest) return cur.distance;
            // If not then mark it as visited
            visited.push(cur.src);
            // Get available moves for current tile
            const moves = EightPuzzle.availableMoves(tiles, cur.src);
            
            for (const move of moves) {
                // If its already visited then skip it
                if (visited.includes(move.index)) continue;
                
                // If not visited then copy cur object and update its src index and increment its distance
                let temp = Object.assign({}, cur);
                temp.src = move.index;
                temp.distance++;
                queue.push(temp);
            }
        }
    }
}