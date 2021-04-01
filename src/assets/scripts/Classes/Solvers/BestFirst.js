import EightPuzzle from "../EightPuzzle";
import Heapify from "heapify";

const maxWorkPerTimeout = 200;

export default class BestFirst {

    /**
     * @param {EightPuzzle} startEightPuzzle 
     * @return {{algorithmName: String, timeTaken: Number, totalMoves: Number, visited: [EightPuzzle]}}
     */
    solve(startEightPuzzle, callback) {
        const result = {
            algorithmName: "Best First",
            timeTaken: Date.now(),
            totalMoves: 0,
            visited: []
        };

        const goalHash      = window.btoa(startEightPuzzle.goalTiles);
        const priorityQueue = new Heapify(250, [startEightPuzzle], [startEightPuzzle.tilesOutPlacedDistance], Array);
        const visitedHash   = {};

        let cur;
        function work() {
            if ( !(cur = priorityQueue.pop()) ) return;

            for (let i = 0; i < maxWorkPerTimeout && cur; i++) {
                const currentHash = window.btoa(cur.tiles);
                result.totalMoves++;

                // Mark current as visited
                visitedHash[currentHash] = true;
                if (currentHash === goalHash) {
                    // Unshift goal board
                    result.visited.unshift(cur); 
                    // Unshift until start is found
                    while (cur = cur.parent) result.visited.unshift(cur); 
                    // Calculate time taken for the algorithm
                    result.timeTaken = Date.now() - result.timeTaken;
                    return callback(result);
                }

                // Available indexes for blank tile
                const indxs = EightPuzzle.availableMoves(cur.tiles, cur.blankTileIndex);

                for (const {direction, index} of indxs) {
                    const move = cur.move(index, direction);
                    // Skip move if visited
                    if (visitedHash[window.btoa(move.tiles)]) continue;
                    
                    priorityQueue.push(move, move.tilesOutPlacedDistance);
                }

                // Next element inside the queue if i didn't exceed maxWorkPerTimeout
                if (i + 1 < maxWorkPerTimeout) cur = priorityQueue.pop();
            }

            setTimeout(work, 0.5);
        }

        work();
    }
}