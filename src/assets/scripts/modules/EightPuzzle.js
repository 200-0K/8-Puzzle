// -----------------------------------------
// - Blank tile will have the value 0
// -----------------------------------------

/**
* Used as a parameter to move eight puzzle tiles using .move method
*/
export let direction = {
   UP: 0,
   RIGHT: 1,
   DOWN: 2,
   LEFT: 3,
};

export default class EightPuzzle {
    /**
     *  @param {Array} tiles
     *  @param {Array} goalTiles
     */
    constructor(tiles, goalTiles) {
        this.tiles = tiles;
        this.goalTiles = goalTiles;
        this.blankTileIndex = tiles.findIndex(e => e == 0);
    }

    get outPlacedTiles() {}

    get outPlacedTilesDistance() {}

    toHTML() {}

    move(direction) {}

    /**
     * Automatically find initial & goal tiles by class name if parameters not specified
     * @param {HTMLElement} initTilesHTMLBody
     *  An html tag with the class "eight-puzzle__body start"
     * @param {HTMLElement} goalTilesHTMLBody
     *  An html tag with the class "eight-puzzle__body goal"
     * 
     * @returns {EightPuzzle} EightPuzzle Object
     */
    static getObjectFromHTML(
        initTilesHTMLBody = document.querySelector(".eight-puzzle__body.start"), 
        goalTilesHTMLBody = document.querySelector(".eight-puzzle__body.goal")
    ) {
        //TODO
        eightPuzzleBoardHTML.querySelectorAll("")
    }
}