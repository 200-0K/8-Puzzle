import shuffle from "lodash/shuffle";
import throttle from "lodash/throttle";
import random from "lodash/random";
import {classNames} from "../../constants";

// Solvers
import BreadthFirst from "../Solvers/BreadthFirst";
import BestFirst from "../Solvers/BestFirst";
import EightPuzzle from "../EightPuzzle";
import { ResultBuilder } from "../../HTML";

const swapDuration    = 200; // Duration in ms of swapping tiles
const randomizerDelay = 100; // Delay in ms between swapping tiles

const maxNumberOfResults = 50;

export default class EightPuzzleEvents {
    constructor(onChangeCallBack) {
        this.selectedCells = [];

        // solvers are objects that can solve EightPuzzle, and it 
        // contain a method called solve(startEightPuzzle) : Array(EightPuzzle) ~ Visited Eight puzzles
        this.solvers = [
            new BreadthFirst()
        ]

        // Used when tiles are changed
        this.onChangeCallBack = onChangeCallBack;

        this.event();
    }

    event() {
        // Swap event
        document.querySelectorAll(`.${classNames.EDITABLE_TABLE}`).forEach(table => table.addEventListener("click", ev => {
            this.swapEvent(ev, table, this.onChangeCallBack);
        }));

        // Randomizer event
        document.querySelectorAll(`.${classNames.RANDOMIZER_ICON}`).forEach(icon => icon.addEventListener("click", throttle(ev => {
            this.randomizerEvent(ev, this.onChangeCallBack);
        }, Math.abs(swapDuration - randomizerDelay) * 5)));


        document.querySelector(".info .solve").addEventListener("click", this.solveEvent.bind(this));
    }

    // ************ Events ************ //

    /**
     * @param {MouseEvent} ev 
     * @param {HTMLElement} table
     * @param {Function} callback Called after tiles are swapped
     * @returns {boolean} true if swapped, false otherwise
     */
    swapEvent(ev, table, callback) {
        const cellElement = ev.target;

        // If cellElement not a cell or it is a cell but its parent doesn't have EDITABLE_TABLE class name then remove all selections
        if (!cellElement.classList.contains(classNames.CELL)) {
            this.selectedCells = [];
        } 
        // If there is no selected cells then add cellElement directly
        else if (this.selectedCells.length == 0) {
            this.selectedCells.push(cellElement);
        } 
        // If there is already a cell selected then check if new selected cell has the same parent 
        // if so then swap the tiles and return true
        else if (table === this.selectedCells[0].closest("table")) {
            this.selectedCells.push(cellElement);
            this.swapTiles();

            // callback after swapping tiles
            if (callback instanceof Function) setTimeout(callback, swapDuration);
        } 
        // If there parents are different then remove previous selection, and add the new one
        else this.selectedCells = [cellElement];

        this.refreshHighlight();
    }

    /**
     * @param {MouseEvent} ev 
     * @param {Function} callback Called after tiles are randomized
     */
    randomizerEvent(ev, callback) {
        const table           = ev.target.closest(`.${classNames.BOARD}`).querySelector("table");
        const cells           = Array.from(table.querySelectorAll(`.${classNames.CELL}`));
        const randomizedCells = shuffle(cells);
        
        const inOrderSwap = setInterval(() => {
            // Swap cells, if one cell left, then swap it with any already swapped cells
            [this.selectedCells[0], this.selectedCells[1]] = [randomizedCells.pop(), randomizedCells.pop() || cells[random(0, cells.length-1)]];
            this.swapTiles();

            // If all cells has been randomized then clear the interval &
            // and call the callback function
            if (randomizedCells.length <= 0) {
                clearInterval(inOrderSwap);
                if (callback instanceof Function) setTimeout(callback, swapDuration);
            }
        }, randomizerDelay);
    }

    solveEvent() {
        const currentEightPuzzle = EightPuzzle.getObjectFromHTML();
        if (!currentEightPuzzle.isSolvable()) {
            alert("Unsolvable Puzzle!");
            return;
        }
        
        const resultBuild = new ResultBuilder();
        for(const solver of this.solvers) {
            const solverResult = solver.solve(currentEightPuzzle);
            const totalDepth   = solverResult.visited.length;

            const timeline = resultBuild.addAlgorithmBlock(solverResult.algorithmName, totalDepth-1, solverResult.totalCost.distance);

            timeline.addBoard(solverResult.visited[0].tiles);

            if (totalDepth > maxNumberOfResults + 50) {
                for (let i = 1; i < Math.floor(maxNumberOfResults/2); i++) {
                    const visited = solverResult.visited[i];
                    const cost = visited.tilesOutPlacedDistance;
                    timeline.addMoveDetails(visited.direction, cost, i);
                    timeline.addBoard(visited.tiles);
                }

                timeline.addTimeLapse(totalDepth - maxNumberOfResults);

                for (let i = totalDepth - Math.floor(maxNumberOfResults/2) - 1; i < totalDepth; i++) {
                    const visited = solverResult.visited[i];
                    const cost = visited.tilesOutPlacedDistance;
                    timeline.addMoveDetails(visited.direction, cost, i);
                    timeline.addBoard(visited.tiles);
                }

            } else {
                for (let i = 1; i < totalDepth; i++) {
                    const visited = solverResult.visited[i];
                    const cost = visited.tilesOutPlacedDistance;
                    timeline.addMoveDetails(visited.direction, cost, i);
                    timeline.addBoard(visited.tiles);
                }
            }
        }
        
        const replaceWith = document.querySelector(".result");
        if (replaceWith) replaceWith.replaceWith(resultBuild.getResult());
        else document.querySelector("main").insertAdjacentElement("afterend", resultBuild.getResult());   
    }

    // ************ Methods ************ //

    refreshHighlight() {
        // Unhighlight all cells
        document.querySelectorAll(`.${classNames.SELECTED_CELL}`).forEach(cell => cell.classList.remove(classNames.SELECTED_CELL));

        // Highlight selected cells
        if (this.selectedCells.length > 0) this.selectedCells.forEach(cell => cell.classList.add(classNames.SELECTED_CELL));
    }

    /** This will use this.selectedCells array to swap tiles
     * @param {Number} effectDuration time in ms to remove swapped class name from swapped cells
     */
    swapTiles(effectDuration = swapDuration) {
        const src  = this.selectedCells.pop();
        const dest = this.selectedCells.pop();
        
        // Pre-swap Effect
        src.classList.add(`${classNames.SWAPPED_CELL}`);
        dest.classList.add(`${classNames.SWAPPED_CELL}`);

        setTimeout(() => {
            // Swap values
            [src.innerText, dest.innerText] = [dest.innerText, src.innerText];

            // Swap class names
            [src.className, dest.className] = [dest.className, src.className];

            // Post-swap Effect
            src.classList.remove(`${classNames.SWAPPED_CELL}`);
            dest.classList.remove(`${classNames.SWAPPED_CELL}`);
        }, effectDuration);
    }

    // ************ Static ************ //

    /** Randomize all boards by clicking on randomizer icon ;)
     * @param {Number} num randomize boards num of times
     */
    static randomizeBoards(num = 1) {
        const temp = setInterval(() => {
            document.querySelectorAll(`.${classNames.RANDOMIZER_ICON}`).forEach(icon => icon.click());
            if(--num < 1) clearInterval(temp);
        }, Math.abs(swapDuration - randomizerDelay) * 5.1);
    }
}