// -----------------------------------------
// - Blank tile will have the value 0
// -----------------------------------------
import {classNames, direction as _direction} from "../constants";
import BreadthFirst from "./Solvers/BreadthFirst";

export default class EightPuzzle {
    /**
     *  @param {Array} tiles
     *  @param {Array} goalTiles
     */
    constructor(tiles, goalTiles, blankTilePosition, direction, parent) {
        this.tiles = tiles;
        this.goalTiles = goalTiles;
        this.blankTileIndex = blankTilePosition ?? tiles.findIndex(e => e == "0");
        // this.tilesOutPlaced = this.getTilesOutPlaced();
        // this.tilesOutPlacedDistance = this.getTilesOutPlacedDistance();
        this.direction = direction;
        this.parent = parent;
    }

    /** Move/swap blank tile with any other tile by index
     * index must be valid i.e. < tiles.length && >= 0
     * @param {Number} index index of tile that will be swapped with blank tile
     * @param {direction} direction Provide direction based on direction enum inside constants.js
     * @returns {EightPuzzle} newEightPuzzle
     */
    move(index, direction) {
        if (index > this.tiles.length || index < 0) throw new Error("Move is not allowed");
        
        // Copy previous board
        const newBoard = [...this.tiles];
        // Swap tiles
        [newBoard[this.blankTileIndex], newBoard[index]] = [newBoard[index], newBoard[this.blankTileIndex]];
        // Convert direction enum to letters
        direction = (direction === _direction.UP) ? "Up" : (direction === _direction.DOWN) ? "Down" : (direction === _direction.LEFT) ? "Left" : (direction === _direction.RIGHT) ? "Right" : direction;
        
        return new EightPuzzle(newBoard, this.goalTiles, index, direction, this);
    }

    /**
     * @returns {Number} Number of tiles out of place
     */
    get tilesOutPlaced() {
        let numberOfTilesOutPlaced = 0;
        this.tiles.forEach((el, i) => {
            if(el !== "0" && el !== this.goalTiles[i]) numberOfTilesOutPlaced++;
        });
        return numberOfTilesOutPlaced;
    }

    /**
     * @returns {Number} Total distance of tiles out of place
     */
    get tilesOutPlacedDistance() {
        let totalDistance = 0;
        this.tiles.forEach((el, i) => {
            if (el === "0" || el === this.goalTiles[i]) return;
            const dest = this.goalTiles.findIndex(tile => tile === el);
            totalDistance += BreadthFirst.eightPuzzleShortestPath(this.tiles, i, dest);
        });
        return totalDistance;
    }

    /** Check if this eightpuzzle is solvable by counting inversion, if both goal and start has the same parity of inversions then it's solvable
     * @returns {Boolean} true if solvable, false otherwise
     */
    isSolvable() {
        const startTiles = this.tiles.filter(el => el !== "0");
        const goalTiles  = this.goalTiles.filter(el => el !== "0");
        let startInv = 0;
        for (let i = 0; i < startTiles.length-1; i++) {
            for (let j = i; j < startTiles.length; j++) 
                if(startTiles[j] > startTiles[i]) startInv++;
        }

        let goalInv = 0;
        for (let i = 0; i < goalTiles.length-1; i++) {
            for (let j = i; j < goalTiles.length; j++) 
                if(goalTiles[j] > goalTiles[i]) goalInv++;
        }

        startInv %= 2;
        goalInv  %= 2;
        return startInv === goalInv;
    }

    // ************ Static ************ //

    /** Generate New EightPuzzle Object with initTiles&goalTiles as 1DArray
     * @param {HTMLElement} initTilesHTMLBody Default ".eight-puzzle__body.start"
     * @param {HTMLElement} goalTilesHTMLBody Default ".eight-puzzle__body.goal"
     * @returns {EightPuzzle} EightPuzzle Object
     */
    static getObjectFromHTML(
        initTilesHTMLBody = document.querySelector(`.${classNames.TABLE}.start`), 
        goalTilesHTMLBody = document.querySelector(`.${classNames.TABLE}.goal`)
    ) {
        const initTiles = Array.from(initTilesHTMLBody.querySelectorAll(`.${classNames.CELL}`)).map(cell => cell.innerText || "0");
        const goalTiles = Array.from(goalTilesHTMLBody.querySelectorAll(`.${classNames.CELL}`)).map(cell => cell.innerText || "0");
        return new EightPuzzle(initTiles, goalTiles);
    }

    /** Get available moves for some tile position
     * @param {Array} tiles
     * @param {Number} src Index of moving tile
     * @returns {[{direction, index}]}
     */
    static availableMoves(tiles, src) {
        const newMoves = [];
        const horiz = (src+1) % 3;

        // Up?
        if (src - 3 >= 0) newMoves.push({direction: _direction.UP, index: src-3});
        // Down?
        if (src + 3 < tiles.length) newMoves.push({direction: _direction.DOWN, index: src+3});
        // Left?
        if (horiz == 0 || horiz == 2) newMoves.push({direction: _direction.LEFT, index: src-1});
        // Right?
        if (horiz == 1 || horiz == 2) newMoves.push({direction: _direction.RIGHT, index: src+1});

        return newMoves;
    }
}