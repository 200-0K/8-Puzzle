import EightPuzzle from "../EightPuzzle";


export default class BreadthFirst {
    /**
     * @param {EightPuzzle} startEightPuzzle 
     * @return {{algorithmName: String, timeTaken: Number, totalMoves: Number, visited: [EightPuzzle]}}
     */
    solve(startEightPuzzle) {
        const result = {
            algorithmName: "Breadth First",
            timeTaken: Date.now(),
            totalMoves: 0,
            visited: []
        };

        const goalHash    = window.btoa(startEightPuzzle.goalTiles);
        const queue       = [startEightPuzzle];
        const visitedHash = [];
        let cur;
        while (cur = queue.shift()) {
            const curHash = window.btoa(cur.tiles);

            result.totalMoves++;
            visitedHash.push(curHash);
            if (curHash === goalHash) {
                result.visited.unshift(cur);
                while(cur = cur.parent) result.visited.unshift(cur);
                break;
            }

            // Available indexes for blank tile
            const indxs = EightPuzzle.availableMoves(cur.tiles, cur.blankTileIndex);

            for(const {index, direction} of indxs) {
                const move = cur.move(index, direction);
                if (visitedHash[window.btoa(move)]) continue;
                queue.push(move);
            }
        }

        result.timeTaken = Date.now() - result.timeTaken;
        return result;
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