import EightPuzzle from "./EightPuzzle";
import BreadthFirst from "./Solvers/BreadthFirst";

export default class EightPuzzleSolver {
    
    /**  
     * @param  {...Object} Solvers Solvers are object that can solve EightPuzzle, and it contain a method called solve(EightPuzzle) 
     * that will be called when getResultHTML called from this class instance
     */
    constructor (...Solvers) {
        this.Solvers = Solvers.filter(solver => solver.solve instanceof Function);
        if(this.Solvers.length <= 0)  throw new Error("Solvers are undefined");

        this.event();
    }

    // ********* Events ********* //

    event() {
        document.querySelector(".info .solve").addEventListener("click", this.solveEvent.bind(this));
    }

    solveEvent() {
        //TODO
        // this.showResult(EightPuzzleSolver.solve());
    }

    // ********** Static ********** //

    /** Update the number of tiles out of place and it's total distance */
    static updateMainDetails() {
        const currentBoard = EightPuzzle.getObjectFromHTML();
        document.querySelector(".info .numberOfTilesOutPlace").innerText   = currentBoard.tilesOutPlaced;
        document.querySelector(".info .distanceOfTilesOutPlace").innerText = currentBoard.tilesOutPlacedDistance;
    }

    /**
     * @param {EightPuzzle} eightPuzzle
     * @returns {Number} Number of tiles out of place
     */
    static getTilesOutPlaced(eightPuzzle) {
        let numberOfTilesOutPlaced = 0;
        eightPuzzle.tiles.forEach((el, i) => {
            if(el !== "0" && el !== eightPuzzle.goalTiles[i]) numberOfTilesOutPlaced++;
        });
        return numberOfTilesOutPlaced;
    }

    /**
     * @param {EightPuzzle} eightPuzzle
     * @returns {Number} Total distance of tiles out of place
     */
    static getTilesOutPlacedDistance(eightPuzzle) {
        let totalDistance = 0;
        eightPuzzle.tiles.forEach((el, i) => {
            if (el === "0" || el === eightPuzzle.goalTiles[i]) return;
            const dest = eightPuzzle.goalTiles.findIndex(tile => tile === el);
            totalDistance += BreadthFirst.eightPuzzleShortestPath(eightPuzzle.tiles, i, dest);
        });
        return totalDistance;
    }
}