import shuffle from "lodash/shuffle"
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import random from "lodash/random";

const classNames = {
    BOARD: "eight-puzzle__board",
    TABLE: "eight-puzzle__body",
    EDITABLE_TABLE: "eight-puzzle__body--editable",
    CELL: "eight-puzzle__cell",
    SELECTED_CELL: "eight-puzzle__cell--selected",
    SWAPPED_CELL: "eight-puzzle__cell--swapped",
    RANDOMIZER_ICON: "eight-puzzle__icon", 
}

let isEffectRunning   = false; // For swapping effect
const swapDuration    = 250; // Duration in ms of swapping tiles
const randomizerDelay = 100; // Delay in ms between swapping tiles

export default class EightPuzzleEvents {
    constructor(onChangeCallBack) {
        this.selectedCells = [];

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
    }

    // ************ Events ************ //

    /**
     * @param {MouseEvent} ev 
     * @param {HTMLElement} table
     * @param {Function} callback Called after tiles are swapped
     * @returns {boolean} true if swapped, false otherwise
     */
     swapEvent(ev, table, callback) {
        // Stop user from selecting a tile when effect/swapping is happening
        if (isEffectRunning) return false;

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
        // If there parents are different then remove all selections
        else this.selectedCells = [];

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
                if(callback instanceof Function) callback();
            }
        }, randomizerDelay);
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
        isEffectRunning = true;

        setTimeout(() => {
            // Swap values
            [src.innerText, dest.innerText] = [dest.innerText, src.innerText];

            // Swap class names
            [src.className, dest.className] = [dest.className, src.className];

            // Post-swap Effect
            src.classList.remove(`${classNames.SWAPPED_CELL}`);
            dest.classList.remove(`${classNames.SWAPPED_CELL}`);
            isEffectRunning = false;
        }, effectDuration);
    }
}