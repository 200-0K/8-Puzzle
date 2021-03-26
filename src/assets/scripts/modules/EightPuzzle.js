// -----------------------------------------
// - Blank tile will have the value 0
// -----------------------------------------
import {classNames, direction} from "./constants";
import EightPuzzleSolver from "./EightPuzzleSolver";

export default class EightPuzzle {
    /**
     *  @param {Array} tiles
     *  @param {Array} goalTiles
     */
    constructor(tiles, goalTiles) {
        this.tiles = tiles;
        this.goalTiles = goalTiles;
        this.blankTileIndex = tiles.findIndex(e => e == "0");
        this.tilesOutPlaced = EightPuzzleSolver.getTilesOutPlaced(this)
        this.tilesOutPlacedDistance = EightPuzzleSolver.getTilesOutPlacedDistance(this)
    }

    move(index) {
        const temp = [...this.tiles];
        [temp[this.blankTileIndex], temp[index]] = [temp[index], temp[this.blankTileIndex]];
        return new EightPuzzle(temp, this.goalTiles);
        // TODO
        // UP    = -3
        // Down  = +3
        // Left  = (cell.index+1 % 3) == 0 || 2
        // Right = (cell.index+1 % 3) == 1 || 2
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

    /** Get HTML table as eight puzzle board
     * @param {Array} tiles Cells/Tiles position
     * @returns {HTMLElement} HTML table contains cells from provided tiles array 
     */
    static getHTMLTableFromArray(tiles) {
        //TODO
        // spread tiles cells into 3 rows 
        // add class eight-puzzle__cell
        // add class eight-puzzle__cell--blank
        // return table
    }

    /** Update current start&goal board with the one provided
     * @param {EightPuzzle} newEightPuzzle 
     */
    static updateHTML(newEightPuzzle) {
        //TODO
    }

    /** Get available moves for some tile position
     * @param {Array} tiles
     * @param {Number} src Index of moving tile
     * @returns {Array} {direction, index}
     */
    static availableMoves(tiles, src) {
        const newMoves = [];
        
        // Down?
        if (src + 3 < tiles.length) newMoves.push({direction: direction.DOWN, index: src+3});
        // Up?
        if (src - 3 >= 0) newMoves.push({direction: direction.UP, index: src-3});

        const horiz = (src+1) % 3;
        // Right?
        if (horiz == 1 || horiz == 2) newMoves.push({direction: direction.RIGHT, index: src+1});
        // Left?
        if (horiz == 0 || horiz == 2) newMoves.push({direction: direction.LEFT, index: src-1});

        return newMoves;
    }
}