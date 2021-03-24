// -----------------------------------------
// - Blank tile will have the value 0
// -----------------------------------------
import {classNames, direction} from "./constants";

export default class EightPuzzle {
    /**
     *  @param {Array} tiles
     *  @param {Array} goalTiles
     */
    constructor(tiles, goalTiles) {
        this.tiles = tiles;
        this.goalTiles = goalTiles;
        this.blankTileIndex = tiles.findIndex(e => e == "0");
    }

    get outPlacedTiles() {}

    get outPlacedTilesDistance() {}

    toHTML() {}

    move(direction) {
        // TODO
        // UP    = -3
        // Down  = +3
        // Left  = (cell.index+1 % 3) == 0 || 2
        // Right = (cell.index+1 % 3) == 1 || 2
    }

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
}