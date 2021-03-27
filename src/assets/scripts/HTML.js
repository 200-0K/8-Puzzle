// ************ Get HTML ************ //

import EightPuzzle from "./Classes/EightPuzzle";

function getEightPuzzleResultBlock (board, direction, cost, totalCost, depth) {
    //TODO
}

function getAlgorithmContainer(title, startBoard) {
    //TODO
    // Get HTML container that will have title of the algorithm and start eightPuzzle board
    // EightPuzzle.getHTMLfromArray(startBoard)
}

/** Get HTML table as eight puzzle board
 * @param {Array} tiles Cells/Tiles position
 * @returns {HTMLElement} HTML table contains cells from provided tiles array 
 */
function getHTMLTableFromArray(tiles) {
    //TODO
    // spread tiles cells into 3 rows 
    // add class eight-puzzle__cell
    // add class eight-puzzle__cell--blank
    // return table
}

// ************ Update ************ //

/** Update current start&goal board with the one provided
 * @param {EightPuzzle} newEightPuzzle 
 */
function updateBoards(newEightPuzzle) {
    //TODO
}

/** Update number of tiles out of place and it's total distance 
 * @param {EightPuzzle} eightPuzzle
*/
export function updateMainDetails(eightPuzzle) {
    document.querySelector(".info .numberOfTilesOutPlace").innerText   = eightPuzzle.tilesOutPlaced;
    document.querySelector(".info .distanceOfTilesOutPlace").innerText = eightPuzzle.tilesOutPlacedDistance;
}