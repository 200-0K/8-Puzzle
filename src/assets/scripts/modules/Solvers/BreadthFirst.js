import EightPuzzle from "../EightPuzzle";

export default class BreadthFirst {
    constructor() {

    }

    /**
     * @param {Array} tiles 
     * @param {Number} src 
     * @param {Number} dest 
     * 
     * @returns {Number} 
     */
    static eightPuzzleShortestPath(tiles, src, dest) { //TODO: Doc
        if (src == dest) return 0;

        const node = {
            src,
            distance: 0
        };

        const queue   = [node];
        const visited = [];
        while(queue.length > 0) {
            let cur = queue.shift();
            if (cur.src == dest) return cur.distance;
            visited.push(cur.src);
            const moves = EightPuzzle.availableMoves(tiles, cur.src);
            
            for (const move of moves) {
                if (visited.includes(move.index)) continue;
                
                let temp = Object.assign({}, cur);
                temp.src = move.index;
                temp.distance++;
                queue.push(temp);
            }
        }
    }
}