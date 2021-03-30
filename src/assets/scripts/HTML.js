// ************ Get HTML ************ //

import { chunk } from "lodash";
import EightPuzzle from "./Classes/EightPuzzle";
import { classNames } from "./constants";

export class ResultBuilder {
    constructor() {
        this.algorithmBlocks = [];
    }

    addAlgorithmBlock(algorithmName, maxDepth, totalCost) {
        const algorithmBlock = document.createElement("section");
        algorithmBlock.classList.add("algorithm");
        algorithmBlock.insertAdjacentHTML("afterbegin", `
            <div class="${classNames.ALGORITHM_SUMMARY}">
                <div class="${classNames.ALGORITHM_FIELD}">
                    <p>Max Depth</p>
                    <p>${maxDepth}</p>
                </div>

                <div class="${classNames.ALGORITHM_FIELD}">
                    <p >Total Cost</p>
                    <p>${totalCost}</p>
                </div>
            </div>
            <h2 class="${classNames.ALGORITHM_TITLE}">${algorithmName} Algorithm</h2>
        `);

        const timelineBlock = document.createElement("div");
        timelineBlock.classList.add(`${classNames.ALGORITHM_TIMELINE}`);
        timelineBlock.insertAdjacentHTML("afterbegin", `
            <div class="${classNames.ALGORITHM_LINE} ${classNames.ALGORITHM_FIRST_TIMELINE}">
                <div class="${classNames.ALGORITHM_INFO_BOX}">
                    <p class="${classNames.ALGORITHM_TOP_TEXT}">Start</p>
                </div>
            </div>
        `);

        algorithmBlock.appendChild(timelineBlock);
        

        this.algorithmBlocks.push(algorithmBlock);
        return {
            timelineBlock,
            addMoveDetails: function(direction, cost, depth) {
                this.timelineBlock.insertAdjacentHTML("beforeend", `
                    <div class="${classNames.ALGORITHM_LINE}">
                        <div class="${classNames.ALGORITHM_INFO_BOX}">
                            <div class="${classNames.ALGORITHM_FIELD}">
                                <p>Direction</p>
                                <p>${direction}</p>
                            </div>
                            <div class="${classNames.ALGORITHM_FIELD}">
                                <p>Cost</p>
                                <p>${cost}</p>
                            </div>
                            <div class="${classNames.ALGORITHM_FIELD}">
                                <p>Depth</p>
                                <p>${depth}</p>
                            </div>
                        </div>
                    </div>
                `);
            },
            /**
             * @param {Array} board 1DArray of size 9 that will be converted to HTML table and inserted into the time line
             */
            addBoard: function(board) {
                const table = getHTMLTableFromArray(board);
                table.classList.add(`${classNames.SAMLL_TABLE}`);
                this.timelineBlock.insertAdjacentElement("beforeend", table);
            }, 
            addTimeLapse: function(skippedNumber) {
                this.timelineBlock.insertAdjacentHTML("beforeend", `
                <div class="algorithm__line">
                    <div class="algorithm__line__info-box algorithm__line__info-box--timelapse">
                        <div class="algorithm__field">
                            <p>&rarr;</p><p>${skippedNumber}</p><p>&rarr;</p>
                        </div>
                    </div>
                </div> 
                `);
            }
        };
    }

    /** Get result block along with all algorithm blocks */
    getResult() {
        const resultHTML = document.createElement("div");
        resultHTML.classList.add("result");
        resultHTML.insertAdjacentHTML("afterbegin", `<h1>Results</h1>`);

        const algorithmContainer = document.createElement("div");
        algorithmContainer.classList.add(`${classNames.ALGORITHM_CONTAINER}`);
        for(const section of this.algorithmBlocks) {
            algorithmContainer.appendChild(section);
        }
        resultHTML.appendChild(algorithmContainer);
        return resultHTML;
    }
}

/** Get HTML table as eight puzzle board
 * @param {Array} tiles Cells/Tiles position
 * @returns {HTMLElement} HTML table contains cells from provided tiles array 
 */
function getHTMLTableFromArray(tiles) {
    const table = document.createElement("table");
    table.classList.add(`${classNames.TABLE}`);

    const rows = chunk(tiles, 3);
    for (const row of rows) {
        const tableRow = document.createElement("tr");
        for (const data of row) {
            const tableData = document.createElement("td");
            tableData.classList.add(`${classNames.CELL}`);
            if (data === "0") {
                tableData.classList.add(`${classNames.BLANK_CELL}`);
                tableData.innerText = "";
            }
            else tableData.innerText = data;
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }

    return table;
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

    // Is it solvale?
    const statusHTML  = document.querySelector(".info .status");
    const solveButton = document.querySelector(".info button.solve");
    statusHTML.classList.remove(classNames.STATUS_SOLVABLE, classNames.STATUS_UNSOLVABLE);
    solveButton.classList.remove("disabled");
    if (eightPuzzle.isSolvable()) {
        statusHTML.classList.add(classNames.STATUS_SOLVABLE);
        statusHTML.innerHTML = "Solvable";
    } else {
        statusHTML.classList.add(classNames.STATUS_UNSOLVABLE);
        statusHTML.innerHTML = "Unsolvable";
        solveButton.classList.add("disabled");
    }   
}